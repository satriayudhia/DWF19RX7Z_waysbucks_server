import React from "react";
import "./ButtonOptionConfirm.scss";

const Button = ({ title, ...rest }) => {
  return (
    <button type="submit" className="btn-action-confirm" {...rest}>
      {title}
    </button>
  );
};

export default Button;
