import socketClient, { Socket } from "socket.io-client";
export const socket = {
  /**
   * initial socket to listen on soket actions
   * @param {string} url
   * @param {Object} options default is transports: ["websocket", "polling", "flashsocket"]
   */
  initial: function (
    url,
    options = {
      transports: ["websocket", "polling", "flashsocket"],
    }
  ) {
    return socketClient(url, options);
  },

  /**
   * listen to action in the room chat
   * @param {Socket} socket
   * @param {Function} setMessage
   * @param {number} roomId
   * @param {string} action
   * @return message
   */
  listen: function (
    socket,
    setMessage,
    roomId = 0,
    action = "get-new-message"
  ) {
    socket.on(action, (message) => {
      const temp = message;
      if (roomId === temp.box) {
        setMessage(temp);
      }
    });
  },
};
