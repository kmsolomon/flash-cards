import "./ActionMenu.css"; // may switch this over to css modules later

import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { MenuOptionItems } from "@/types";

interface ActionMenuProps {
  buttonLabel?: string;
  ariaLabel?: string;
  buttonIcon?: JSX.Element;
  buttonType?: "string" | "icon" | "icon-string";
  buttonClasses?: string;
  menuPosition?: "left" | "right";
  menuOptions: MenuOptionItems[];
}

// Todo:
// - styling

const ActionMenu = forwardRef<HTMLButtonElement, ActionMenuProps>(
  function ActionMenu(
    {
      buttonLabel,
      ariaLabel,
      buttonIcon,
      buttonType = "string",
      buttonClasses,
      menuPosition = "right",
      menuOptions,
    }: ActionMenuProps,
    ref
  ) {
    const buttonId = useId();
    const menuId = useId();
    const outerMenuRef = useRef<HTMLUListElement>(null);
    const menuRef = useRef<Map<string, HTMLLIElement> | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [menuExpanded, setMenuExpanded] = useState<boolean>(false);

    useEffect(() => {
      if (outerMenuRef.current && buttonRef.current) {
        const width = window.innerWidth;
        if (menuPosition === "left") {
          const btnLeft = buttonRef.current.getBoundingClientRect().left;
          const btnRight = buttonRef.current.getBoundingClientRect().right;
          const menuWidth = outerMenuRef.current.clientWidth;

          if (btnLeft + menuWidth > width) {
            outerMenuRef.current.style.transform = `translateX(-${
              menuWidth + btnLeft - width + (width - btnRight)
            }px)`;
          } else {
            outerMenuRef.current.style.transform = "";
          }
        } else {
          const btnRight = buttonRef.current.getBoundingClientRect().right;
          const menuWidth = outerMenuRef.current.clientWidth;

          if (btnRight - menuWidth > 0) {
            outerMenuRef.current.style.transform = "";
          } else {
            outerMenuRef.current.style.transform = `translateX(${
              menuWidth - btnRight
            }px)`;
          }
        }
      }

      const closeOpenMenu = (e: MouseEvent) => {
        if (
          menuExpanded &&
          e.target instanceof Element &&
          !outerMenuRef.current?.contains(e.target) &&
          !buttonRef.current?.contains(e.target)
        ) {
          setMenuExpanded(false);
        }
      };

      document.addEventListener("mousedown", closeOpenMenu);

      return () => {
        document.removeEventListener("mousedown", closeOpenMenu);
      };
    }, [menuExpanded, menuPosition]);

    useImperativeHandle(ref, () => buttonRef.current!, []);

    const focusMenuItem = (i: number) => {
      const refMap = getMap();
      if (refMap.size > 0) {
        const elToFocus = refMap.get(menuOptions[i].name);

        setTimeout(() => {
          elToFocus?.focus();
        }, 0); // don't love this but otherwise the focus doesn't get set properly
      }
    };

    const navigateMenu = (e: React.KeyboardEvent<HTMLLIElement>, i: number) => {
      if (e.key === "Tab") {
        // for when user tabs out of the menu
        setMenuExpanded(false);
      } else if (e.key === "Escape" || e.key === "Esc") {
        // need to allow user to close menu with escape key and return focus to the menu button
        if (buttonRef.current !== null) {
          buttonRef.current.focus();
        }
        setMenuExpanded(false);
      } else if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        menuOptions[i].action();
      } else {
        // Ideally would also implement the a-z case, but leaving that as a TODO
        switch (e.key) {
          case "ArrowUp":
            if (i === 0) {
              focusMenuItem(menuOptions.length - 1);
            } else {
              focusMenuItem(i - 1);
            }
            break;
          case "ArrowDown":
            if (i === menuOptions.length - 1) {
              focusMenuItem(0);
            } else {
              focusMenuItem(i + 1);
            }
            break;
          case "Home":
            focusMenuItem(0);
            break;
          case "End":
            focusMenuItem(menuOptions.length - 1);
            break;
          default:
            break;
        }
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
      setMenuExpanded(!menuExpanded);

      // moving focus to first element if button opened with keyboard commands
      if (e.detail === 0) {
        focusMenuItem(0);
      }
    };

    const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      switch (e.key) {
        case "Tab":
        case "Esc":
        case "Escape":
          setMenuExpanded(false);
          break;
        case "ArrowUp":
          setMenuExpanded(true);
          if (menuOptions.length > 0) {
            focusMenuItem(menuOptions.length - 1);
          }
          break;
        case "ArrowDown":
          setMenuExpanded(true);
          if (menuOptions.length > 0) {
            focusMenuItem(0);
          }
          break;
        default:
          break;
      }
    };

    return (
      <div className="action-menu">
        <button
          ref={buttonRef}
          id={buttonId}
          className={`menu-btn${buttonType === "icon" ? " icon " : ""}${
            buttonClasses ? ` ${buttonClasses}` : ""
          }`}
          type="button"
          aria-haspopup="true"
          aria-expanded={menuExpanded}
          aria-controls={menuId}
          aria-label={ariaLabel}
          onClick={handleMenuOpen}
          onKeyDown={handleMenuKeyDown}
        >
          {buttonType !== "icon" ? buttonLabel : buttonIcon}
        </button>
        <ul
          ref={outerMenuRef}
          className={`${menuExpanded ? "show" : "hide"} ${menuPosition}`}
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
);

export default ActionMenu;
