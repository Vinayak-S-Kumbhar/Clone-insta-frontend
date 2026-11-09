import { useEffect, useRef, useState } from "react";
import {
  FiHeart,
  FiMessageCircle,
  FiSend,
  FiBookmark,
  FiMoreHorizontal,
  FiVolumeX,
  FiVolume2,
  FiChevronUp,
  FiChevronDown,
  FiHome,
  FiSearch,
  FiCompass,
  FiFilm,
  FiPlusSquare,
  FiUser,
  FiMenu,
  FiInstagram,
  FiX,
} from "react-icons/fi";

const reels = [
  {
    username: "bytemotion9",
    caption:
      "30 DAYS OF AWS | Day 1 ☁️\nWhat is AWS? Cloud Computing Explained",
    likes: "2.4K",
    comments: "153",
    audio: "bytemotion9 · Original audio",
    badge: "DAY 01",
    title: "Instagram",
    background: "from-[#050a12] via-[#0d1b32] to-[#03070d]",
    icon: "instagram",
  },
  {
    username: "design.daily",
    caption:
      "Small details make a big difference ✨\nA little inspiration for your next project.",
    likes: "8.1K",
    comments: "246",
    audio: "design.daily · Original audio",
    badge: "DAY 02",
    title: "Create",
    background: "from-[#25103d] via-[#542d72] to-[#090c20]",
    icon: "spark",
  },
  {
    username: "codewithme",
    caption: "One step at a time 💻\nBuild something you’re proud of today.",
    likes: "1.7K",
    comments: "89",
    audio: "codewithme · Original audio",
    badge: "DAY 03",
    title: "Code",
    background: "from-[#092b28] via-[#12564c] to-[#061311]",
    icon: "code",
  },
];

