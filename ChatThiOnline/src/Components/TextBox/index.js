import React from "react";

export default function TextArea({ label }) {
  return (
    <div className="form-outline">
      <textarea
        className="form-control"
        id="textAreaExample"
        rows="4"
      ></textarea>
      <label className="form-label" htmlFor="textAreaExample">
        {label}
      </label>
    </div>
  );
}
