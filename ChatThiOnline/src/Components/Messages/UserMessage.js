import React from "react";

export default function UserMessage({ message }) {
  return (
    <>
      <div className="d-flex flex-row justify-content-start mb-4">
        <img src={message.info.image} alt="avatar 1" />
        <div className="p-3 ms-3 border">
          <p
            className="small mb-0"
            dangerouslySetInnerHTML={{ __html: message.noidung }}
          ></p>
        </div>
      </div>
    </>
  );
}
