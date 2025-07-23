import clsx from "clsx";
import { forwardRef, useState } from "react";
import "./textfield.scss";
import Eye from "./assets/eye.svg";
import EyeSlash from "./assets/eye-slash.svg";

interface AdditionalProps {
  label?: string | React.ReactNode;
  error?: boolean;
  helperText?: string;
  type?: "text" | "password";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> &
  AdditionalProps;

const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, label, helperText, error, endIcon, startIcon, ...rest } =
    props;
  const [show, setShow] = useState(true);

  const onClickPasswordButton: React.MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setShow(!show);
  };

  return (
    <label className={clsx("textfield-root", className)}>
      {!!label && <p className="textfield-label">{label}</p>}
      <div className={"textfield-input-container"}>
        {!!startIcon && <div className="textfield-start-icon">{startIcon}</div>}
        <input
          {...rest}
          ref={ref}
          className={clsx("textfield-input", {
            error,
            "textfield-have-start-icon": !!startIcon,
            "textfield-have-end-icon":
              !!props.endIcon || props.type === "password",
          })}
          type={props.type === "password" && show ? "password" : "text"}
        />
        {props.type === "password" && (
          <button
            type="button"
            className="textfield-password-button"
            onClick={onClickPasswordButton}
          >
            {show ? (
              <Eye className="textfield-password-icon" />
            ) : (
              <EyeSlash className="textfield-password-icon" />
            )}
          </button>
        )}
        {props.type !== "password" && !!endIcon && (
          <div className="textfield-end-icon">{endIcon}</div>
        )}
      </div>
      {!!helperText && (
        <p
          onClick={(e) => e.preventDefault()}
          className={clsx("textfield-helper-text", { error })}
        >
          {helperText}
        </p>
      )}
    </label>
  );
});

TextField.displayName = "TextField";

export default TextField;
