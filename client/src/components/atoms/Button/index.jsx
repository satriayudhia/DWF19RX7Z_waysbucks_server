import React from "react";
import "./Button.scss";

const Button = ({ title, ...rest }) => {
  return (
    <button type="submit" className="btn-class" {...rest}>
      {title}
    </button>
  );
};

export default Button;
