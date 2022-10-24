import React from "react";
import OwnerMessage from "./OwnerMessage";
import UserMessage from "./UserMessage";

export default function Message(props) {
  const { message, mssv } = props;

  return (
    <>
      {Number(message.nguoidung) === Number(mssv) ? (
        <OwnerMessage message={message} />
      ) : (
        <UserMessage message={message} />
      )}
    </>
  );
}
