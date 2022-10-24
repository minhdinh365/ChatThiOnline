import React, { useEffect, useState } from "react";

export default function Modal({ isOpen }) {
  const [isOpenModal, setIsOpenModal] = useState(isOpen);

  useEffect(() => {
    setIsOpenModal(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setIsOpenModal((pre) => !pre);
  };
  return (
    <>
      <div
        className={isOpen ? "modal fade show" : "modal fade"}
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: "block", backgroundColor: "rgb(0,0,0,0.5)" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Some className is already existed
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body"></div>
            <div className="modal-footer">
              <button
                onClick={closeModal}
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
              >
                Close
              </button>
              <a type="button" className="btn btn-danger" href="/classNamees">
                Go to list className
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
