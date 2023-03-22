import React from "react";
import style from "../style/errormessage.module.css";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className={style.errormessage_container}>
      <h2>{message}</h2>
    </div>
  );
};

export default ErrorMessage;
