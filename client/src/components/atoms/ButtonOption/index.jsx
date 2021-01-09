import React from "react";
import "./ButtonOption.scss";

const Button = ({ title, ...rest }) => {
  return (
    <button type="submit" className="btn-action" {...rest}>
      {title}
    </button>
  );
};

export default Button;
