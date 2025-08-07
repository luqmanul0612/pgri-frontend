import React, { type FC } from "react";
import "./select.scss";
import * as Lib from "@radix-ui/react-select";
import clsx from "clsx";
import Checkmark from "./assets/checkmark-outline.svg";
import ArrowDown from "./assets/arrow-down.svg";
import ArrowUp from "./assets/arrow-up.svg";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  options?: { key: string; label: string }[];
  label?: string | React.ReactNode;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const Select: FC<Props> = (props) => {
  const {
    label,
    placeholder,
    options,
    helperText,
    error,
    disabled,
    isLoading,
  } = props;
  return (
    <div className="select-root">
      {!!label && <p className={clsx("select-label", { disabled })}>{label}</p>}
      <Lib.Root
        value={props.value}
        onValueChange={props.onChange}
        disabled={disabled}
      >
        <Lib.Trigger
          className={clsx("select-trigger", { error })}
          aria-label="select-trigger"
        >
          <Lib.Value
            placeholder={
              <span className="select-placeholder">{placeholder}</span>
            }
          />
          <Lib.Icon className="select-icon">
            {!isLoading && (
              <ArrowDown className={clsx("arrow-icon", { disabled })} />
            )}
            {isLoading && (
              <div className="select-spinner">
                <div className="loader" />
              </div>
            )}
          </Lib.Icon>
        </Lib.Trigger>
        <Lib.Portal>
          <Lib.Content className="select-content" position="popper">
            <Lib.ScrollUpButton className="select-scroll-button">
              <ArrowUp className="select-scroll-icon" />
            </Lib.ScrollUpButton>
            <Lib.Viewport className="select-viewport">
              {!options?.length && (
                <div className="select-empty">Tidak ada data</div>
              )}
              {options?.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                  {option.label}
                </SelectItem>
              ))}
            </Lib.Viewport>
            <Lib.ScrollDownButton className="select-scroll-button">
              <ArrowDown className="select-scroll-icon" />
            </Lib.ScrollDownButton>
          </Lib.Content>
        </Lib.Portal>
      </Lib.Root>
      {!!helperText && (
        <p className={clsx("textfield-helper-text", { error })}>{helperText}</p>
      )}
    </div>
  );
};

export default Select;
Select.displayName = "Select";

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.RefAttributes<HTMLDivElement> & Lib.SelectItemProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <Lib.Item className={clsx("select-item", className)} {...rest} ref={ref}>
      <Lib.ItemText>{children}</Lib.ItemText>
      <Lib.ItemIndicator className="select-item-indicator">
        <Checkmark />
      </Lib.ItemIndicator>
    </Lib.Item>
  );
});

SelectItem.displayName = "SelectItem";