export default function ReelPage() {
  const [active, setActive] = useState(0),
    [liked, setLiked] = useState({}),
    [saved, setSaved] = useState({}),
    [following, setFollowing] = useState({}),
    [muted, setMuted] = useState(true),
    [playing, setPlaying] = useState(true),
    [more, setMore] = useState(false),
    [comments, setComments] = useState(false);
  const touchY = useRef(null),
    reel = reels[active];
  const next = () => setActive((n) => (n + 1) % reels.length),
    prev = () => setActive((n) => (n - 1 + reels.length) % reels.length);
  useEffect(() => {
    const key = (e) => {
      if (e.key === "ArrowDown") next();
      if (e.key === "ArrowUp") prev();
      if (e.key === "Escape") {
        setMore(false);
        setComments(false);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  return (
    <main className="min-h-screen bg-white text-[#111]">
      <section className="lg:ml-[72px]">
        <div className="reel-layout mx-auto flex min-h-screen max-w-[1000px] items-center justify-center gap-5 px-3 pb-16 pt-16 lg:gap-8 lg:px-8 lg:py-5">
          <div
            className={`reel-card relative isolate h-[min(78vh,780px)] min-h-[480px] w-[min(62vw,478px)] max-w-[478px] overflow-hidden rounded-[5px] bg-black text-white shadow-2xl sm:w-[min(58vw,478px)] lg:h-[min(96vh,860px)] lg:w-[min(42vw,478px)]`}
          >
            <div
              className={`absolute inset-0 -z-20 bg-gradient-to-br ${reel.background} transition-all duration-700`}
            />
            <div className="tech-grid absolute inset-0 -z-10 opacity-40" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,transparent_0%,rgba(0,0,0,.15)_60%,rgba(0,0,0,.65)_100%)]" />
            <div className="absolute left-1/2 top-[14%] -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[10px] font-bold tracking-[.18em] text-white/60">
              30 DAYS OF AWS{" "}
              <span className="ml-1 text-amber-400">{reel.badge}</span>
            </div>
            <div className="animate-content-in absolute inset-0 flex flex-col items-center justify-center">
              {reel.icon === "instagram" ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="instagram-gradient flex h-[74px] w-[74px] items-center justify-center rounded-[21px] shadow-xl transition duration-500 hover:rotate-[-6deg] hover:scale-110">
                    <FiInstagram className="h-[55px] w-[55px] text-white" />
                  </div>
                  <span className="text-sm font-semibold">{reel.title}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-3xl font-black">
                    {reel.icon === "spark" ? "✦" : "</>"}
                  </div>
                  <span className="text-2xl font-bold">{reel.title}</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setPlaying((v) => !v)}
              aria-label={playing ? "Pause reel" : "Play reel"}
              className={`absolute inset-0 z-10 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/35 text-white transition ${playing ? "pointer-events-none opacity-0" : "opacity-100"}`}
            >
              {playing ? "Ⅱ" : "▶"}
            </button>
            <button
              onClick={() => setMuted((v) => !v)}
              aria-label={muted ? "Unmute" : "Mute"}
              className="absolute bottom-5 right-5 z-20 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-md hover:scale-110"
            >
              {muted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
            </button>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
            <div className="absolute bottom-2 left-3 right-12 h-0.5 overflow-hidden rounded-full bg-white/20">
              <div
                className={`h-full bg-white/80 ${playing ? "animate-progress" : "w-[36%]"}`}
              />
            </div>
          </div>
          <div
            onTouchStart={(e) => (touchY.current = e.touches[0].clientY)}
            onTouchEnd={(e) => {
              if (touchY.current == null) return;
              const d = touchY.current - e.changedTouches[0].clientY;
              if (d > 45) next();
              if (d < -45) prev();
              touchY.current = null;
            }}
            className="flex w-12 shrink-0 flex-col items-center gap-5 self-end pb-[185px]"
          >
            <button
              onClick={() => setLiked((s) => ({ ...s, [active]: !s[active] }))}
              className="action-button"
            >
              <FiHeart
                className={`h-7 w-7 ${liked[active] ? "fill-red-500 text-red-500 animate-heart-pop" : ""}`}
              />
              <span>{liked[active] ? "2.5K" : reel.likes}</span>
            </button>
            <button onClick={() => setComments(true)} className="action-button">
              <FiMessageCircle className="h-7 w-7" />
              <span>{reel.comments}</span>
            </button>
            <button onClick={() => setMore(true)} className="action-button">
              <FiSend className="h-7 w-7 -rotate-12" />
            </button>
            <button
              onClick={() => setSaved((s) => ({ ...s, [active]: !s[active] }))}
              className="action-button"
            >
              <FiBookmark
                className={`h-7 w-7 ${saved[active] ? "fill-black" : ""}`}
              />
            </button>
            <button onClick={() => setMore(true)} className="action-button">
              <FiMoreHorizontal className="h-7 w-7" />
            </button>
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-gradient-to-br from-emerald-950 to-black text-[10px] font-black text-emerald-300">
              B9
            </div>
          </div>
        </div>
      </section>
      <div className="reel-controls fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-4 xl:flex">
        <button
          onClick={prev}
          aria-label="Previous reel"
          className="control-button"
        >
          <FiChevronUp size={27} />
        </button>
        <button
          onClick={next}
          aria-label="Next reel"
          className="control-button"
        >
          <FiChevronDown size={27} />
        </button>
      </div>
      <div className="reel-caption fixed bottom-20 left-4 z-20 max-w-[calc(100vw-100px)] text-sm sm:bottom-6 sm:left-6 sm:max-w-[330px] lg:bottom-6 lg:left-[calc(50%-475px)] lg:max-w-[355px]">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-gradient-to-br from-emerald-950 to-black text-[10px] font-black text-emerald-300">
            B9
          </div>
          <span className="font-semibold">{reel.username}</span>
          <span className="text-black/50">•</span>
          <button
            onClick={() =>
              setFollowing((s) => ({ ...s, [active]: !s[active] }))
            }
            className="font-semibold text-[#3858ff] hover:text-blue-700"
          >
            {following[active] ? "Following" : "Follow"}
          </button>
        </div>
        <p className="whitespace-pre-line leading-[1.4]">{reel.caption}</p>
        <p className="mt-1 text-black/70">...</p>
        <p className="mt-2 flex items-center gap-2 text-xs text-black/75">
          <span className="h-3 w-3 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500" />
          {reel.audio}
        </p>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-40 flex h-[58px] items-center justify-around border-t border-black/10 bg-white/95 backdrop-blur lg:hidden">
        {[
          [FiHome, "Home"],
          [FiSearch, "Search"],
          [FiPlusSquare, "Create"],
          [FiFilm, "Reels"],
          [FiUser, "Profile"],
        ].map(([I, l]) => (
          <button
            key={l}
            aria-label={l}
            className="rounded-xl p-2 transition hover:scale-110"
          >
            <I size={23} />
          </button>
        ))}
      </nav>
      {more && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/35 p-3 backdrop-blur-[2px] sm:items-center"
          onClick={() => setMore(false)}
        >
          <div
            className="animate-modal-in w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 className="font-semibold">Options</h2>
              <button onClick={() => setMore(false)}>
                <FiX size={20} />
              </button>
            </div>
            {[
              "Share",
              saved[active] ? "Remove from saved" : "Save",
              "Report",
              "Cancel",
            ].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item.includes("Save"))
                    setSaved((s) => ({ ...s, [active]: !s[active] }));
                  setMore(false);
                }}
                className={`block w-full border-b border-neutral-100 px-5 py-4 text-left text-sm hover:bg-neutral-50 ${item === "Report" ? "text-red-500" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
      {comments && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/35 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
          onClick={() => setComments(false)}
        >
          <div
            className="animate-modal-in w-full max-w-md rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Comments</h2>
              <button onClick={() => setComments(false)}>
                <FiX size={22} />
              </button>
            </div>
            <p className="py-8 text-center text-sm text-neutral-500">
              Be the first to share your thoughts.
            </p>
            <div className="flex gap-2 border-t border-neutral-100 pt-4">
              <input
                className="min-w-0 flex-1 rounded-full border border-neutral-200 px-4 py-2 text-sm outline-none focus:border-neutral-400"
                placeholder="Add a comment…"
              />
              <button className="font-semibold text-blue-600">Post</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
