import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type = "button" }) => {
  return (
    <button type={type} className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
