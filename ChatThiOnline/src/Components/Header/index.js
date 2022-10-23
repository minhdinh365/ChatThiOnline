import React from "react";
import { BOX_NAME } from "../../Constants";

export default function HeaderBox() {
  return (
    <div className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0">
      <i className="fas fa-angle-left"></i>
      <p className="mb-0 fw-bold">{BOX_NAME}</p>
      <i className="fas fa-times"></i>
    </div>
  );
}
