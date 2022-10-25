import React from "react";

export default function OwnerMessage({ message }) {
  return (
    <>
      <div className="d-flex flex-row justify-content-end mb-4">
        <div className="p-3 me-3 border">
          <div
            className="small mb-0"
            dangerouslySetInnerHTML={{ __html: message.noidung }}
          ></div>
        </div>
        <img src={message.info.image} alt="avatar 1" />
      </div>
    </>
  );
}
