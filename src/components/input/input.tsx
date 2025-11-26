import React from "react";
import { cn } from "../../libs/utils";
import { cva } from "class-variance-authority";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  iconLeft?: string;
  iconRight?: string;
  size?: "sm" | "base" | "lg";
  containerClassName?: string;
  labelClassName?: string;
  dir?: "ltr" | "rtl";
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
  onChange?: (e: any) => void;
  variant?: "default" | "rounded" | "outline" | "outline-rounded";
  labelLeft?: string;
  labelRight?: string;
}

const Input =(
  (
    
 {     label,
       labelLeft,
       labelRight,
       ref,
       variant="default",
      iconLeft,
      iconRight,
      size = "base",
      className,
      containerClassName,
      labelClassName,
      dir="rtl",
      ...props}: InputProps,
    
  ) => {
    // Auto-detect RTL from document or use provided dir
    const isRTL = dir === "rtl";

    const inputVariants = cva(
      "w-full bg-gray-light border-none outline-none transition-colors duration-200 placeholder:text-gray focus:border-primary focus:ring-1 focus:ring-primary disabled:bg-gray-light disabled:text-gray-4 disabled:cursor-not-allowed",
      {
      variants: {
        variant: {
          "default": "rounded-sm",
          "rounded": "rounded-full",
          "outline": "border border-gray-5 rounded-sm placeholder:text-gray-dark",
          "outline-rounded": "border border-gray-5 rounded-full placeholder:text-gray-dark",
        },
        size: {
         sm: "h-8 px-3 py-1 text-sm",
         base: "h-12 px-3 py-[14px] text-base",
         lg: "h-12 px-5 py-3 text-lg",
        },
         defaultVariants: { variant: "default", size: "base" },
      }
    })
    return (
      <div 
        className={cn("flex flex-col gap-1 w-full", containerClassName)}
      >
        {label && (
          <label
            htmlFor={props.id || props.name}
            className={cn(
              "text-sm font-medium text-gray-700",
              "text-right" // Persian text should be right-aligned
              ,
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
  
    {/* IconRight appears on the left in RTL, right in LTR */}
          {iconRight && (
            <span 
              className={cn(
                "absolute flex items-center pointer-events-none text-gray-500 right-3",
              )}
            >
              <i className={iconRight}></i>
            </span>
          )}
                   {labelRight && (
            <span 
              className={cn(
                "absolute text-gray-500 right-3",
              )}
            >
              {labelRight}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              inputVariants({ variant, size, className }),
              // Adjust padding based on icon presence and RTL
              isRTL 
                ? cn(iconLeft && "pe-10", iconRight && "ps-10")
                : cn(iconLeft && "ps-10", iconRight && "pe-10"),
                labelLeft && "pl-13",
                labelRight && "pr-16",
            )}
            dir={isRTL ? "rtl" : "ltr"}
            {...props}
          />
                  {/* IconLeft appears on the right in RTL, left in LTR */}
          {iconLeft && (
            <span 
              className={cn(
                "absolute flex items-center pointer-events-none text-gray-500 left-3",
              )}
            >
            <i className={iconLeft}></i>
            </span>
          )}
                   {labelLeft && (
            <span 
              className={cn(
                "absolute  text-gray-500 left-3",
              )}
            >
              {labelLeft}
            </span>
          )}
        </div>
      </div>
    );
  }
);


export default Input;