import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Card from "../../Components/Card";
import Button from "../../Components/Button";
import Modal from "../../Components/Modal";

import { GIAM_THI } from "../../Constants";

export default function HomePage() {
  const queryParams = useLocation().search;
  const [query, setQuery] = useState({
    mssv: new URLSearchParams(queryParams).get("mssv"),
    boxNumber: new URLSearchParams(queryParams).get("box"),
  });

  const [isOpen, setIsOpen] = useState(false);
  const showModal = () => {
    setIsOpen((pre) => !pre);
  };
  return (
    <section id="main">
      <div className="container py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4">
            {query.mssv.toLowerCase() === GIAM_THI ? (
              <Button open={showModal} />
            ) : null}
            <Card params={query} />
          </div>
        </div>
      </div>
    </section>
  );
}
