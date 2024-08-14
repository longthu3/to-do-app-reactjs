import React from "react";

interface ButtonProps {
  onClick: () => void;
  label: string;
  color: keyof typeof buttonStyles;
  size: keyof typeof buttonSize;
  className?: string;
}

const buttonSize = {
  sxm: "w-[50px]",
  sm: "w-[100px]",
  md: "w-[200px]",
  lg: "w-[300px]",
};

const buttonStyles = {
  green: "bg-green-500 text-white border-green-600 active:border-green-500",
  red: "bg-red-500 text-white border-red-600 active:border-red-500",
  purple: "bg-purple-500 text-white border-purple-600 active:border-purple-500",
  blue: "bg-blue-500 text-white border-blue-600 active:border-blue-500",
  gray: "bg-gray-500 text-white border-gray-600 active:border-gray-500",
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  color,
  size,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-1
        py-1 
        rounded-md 
        border-b-[6px] 
        uppercase
        font-bold
        ${buttonSize[size]}
        ${buttonStyles[color]}  
        ${className}
      `}
    >
      {label}
    </button>
  );
};

export default Button;
