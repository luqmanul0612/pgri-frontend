import React from "react";
import "./button.scss";
import clsx from "clsx";

type Props = {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: "primary" | "secondary" | "secondary-white" | "neutral" | "text";
  isLoading?: boolean;
  fullWidth?: boolean;
};

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & Props
>((props, ref) => {
  const {
    className,
    startIcon,
    isLoading,
    endIcon,
    variant = "primary",
    ...rest
  } = props;
  return (
    <button
      {...rest}
      ref={ref}
      className={clsx("Button-root", className, {
        primary: variant === "primary",
        secondary: variant === "secondary",
        neutral: variant === "neutral",
        text: variant === "text",
        "secondary-white": variant === "secondary-white",
        "has-start-icon": !!startIcon,
        "has-end-icon": !!endIcon,
        "is-loading": isLoading,
        "full-width": props.fullWidth,
      })}
      disabled={isLoading || props.disabled}
    >
      {isLoading && (
        <div className="button-spinner">
          <div className="loader" />
        </div>
      )}
      {!!startIcon && <div className="Button-start-icon">{startIcon}</div>}
      {props.children}
      {!!endIcon && <div className="Button-end-icon">{endIcon}</div>}
    </button>
  );
});

export default Button;

Button.displayName = "Button";
