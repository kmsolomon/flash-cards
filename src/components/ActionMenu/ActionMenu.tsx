import { useId, useRef, useState } from "react";

import { MenuOptionItems } from "@/types";

interface ActionMenuProps {
  buttonLabel?: string;
  ariaLabel?: string;
  buttonIcon?: string;
  buttonType?: "string" | "icon" | "icon-string";
  menuOptions: MenuOptionItems[];
}

// Todo -- styling, icon support

function ActionMenu({
  buttonLabel,
  ariaLabel,
  //buttonIcon,
  buttonType = "string",
  menuOptions,
}: ActionMenuProps) {
  const buttonId = useId();
  const menuId = useId();
  const menuRef = useRef<Map<string, HTMLLIElement> | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuExpanded, setMenuExpanded] = useState<boolean>(false);

  const navigateMenu = (e: React.KeyboardEvent<HTMLLIElement>, i: number) => {
    const refMap = getMap();
    let nextFocus = i;

    if (e.key === "Tab") {
      // for when user tabs out of the menu
      setMenuExpanded(false);
    } else if (e.key === "Escape" || e.key === "Esc") {
      // need to allow user to close menu with escape key and return focus to the menu button
      if (buttonRef.current !== null) {
        buttonRef.current.focus();
      }
      setMenuExpanded(false);
    } else if (e.key === "Enter") {
      menuOptions[i].action();
    } else {
      switch (e.key) {
        case "ArrowUp":
          if (i === 0) {
            nextFocus = menuOptions.length - 1;
          } else {
            nextFocus = i - 1;
          }
          break;
        case "ArrowDown":
          if (i === menuOptions.length - 1) {
            nextFocus = 0;
          } else {
            nextFocus = i + 1;
          }
          break;
        case "Home":
          nextFocus = 0;
          break;
        case "End":
          nextFocus = menuOptions.length - 1;
          break;
        default:
          break;
      }
      // Ideally would also implement the a-z case, but leaving that as a TODO
      const nextEl = refMap?.get(menuOptions[nextFocus].name);

      nextEl?.focus();
    }
  };

  // For initializing the map used for ref
  const getMap = (): Map<string, HTMLLIElement> => {
    if (!menuRef.current) {
      menuRef.current = new Map<string, HTMLLIElement>();
    }
    return menuRef.current;
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const map = getMap();
    setMenuExpanded(!menuExpanded);

    if (map.size > 0) {
      const firstEl = map.get(menuOptions[0].name);
      setTimeout(() => {
        firstEl?.focus();
      }, 0); // don't love this but otherwise the focus doesn't get set properly
    }
  };

  return (
    <div>
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        aria-haspopup="true"
        aria-expanded={menuExpanded}
        aria-controls={menuId}
        aria-label={ariaLabel}
        onClick={handleMenuOpen}
      >
        {buttonType !== "icon" ? buttonLabel : null}
      </button>
      <ul
        className={menuExpanded ? "show" : "hide"}
        id={menuId}
        aria-labelledby={buttonId}
        role="menu"
      >
        {menuOptions.map((el, i) => (
          <li
            key={i}
            ref={(node) => {
              const map = getMap();
              if (node) {
                map.set(el.name, node);
              } else {
                map.delete(el.name);
              }
            }}
            id={`menuItem-${el.name}`}
            role="menuitem"
            tabIndex={-1}
            onKeyDown={(e) => {
              navigateMenu(e, i);
            }}
            onClick={el.action}
          >
            {el.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActionMenu;
