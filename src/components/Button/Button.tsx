import "./Button.css";

import { ButtonStyle } from "@/types";

interface ButtonProps {
  style: ButtonStyle;
  text?: string;
  ariaLabel?: string;
  icon?: string;
  clickHandler?: (event: React.MouseEvent<HTMLElement>) => void;
}

function Button({ style, text, ariaLabel, icon, clickHandler }: ButtonProps) {
  return (
    <button
      className={icon ? `btn primary ${style} ${icon}` : `btn ${style}`}
      aria-label={ariaLabel}
      disabled={style === "disabled"}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
}

export default Button;
