import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const labelVariants = cva(
  "border-gray-300 h-4 w-4 animate-spin rounded-full border-2 border-t-blue-600"
);
const Spinner = ({ className, ...props }: { className?: string }) => {
  return <div className={cn(labelVariants(), className)} {...props} />;
};

export default Spinner;
