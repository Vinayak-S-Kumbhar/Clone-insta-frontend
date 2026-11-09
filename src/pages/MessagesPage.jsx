import { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiEdit,
  FiPhone,
  FiVideo,
  FiInfo,
  FiSmile,
  FiImage,
  FiMic,
  FiArrowLeft,
  FiPlus,
  FiHeart,
  FiSend,
  FiCheck,
} from "react-icons/fi";

export default function MessagesPage() {
  const [active, setActive] = useState(0);
  const [mobileChat, setMobileChat] = useState(false);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([
    {
      name: "Lalya_NE",
      username: "aaddu_k07",
      avatar: "",
      last: "Sent an attachment",
      time: "7m",
      online: true,
    },
    {
      name: "anuradha kumbhar",
      username: "anuradha_k",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
      last: "You sent an attachment",
      time: "1h",
    },
    {
      name: "S U R A J",
      username: "suraj_07",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
      last: "You sent an attachment",
      time: "1h",
    },
    {
      name: "Omkar Khot",
      username: "omkar_khot",
      avatar: "",
      last: "Sent an attachment",
      time: "18h",
    },
    {
      name: "ॐ ka₹:09",
      username: "karan_09",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop",
      last: "Ye to bada khulasa kar diya tune bhai",
      time: "23h",
    },
    {
      name: "samruddhi bav adekar",
      username: "samruddhi",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
      last: "Sent an attachment",
      time: "1d",
    },
  ]);
  const [allMessages, setAllMessages] = useState({});
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [liked, setLiked] = useState({});
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);
  const bottomRef = useRef(null);

  const person = chats[active];

  const messages = allMessages[active] || [
    {
      id: "1",
      type: "video",
      incoming: true,
      text: "Music vibes 🎤",
      image:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=450&h=600&fit=crop",
      time: "3:07 PM",
    },
    {
      id: "2",
      type: "video",
      incoming: true,
      text: "कोजागिरी पौर्णिमा ❤️",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=450&h=650&fit=crop",
      time: "3:08 PM",
    },
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages, active]);

  const send = (e) => {
    e?.preventDefault();
    if (!message.trim()) return;

    setAllMessages((prev) => ({
      ...prev,
      [active]: [
        ...(prev[active] || messages),
        {
          id: Date.now(),
          type: "text",
          incoming: false,
          text: message.trim(),
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    }));

    setChats((prev) =>
      prev.map((chat, i) =>
        i === active ? { ...chat, last: message.trim(), time: "Now" } : chat,
      ),
    );

    setMessage("");
    setEmojiOpen(false);
  };

  const upload = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAllMessages((prev) => ({
      ...prev,
      [active]: [
        ...(prev[active] || messages),
        {
          id: Date.now(),
          type: file.type.startsWith("video/") ? "video" : "image",
          incoming: false,
          image: url,
          text: file.name,
          time: "Now",
        },
      ],
    }));
  };

  return (
    <main className="flex h-[100dvh] w-18/19 float-right overflow-hidden bg-white text-[#262626]">
      {/* LEFT SIDEBAR */}
      <aside
        className={`${mobileChat ? "hidden" : "flex"} w-full shrink-0 flex-col border-r border-gray-200 md:flex md:w-[350px] lg:w-[400px] xl:w-[470px]`}
      >
        <div className="flex items-center justify-between px-7 pb-4 pt-8">
          <h1 className="text-xl font-bold tracking-tight">vinayak_k4115</h1>
          <button
            onClick={() => setMobileChat(true)}
            className="rounded-full p-2 text-2xl transition hover:rotate-6 hover:bg-gray-100"
          >
            <FiEdit />
          </button>
        </div>

        <div className="px-5">
          <div className="flex items-center gap-3 rounded-full bg-[#f2f3f5] px-4 py-3 focus-within:ring-2 focus-within:ring-pink-200">
            <FiSearch className="text-xl text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {/* STORIES */}
        <div className="flex gap-4 overflow-x-auto px-5 py-6 [scrollbar-width:none]">
          {[
            { name: "Your note", image: "" },
            {
              name: "Shreya",
              image:
                "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=120&h=120&fit=crop",
            },
            {
              name: "Aditya Jain",
              image:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
            },
            {
              name: "Prashant",
              image:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop",
            },
            {
              name: "Sakshi",
              image:
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop",
            },
          ].map((story, i) => (
            <button
              key={story.name}
              className="group flex w-[68px] shrink-0 flex-col items-center gap-2"
              onClick={() => setPreview(story)}
            >
              <div
                className={`h-[66px] w-[66px] rounded-full p-[3px] transition duration-300 group-hover:scale-110 ${i ? "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" : "border border-gray-200"}`}
              >
                {story.image ? (
                  <img
                    src={story.image}
                    alt=""
                    className="h-full w-full rounded-full border-2 border-white object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center rounded-full bg-gray-100 text-3xl text-gray-400">
                    +
                  </div>
                )}
              </div>
              <span className="w-full truncate text-center text-xs text-gray-600">
                {story.name}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between px-6 pb-3">
          <h2 className="font-bold">Messages</h2>
          <button className="text-sm text-gray-500 hover:text-pink-500">
            Requests
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2">
          {chats
            .filter((c) =>
              `${c.name} ${c.username}`
                .toLowerCase()
                .includes(search.toLowerCase()),
            )
            .map((chat) => {
              const index = chats.indexOf(chat);
              return (
                <button
                  key={chat.username}
                  onClick={() => {
                    setActive(index);
                    setMobileChat(true);
                  }}
                  className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition duration-200 hover:bg-gray-100 ${active === index ? "bg-[#f2f3f5]" : ""}`}
                >
                  <div className="relative shrink-0">
                    {chat.avatar ? (
                      <img
                        src={chat.avatar}
                        alt=""
                        className="h-[60px] w-[60px] rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-3xl text-white">
                        ●
                      </div>
                    )}
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{chat.name}</p>
                    <p className="mt-1 truncate text-sm text-gray-500">
                      {chat.last} · {chat.time}
                    </p>
                  </div>
                </button>
              );
            })}
        </div>
      </aside>

      {/* RIGHT CHAT AREA */}
      <section
        className={`${mobileChat ? "flex" : "hidden"} min-w-0 flex-1 flex-col md:flex`}
      >
        {/* HEADER */}
        <header className="flex h-[86px] shrink-0 items-center justify-between border-b border-gray-200 px-4 sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setMobileChat(false)}
              className="rounded-full p-2 hover:bg-gray-100 md:hidden"
            >
              <FiArrowLeft className="text-xl" />
            </button>
            {person.avatar ? (
              <img
                src={person.avatar}
                alt=""
                className="h-12 w-12 rounded-full border-2 border-gray-200 object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-3xl text-white">
                ●
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate font-semibold">{person.name}</p>
              <p className="text-xs text-gray-500">{person.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              title="Voice call"
              onClick={() => alert("Demo voice call")}
              className="rounded-full p-2 text-xl transition hover:scale-110 hover:bg-gray-100 sm:text-2xl"
            >
              <FiPhone />
            </button>
            <button
              title="Video call"
              onClick={() => alert("Demo video call")}
              className="rounded-full p-2 text-xl transition hover:scale-110 hover:bg-gray-100 sm:text-2xl"
            >
              <FiVideo />
            </button>
            <button
              title="Conversation info"
              onClick={() => setInfoOpen(!infoOpen)}
              className="rounded-full p-2 text-xl transition hover:scale-110 hover:bg-gray-100 sm:text-2xl"
            >
              <FiInfo />
            </button>
          </div>
        </header>

        {/* MESSAGES */}
        <div className="relative flex-1 overflow-y-auto px-3 py-5 sm:px-8 lg:px-12">
          {infoOpen && (
            <div className="absolute right-4 top-4 z-20 w-64 rounded-2xl border bg-white p-5 shadow-xl">
              <button
                onClick={() => setInfoOpen(false)}
                className="float-right"
              >
                ✕
              </button>
              <p className="mt-5 text-center font-semibold">{person.name}</p>
              <p className="mt-1 text-center text-sm text-gray-500">
                {person.username}
              </p>
              <p className="mt-4 rounded-xl bg-gray-50 p-3 text-center text-xs">
                Instagram conversation
              </p>
            </div>
          )}

          <div className="mx-auto mt-8 flex max-w-md flex-col items-center text-center">
            {person.avatar ? (
              <img
                src={person.avatar}
                alt=""
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-4xl text-white">
                ●
              </div>
            )}
            <h2 className="mt-3 font-semibold">{person.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{person.username}</p>
            <p className="mt-2 text-xs text-gray-400">
              You're chatting on Instagram
            </p>
            <button
              onClick={() => setInfoOpen(true)}
              className="mt-4 rounded-lg bg-gray-100 px-4 py-2 text-xs font-semibold hover:bg-gray-200"
            >
              View profile
            </button>
          </div>

          <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-6">
            <p className="text-center text-xs text-gray-400">TODAY</p>
            {messages.map((msg, i) => (
              <div
                key={msg.id}
                className={`group flex items-end gap-2 ${msg.incoming ? "justify-start" : "justify-end"}`}
                style={{ animation: "fadeIn .3s ease-out" }}
              >
                {msg.incoming &&
                  (person.avatar ? (
                    <img
                      src={person.avatar}
                      alt=""
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-200" />
                  ))}

                <div
                  className={`relative max-w-[80%] sm:max-w-[320px] ${msg.incoming ? "" : "order-first"}`}
                >
                  {msg.type === "text" ? (
                    <div
                      className={`rounded-[22px] px-4 py-3 text-sm leading-relaxed ${msg.incoming ? "rounded-bl-md bg-[#f1f2f4]" : "rounded-br-md bg-gradient-to-r from-[#d9468b] to-[#833ab4] text-white"}`}
                    >
                      {msg.text}
                    </div>
                  ) : (
                    <button
                      onClick={() => setPreview(msg)}
                      className="relative block overflow-hidden rounded-[20px] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <img
                        src={msg.image}
                        alt={msg.text}
                        className="max-h-[400px] min-h-[200px] w-full object-cover"
                      />
                      {msg.type === "video" && (
                        <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl">
                          ▶
                        </span>
                      )}
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10 text-left text-sm text-white">
                        {msg.text}
                      </span>
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setLiked((prev) => ({ ...prev, [msg.id]: !prev[msg.id] }))
                    }
                    className={`absolute -bottom-3 ${msg.incoming ? "left-3" : "right-3"} rounded-full bg-white p-1.5 shadow transition hover:scale-125 ${liked[msg.id] ? "text-pink-500" : "text-gray-400 opacity-0 group-hover:opacity-100"}`}
                  >
                    <FiHeart className={liked[msg.id] ? "fill-pink-500" : ""} />
                  </button>
                  <p className="mt-2 text-[10px] text-gray-400">
                    {msg.time}
                    {!msg.incoming && (
                      <FiCheck className="ml-1 inline text-blue-500" />
                    )}
                  </p>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* COMPOSER */}
        <footer className="relative shrink-0 px-3 pb-4 pt-2 sm:px-5">
          {emojiOpen && (
            <div className="absolute bottom-20 left-5 z-20 grid grid-cols-6 gap-2 rounded-2xl border bg-white p-3 shadow-xl">
              {[
                "😀",
                "😂",
                "🥹",
                "😍",
                "❤️",
                "🔥",
                "✨",
                "😭",
                "👍",
                "🙏",
                "🎉",
                "💗",
              ].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setMessage((prev) => prev + emoji)}
                  className="rounded-lg p-1 text-xl transition hover:scale-125"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={send}
            className="mx-auto flex min-h-[54px] max-w-5xl items-center gap-2 rounded-full border border-gray-300 px-3 transition focus-within:border-gray-500 sm:px-4"
          >
            <button
              type="button"
              onClick={() => setEmojiOpen(!emojiOpen)}
              className="shrink-0 p-1 text-2xl transition hover:scale-110 hover:text-pink-500"
            >
              <FiSmile />
            </button>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message..."
              className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none sm:text-base"
            />
            {message.trim() ? (
              <button
                type="submit"
                className="px-3 py-2 text-sm font-bold text-pink-600 hover:text-purple-600"
              >
                Send
              </button>
            ) : (
              <>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => upload(e.target.files?.[0])}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="p-1.5 text-2xl transition hover:scale-110 hover:text-pink-500"
                >
                  <FiImage />
                </button>
                <button
                  type="button"
                  onClick={() => alert("Demo voice message")}
                  className="p-1.5 text-2xl transition hover:scale-110 hover:text-pink-500"
                >
                  <FiMic />
                </button>
              </>
            )}
          </form>
        </footer>
      </section>

      {/* IMAGE / STORY PREVIEW */}
      {preview && (
        <div
          onClick={() => setPreview(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <button className="absolute right-5 top-5 text-3xl text-white">
            ×
          </button>
          <div
            className="max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {preview.image && (
              <img
                src={preview.image}
                alt=""
                className="max-h-[80vh] max-w-full object-contain"
              />
            )}
            <p className="p-3 text-sm font-medium">
              {preview.text || preview.name}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
