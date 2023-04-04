import React from "react";
import style from "../style/errormessage.module.css";

const ErrorMessage = ({
  message,
  setErrorStatement,
}: {
  message: JSX.Element | null;
  setErrorStatement: any;
}) => {
  setTimeout(() => {
    setErrorStatement(null);
  }, 4000);

  return (
    <div className={style.errormessage_container}>
      <h2>{message}</h2>
    </div>
  );
};

export default ErrorMessage;
