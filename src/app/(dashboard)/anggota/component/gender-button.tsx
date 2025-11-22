import { cn } from "@/lib/utils";
import { FC } from "react";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  checked: boolean;
  variant: "M" | "F";
}

const GenderButton: FC<Props> = (props) => {
  const { children, onClick, checked, variant } = props;
  return (
    <button
      onClick={onClick}
      className={cn(
        "font-base h-[44px] rounded-[8px] border text-[12px] outline-none px-[12px] transition-all",
        {
          "border-yellow-300": variant === "M",
          "border-red-300": variant === "F",
          "bg-yellow-50": variant === "M",
          "bg-red-50": variant === "F",
          "text-yellow-500": variant === "M",
          "text-red-500": variant === "F",
          "border-yellow-400": checked && variant === "M",
          "border-red-500": checked && variant === "F",
          "bg-yellow-400": checked && variant === "M",
          "bg-red-500": checked && variant === "F",
          "text-white": checked,
        },
      )}
    >
      {children}
    </button>
  );
};

export default GenderButton;
