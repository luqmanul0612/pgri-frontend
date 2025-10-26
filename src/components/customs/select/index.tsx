import React, { type FC } from "react";
import "./select.scss";
import * as Lib from "@radix-ui/react-select";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import clsx from "clsx";
import Checkmark from "./assets/checkmark-outline.svg";
import ArrowDown from "./assets/arrow-down.svg";

interface SelectProps<T> {
  value?: string;
  onChange?: (value: string) => void;
  options?: T[];
  label?: string | React.ReactNode;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  isLoading?: boolean;
  getKey?: (item: T) => string;
  getLabel?: (item: T) => React.ReactNode;
}

const getKeyFunc = (item: any) => item.key;
const getLabelFunc = (item: any) => item.label;

const Select = <T,>(props: SelectProps<T>) => {
  const {
    label,
    placeholder,
    options,
    helperText,
    error,
    value,
    disabled,
    isLoading,
    onChange,
    getKey = getKeyFunc,
    getLabel = getLabelFunc,
  } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <div className="select-root">
      {!!label && <p className={clsx("select-label", { disabled })}>{label}</p>}
      <Lib.Root
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        open={open}
        onOpenChange={setOpen}
      >
        <Lib.Trigger
          className={clsx("select-trigger", { error })}
          aria-label="select-trigger"
        >
          {!!options?.length && (
            <Lib.Value
              placeholder={
                <span className="select-placeholder">{placeholder}</span>
              }
            />
          )}
          {!options?.length && (
            <span
              className={clsx("select-placeholder", { loading: isLoading })}
            >
              {placeholder}
            </span>
          )}
          <Lib.Icon className="select-icon">
            {!isLoading && (
              <ArrowDown className={clsx("arrow-icon", { disabled, open })} />
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
            <ScrollArea.Root className="select-scroll-area-root" type="auto">
              <Lib.Viewport
                asChild
                className="select-viewport"
                style={{ overflowY: undefined }}
              >
                <ScrollArea.Viewport className="select-scroll-area-viewport">
                  {!options?.length && (
                    <div className="select-empty">Tidak ada data</div>
                  )}
                  {options?.map((option) => (
                    <SelectItem key={getKey(option)} value={getKey(option)}>
                      {getLabel(option)}
                    </SelectItem>
                  ))}
                </ScrollArea.Viewport>
              </Lib.Viewport>
              <ScrollArea.Scrollbar
                className="select-scroll-area-scrollbar"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="select-scroll-area-thumb" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
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
