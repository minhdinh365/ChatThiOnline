import React, { useState } from "react";
import { BUTTON_DELETE_CHAT } from "../../Constants";

export default function Button() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <button className="fw-bold" onClick={() => setIsOpen((pre) => !pre)}>
        <i className="fa-solid fa-trash"></i>
        {BUTTON_DELETE_CHAT}
      </button>
    </>
  );
}
