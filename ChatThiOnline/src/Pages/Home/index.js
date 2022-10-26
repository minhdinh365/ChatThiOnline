import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Card from "../../Components/Card";
import Button from "../../Components/Button";
import axios from "axios";

import { GIAM_THI } from "../../Constants";

export default function HomePage() {
  const queryParams = useLocation().search;
  const [query, setQuery] = useState({
    mssv: new URLSearchParams(queryParams).get("mssv"),
    boxNumber: new URLSearchParams(queryParams).get("box"),
  });
  const [listMessage, setListMessage] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isActive = false;

    // my api just has 4 pages 1->4
    if (page < 5) {
      axios
        .get(`http://localhost:5000/${query.boxNumber}?page=${page}`)
        .then((data) => {
          if (!isActive) {
            //if in the fisrt load message
            if (page == 1) {
              setListMessage(data.data.message);
            }

            // if not so add the list messages into list
            else {
              data.data.message.map((element) => {
                setListMessage((listMessage) => [element, ...listMessage]);
              });
            }
          }
        });
    }
    return () => {
      isActive = true;
    };
  }, [page]);

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
            <Card
              params={query}
              listMessage={listMessage}
              setPage={setPage}
              setListMessage={setListMessage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
