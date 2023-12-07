import "./Button.css";

import { IconContext } from "react-icons";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";

import { ButtonIcon, ButtonStyle } from "@/types";

interface ButtonProps {
  style: ButtonStyle;
  text?: string;
  ariaLabel?: string;
  icon?: ButtonIcon;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  clickHandler?: (event: React.MouseEvent<HTMLElement>) => void;
}

function Button({
  style,
  type,
  text,
  ariaLabel,
  icon,
  disabled,
  clickHandler,
}: ButtonProps) {
  let iconContent;

  if (icon) {
    switch (icon) {
      case "arrow-left":
        iconContent = <ImArrowLeft2 data-testid="icon-arrow-left" />;
        break;
      case "arrow-right":
        iconContent = <ImArrowRight2 data-testid="icon-arrow-right" />;
        break;
      default:
        console.log(`Unknown icon type ${icon}`);
    }
  }

  return (
    <button
      className={icon ? `btn primary ${style} ${icon}` : `btn ${style}`}
      aria-label={ariaLabel}
      disabled={disabled}
      type={type}
      onClick={clickHandler}
    >
      {icon ? (
        <IconContext.Provider value={{ size: "1.5rem" }}>
          {iconContent}
        </IconContext.Provider>
      ) : (
        text
      )}
    </button>
  );
}

export default Button;
