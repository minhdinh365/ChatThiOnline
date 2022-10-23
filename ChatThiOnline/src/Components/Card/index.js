import React, { useEffect, useRef, useState } from "react";

import { TEXT_TEXTAREA } from "../../Constants";

import HeaderBox from "../Header";
import Message from "../Messages";
import TextArea from "../TextBox";

export default function Card() {
  var listMessage = [
    {
      id: 1,
      content: "Nguyen thanh bang",
      avatar:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
      isOwner: false,
      isText: true,
      video:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/screenshot1.webp",
    },
    {
      id: 2,
      content: "sdfsdfs",
      avatar:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
      isOwner: true,
      isText: true,
      video:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/screenshot1.webp",
    },
    {
      id: 3,
      content: "sdfsdfs",
      avatar:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
      isOwner: false,
      isText: true,
      video:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/screenshot1.webp",
    },
    {
      id: 4,
      content: "sdfsdfs",
      avatar:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
      isOwner: false,
      isText: false,
      video:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/screenshot1.webp",
    },
    {
      id: 5,
      content: "sdfsdfs",
      avatar:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
      isOwner: false,
      isText: false,
      video:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/screenshot1.webp",
    },
    {
      id: 6,
      content: "sdfsdfs",
      avatar:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
      isOwner: false,
      isText: false,
      video:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/screenshot1.webp",
    },
    {
      id: 7,
      content: "sdfsdfs",
      avatar:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
      isOwner: false,
      isText: false,
      video:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/screenshot1.webp",
    },
    {
      id: 8,
      content: "sdfsdfs",
      avatar:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
      isOwner: false,
      isText: false,
      video:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/screenshot1.webp",
    },
  ];

  const bottom = useRef(null);
  const scrollToBottom = () => {
    bottom.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [listMessage]);

  return (
    <div className="card" id="chat1">
      <HeaderBox />
      <div className="card-body">
        {listMessage.slice(0, 5).map((element) => {
          return <Message key={element.id} message={element}></Message>;
        })}
        <div ref={bottom}></div>
        <TextArea label={TEXT_TEXTAREA} />
      </div>
    </div>
  );
}
