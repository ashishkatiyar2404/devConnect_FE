import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import PageContainer from "./PageContainer";
import EmptyState from "./EmptyState";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [messages, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  console.log(messages);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    // Emit joinChat when Chat loads or the chat user changes
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text, senderId }) => {
      console.log(firstName);
      console.log(text);
      setMessage((messages) => [...messages, { firstName, text, senderId }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const handleSend = () => {
    console.log("ASHISH")
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <PageContainer>
      <div className="mx-auto flex h-[calc(100dvh-12rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-base-content/10 bg-base-300 shadow-xl">
        <header className="border-b border-base-content/10 px-4 py-4 sm:px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Conversation
          </p>
          <h1 className="font-display text-xl font-semibold">Chat</h1>
        </header>

        <div className="flex-1 space-y-2 overflow-y-auto bg-base-200/40 p-4 sm:p-5">
          {messages.length === 0 ? (
            <EmptyState
              title="No messages yet"
              description="Say hello and start the conversation."
            />
          ) : (
            messages.map((msg, index) => {
              const isMe = msg.senderId === userId;
              return (
                <div
                  key={index}
                  className={`chat ${isMe ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-header text-xs opacity-70">
                    {msg.firstName}
                  </div>
                  <div
                    className={`chat-bubble ${isMe ? "chat-bubble-primary" : ""}`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center gap-2 border-t border-base-content/10 bg-base-300 p-3 sm:p-4">
          <input
            type="text"
            className="input input-bordered min-h-11 flex-1 bg-base-200"
            placeholder="Write a message…"
            value={newMessage}
            onChange={(e) => {
              console.log(e.target.value);
              setNewMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button
            type="button"
            className="btn btn-primary min-h-11"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Chat;
