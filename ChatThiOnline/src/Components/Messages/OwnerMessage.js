import React from "react";

export default function OwnerMessage({ message }) {
  return (
    <>
      {message.isText ? (
        <div className="d-flex flex-row justify-content-end mb-4">
          <div className="p-3 me-3 border">
            <p className="small mb-0">{message.content}</p>
          </div>
          <img src={message.avatar} alt="avatar 1" />
        </div>
      ) : (
        <div className="d-flex flex-row justify-content-end mb-4">
          <div className="me-3" style={{ borderRadius: "15px" }}>
            <div className="bg-image">
              <img
                src={message.video}
                style={{ borderRadius: "15px" }}
                alt="video"
              />
              <a href="#!">
                <div className="mask"></div>
              </a>
            </div>
          </div>
          <img
            src={message.avatar}
            alt="avatar 1"
            style={{ width: "45px", height: "100%" }}
          />
        </div>
      )}
    </>
  );
}
