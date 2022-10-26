import axios from "axios";
import React from "react";

export default function TextArea(props) {
  function sendMessage(event) {
    if (event.key === "Enter") {
      axios
        .post(`https://chat-box-online.herokuapp.com/`, {
          noidung: event.target.value,
          nguoidung: props.mssv,
          box: props.box,
        })
        .then((response) => {
          const message = {
            ...response.data.message._doc,
            info: response.data.message.info,
          };

          props.socket.emit("add-new-message", message);
          event.target.value = "";
          event.preventDefault();
        });
    }
  }

  return (
    <div className="form-outline">
      <textarea
        className="form-control"
        id="textAreaExample"
        rows="4"
        onKeyDown={(e) => sendMessage(e)}
      ></textarea>
      <label className="form-label" htmlFor="textAreaExample">
        {props.label}
      </label>
    </div>
  );
}
