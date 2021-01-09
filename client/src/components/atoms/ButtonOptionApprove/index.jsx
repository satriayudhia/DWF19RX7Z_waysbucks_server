import React from "react";
import "./ButtonOptionApprove.scss";

const Button = ({ title, ...rest }) => {
  return (
    <button type="submit" className="btn-action-approve" {...rest}>
      {title}
    </button>
  );
};

export default Button;
