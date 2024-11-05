import { Label } from "@/components/ui/label";
import { FC, ReactElement } from "react";

export const FormField: FC<{
    label: string;
    required?: boolean;
    children: ReactElement;
    error?: string;
  }> = ({ label, required = false, children, error }) => {
    return (
      <div className="flex flex-col">
        <Label className="mb-2 text-sm font-medium text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        {children}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  };