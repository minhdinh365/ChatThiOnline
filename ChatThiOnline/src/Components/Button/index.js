import React, { useState } from "react";
import { BUTTON_DELETE_CHAT } from "../../Constants";

export default function Button({ open }) {
  return (
    <button className="fw-bold" onClick={open}>
      <i className="fa-solid fa-trash"></i>
      {BUTTON_DELETE_CHAT}
    </button>
  );
}
