import React from "react";
import OwnerMessage from "./OwnerMessage";
import UserMessage from "./UserMessage";

export default function Message({ message }) {
  return (
    <>
      {message.isOwner ? (
        <OwnerMessage message={message}></OwnerMessage>
      ) : (
        <UserMessage message={message}></UserMessage>
      )}
    </>
  );
}
