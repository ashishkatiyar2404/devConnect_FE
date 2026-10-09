import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createSocketConnection } from "../../api/socket";
import { useSelector } from "react-redux";
import PageContainer from "../../components/layout/PageContainer";
import EmptyState from "../../components/common/EmptyState";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import axiosClient from "../../api/axiosClient";
import { getErrorMessage } from "../../utils/errorUtils";

const Chat = () => {
  const { targetUserId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [messages, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryTrigger, setRetryTrigger] = useState(0);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!targetUserId) return;
    let isCancelled = false;

    const fetchMessages = async () => {
      try {
        const response = await axiosClient.get(`/chat/${targetUserId}`);
        if (!isCancelled) {
          const marshalledMessages = (
            response.data?.data?.messages || []
          ).map((msg) => {
            const { senderId, text } = msg;
            return {
              firstName: senderId?.firstName,
              lastName: senderId?.lastName,
              text,
            };
          });
          setMessage(marshalledMessages);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          if (err.response?.status === 401) {
            navigate("/login");
            return;
          }
          const message = getErrorMessage(
            err,
            "Failed to load conversation history. Please try again.",
          );
          setError(message);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchMessages();

    return () => {
      isCancelled = true;
    };
  }, [targetUserId, navigate, retryTrigger]);

  const handleRetry = () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    setRetryTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    if (!userId || !targetUserId) {
      return;
    }

    const socket = createSocketConnection();
    socket.on("connect", () => {
      socket.emit("joinChat", {
        firstName: user?.firstName,
        userId,
        targetUserId,
      });
    });

    socket.on("messageReceived", ({ firstName, lastName, text, senderId }) => {
      setMessage((prevMessages) => [
        ...prevMessages,
        { firstName, lastName, text, senderId },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, user?.firstName]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() === "" || !userId || !targetUserId) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      text: newMessage.trim(),
    });
    setNewMessage("");
  };

  return (
    <PageContainer>
      <div className="mx-auto flex h-[calc(100dvh-12rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-base-content/10 bg-base-300 shadow-xl">
        <header className="border-b border-base-content/10 px-4 py-4 sm:px-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Conversation
            </p>
            <h1 className="font-display text-xl font-semibold">Chat</h1>
          </div>
          {error && (
            <button
              type="button"
              className="btn btn-outline btn-xs"
              onClick={handleRetry}
              disabled={isLoading}
            >
              Retry
            </button>
          )}
        </header>

        <div className="flex-1 space-y-2 overflow-y-auto bg-base-200/40 p-4 sm:p-5">
          {isLoading ? (
            <LoadingState
              label="Loading messages…"
              className="min-h-[240px]"
            />
          ) : error ? (
            <ErrorState
              title="Unable to load messages"
              description={error}
              onRetry={handleRetry}
              retryLabel="Retry"
            />
          ) : messages.length === 0 ? (
            <EmptyState
              title="No messages yet"
              description="Say hello and start the conversation."
            />
          ) : (
            messages.map((msg, index) => {
              const isMe = user?.firstName === msg.firstName;
              return (
                <div
                  key={index}
                  className={`chat ${isMe ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-header text-xs opacity-70">
                    {`${msg.firstName || ""} ${msg.lastName || ""}`.trim() || "User"}
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
          <div ref={chatEndRef} />
        </div>

        <div className="flex items-center gap-2 border-t border-base-content/10 bg-base-300 p-3 sm:p-4">
          <input
            type="text"
            className="input input-bordered min-h-11 flex-1 bg-base-200"
            placeholder="Write a message…"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            disabled={isLoading || Boolean(error && messages.length === 0)}
          />
          <button
            type="button"
            className="btn btn-primary min-h-11"
            onClick={handleSend}
            disabled={!newMessage.trim() || isLoading}
          >
            Send
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Chat;
