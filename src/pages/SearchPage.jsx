import { useState } from "react";
import { BiBookmark } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { FaInstagram, FaPlayCircle, FaRegHeart } from "react-icons/fa";
import { FiMessageCircle, FiMoreHorizontal } from "react-icons/fi";
import { RiSendInsFill } from "react-icons/ri";

const reels = [
  { image: "/images/reel-1.jpg", likes: "24.8K", comments: "482" },
  { image: "/images/reel-2.jpg", likes: "18.2K", comments: "296" },
  { image: "/images/reel-3.jpg", likes: "9,431", comments: "118" },
  { image: "/images/reel-4.jpg", likes: "42.1K", comments: "891" },
  { image: "/images/reel-5.jpg", likes: "31.6K", comments: "624" },
  { image: "/images/reel-6.jpg", likes: "12.7K", comments: "204" },
  { image: "/images/reel-7.jpg", likes: "56.3K", comments: "104" },
  { image: "/images/reel-8.jpg", likes: "27.9K", comments: "510" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(null);
  const [liked, setLiked] = useState([]);

  return (
    <main className="min-h-screen mt-9 bg-white text-[#262626]">
      <header className="sticky top-0 z-20 flex justify-center bg-white/90 px-4 pb-5 pt-6 backdrop-blur-md">
        <div className="search-wrap group flex h-[50px] w-full max-w-[776px] items-center gap-3 rounded-full bg-[#f1f3f5] px-5 transition-all duration-300 focus-within:bg-[#e9edf1] focus-within:shadow-[0_0_0_2px_rgba(0,0,0,.04)]">
          <CiSearch className="shrink-0 text-[#8e8e8e]" size={21} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            aria-label="Search"
            className="h-full w-full bg-transparent text-[16px] text-[#262626] outline-none placeholder:text-[#667085]"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="rounded-full px-2 text-xl text-gray-400 transition hover:text-gray-700"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </header>

      <section className="mx-auto w-18/19 float-right max-w-[1460px] px-3 pb-12 sm:px-5 lg:px-8">
        <div className="reel-grid grid grid-cols-2 gap-px overflow-hidden sm:grid-cols-3 lg:grid-cols-4">
          {reels.map((reel, index) => (
            <button
              key={reel.image}
              onClick={() => setActive(index)}
              className="reel group relative aspect-[3/4] min-w-0 overflow-hidden bg-[#efefef] text-left outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
              aria-label={`Open reel ${index + 1}`}
            >
              <img
                src={reel.image}
                alt={`Reel thumbnail ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
              />
              <span className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-[8px] bg-white text-black shadow-sm transition duration-300 group-hover:scale-110">
                <FaPlayCircle size={15} fill="currentColor" strokeWidth={1.5} />
              </span>
              <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25" />
              <span className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-center gap-7 bg-gradient-to-t from-black/55 to-transparent pb-6 pt-12 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="flex items-center gap-2">
                  <FaRegHeart size={19} fill="white" />
                  {reel.likes}
                </span>
                <span className="flex items-center gap-2">
                  <FiMessageCircle size={19} fill="white" />
                  {reel.comments}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="presentation"
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-[980px] overflow-hidden rounded-xl bg-[#111] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex max-h-[92vh] flex-1 items-center justify-center bg-black">
              <img
                src={reels[active].image}
                alt={`Reel ${active + 1}`}
                className="max-h-[92vh] max-w-full object-contain"
              />
            </div>
            <aside className="hidden w-[310px] flex-col bg-white p-5 sm:flex">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white">
                    <FaInstagram size={17} />
                  </span>
                  <span className="text-sm font-semibold">Instagram</span>
                </div>
                <FiMoreHorizontal size={21} />
              </div>
              <div className="flex-1 pt-5 text-sm text-gray-500">
                Explore reels and videos
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      setLiked((old) =>
                        old.includes(active)
                          ? old.filter((n) => n !== active)
                          : [...old, active],
                      )
                    }
                    className={`transition hover:scale-110 ${liked.includes(active) ? "text-rose-500" : ""}`}
                    aria-label="Like"
                  >
                    <FaRegHeart
                      size={23}
                      fill={liked.includes(active) ? "currentColor" : "none"}
                    />
                  </button>
                  <FiMessageCircle size={23} />
                  <RiSendInsFill size={22} />
                </div>
                <BiBookmark size={22} />
              </div>
              <p className="pt-3 text-xs font-semibold">
                {reels[active].likes} likes
              </p>
            </aside>
            <button
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/55 text-2xl text-white transition hover:rotate-90 hover:bg-black/80"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
