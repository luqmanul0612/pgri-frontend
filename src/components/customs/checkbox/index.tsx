import * as Lib from "@radix-ui/react-checkbox";
import Checkmark from "./assets/checkmark-outline.svg";
import { forwardRef } from "react";
import clsx from "clsx";
import "./checkbox.scss";

type Props = Lib.CheckboxProps &
  React.RefAttributes<HTMLButtonElement> & { error?: boolean };

const Checkbox = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { className, error, ...rest } = props;
  return (
    <Lib.Root
      {...rest}
      ref={ref}
      className={clsx("checkbox-root", className, { error })}
      defaultChecked
    >
      <Lib.Indicator asChild className="checkbox-indicator">
        <Checkmark className="checkbox-icon" />
      </Lib.Indicator>
    </Lib.Root>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
