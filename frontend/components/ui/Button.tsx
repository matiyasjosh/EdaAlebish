import React from "react";

interface ButtonProps {
  content: string;
  onClick?: () => void;
  paddingHorizontal?: string; // Optional prop for horizontal padding
  paddingVertical?: string; // Optional prop for vertical padding
  backgroundColor?: string; // Optional prop for background color
  textColor?: string; // Optional prop for text color
}

const Button: React.FC<ButtonProps> = ({
  content,
  onClick,
  backgroundColor = "bg-[#bec4e1]", // Default background color
  textColor = "text-white", // Default text color
  paddingHorizontal = "4", // Default horizontal padding
  paddingVertical = "2", // Default vertical padding
}) => {
  // Construct padding classes based on props
  const paddingClass = `px-${paddingHorizontal} py-${paddingVertical}`;
  const borderClass =
    backgroundColor === "bg-white"
      ? "border border-gray-300 border-[10px]" // Customize width and height as needed
      : "";

  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 ${borderClass} ${textColor} ${backgroundColor} rounded-md border-none outline-none border-blue-100 font-bold`}
    >
      {content}
    </button>
  );
};

export default Button;
