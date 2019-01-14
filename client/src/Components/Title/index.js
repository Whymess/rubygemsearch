import React from "react";
import "./Title.css";

export default props => {
  let { title } = props;
  return <div className="title mt-4">{title}</div>;
};
