import { useRef, useState } from "react";
import {
  FiHeart,
  FiMessageCircle,
  FiSend,
  FiBookmark,
  FiMoreHorizontal,
  FiSmile,
  FiChevronRight,
} from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";

export default function Home() {
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [activeStory, setActiveStory] = useState(null);
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [heartAnimation, setHeartAnimation] = useState([]);
  const storiesRef = useRef(null);
  const stories = [
    {
      name: "pratikk._216",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
    },
    {
      name: "aniket_ara...",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    },
    {
      name: "sarthak.tu...",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    },
    {
      name: "ashish_cho...",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    },
    {
      name: "ly_samyaa...",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
    },
    {
      name: "_mr_rohan...",
      image:
        "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop",
    },
    {
      name: "travel.diary",
      image:
        "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=150&h=150&fit=crop",
    },
    {
      name: "sarthak.tu...",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    },
    {
      name: "ashish_cho...",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    },
    {
      name: "ly_samyaa...",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
    },
    {
      name: "_mr_rohan...",
      image:
        "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop",
    },
    {
      name: "travel.diary",
      image:
        "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=150&h=150&fit=crop",
    },
    {
      name: "sarthak.tu...",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    },
    {
      name: "ashish_cho...",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    },
    {
      name: "ly_samyaa...",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
    },
    {
      name: "_mr_rohan...",
      image:
        "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop",
    },
    {
      name: "travel.diary",
      image:
        "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=150&h=150&fit=crop",
    },
  ];

  const posts = [
    {
      id: 1,
      username: "gavthi2.0",
      collaborator: "gavthi_jokes",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      time: "1m",
      image:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1000&auto=format&fit=crop&q=85",
      caption: "Some moments are just different ❤️✨",
      likes: 1248,
      commentCount: 86,
    },
    {
      id: 2,
      username: "travel.diary",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      time: "15m",
      image:
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1000&auto=format&fit=crop&q=85",
      caption: "Collecting memories, one sunset at a time 🌅",
      likes: 843,
      commentCount: 32,
    },
    {
      id: 3,
      username: "daily.vibes",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop",
      time: "28m",
      image:
        "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1000&auto=format&fit=crop&q=85",
      caption: "A little reminder to enjoy the journey 🌿",
      likes: 2567,
      commentCount: 104,
    },
  ];

  return (
    <main className="min-h-screen bg-white text-[#262626] md:ml-[72px]">
      {/* Stories */}
      <section className="mx-auto w-full max-w-[830px] px-3 pb-5 pt-[72px] sm:px-5 md:pt-7">
        <div className="relative">
          <button
            type="button"
            aria-label="Scroll stories left"
            onClick={() =>
              storiesRef.current?.scrollBy({
                left: -350,
                behavior: "smooth",
              })
            }
            className="absolute right-190 z-100 top-7 hidden h-7 w-7 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition hover:scale-110 sm:flex"
          >
            <FiChevronLeft />
          </button>
          <div
            ref={storiesRef}
            className="flex gap-3 overflow-x-auto scroll-smooth pb-1
    [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5"
          >
            {stories.map((story, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveStory(story)}
                className="group flex w-[67px] shrink-0 flex-col items-center gap-1.5 animate-[storyEnter_.45s_ease_both] sm:w-[90px]"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <span className="relative rounded-full bg-[conic-gradient(from_210deg,#ffd776,#ff9b25,#ff3040,#c900a7,#e500a4,#ffd776)] p-[3px] transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1 sm:p-[4px]">
                  <span className="block rounded-full bg-white p-[2px]">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="h-[59px] w-[59px] rounded-full object-cover sm:h-[78px] sm:w-[78px]"
                    />
                  </span>
                </span>
                <span className="w-full truncate text-center text-[11px] sm:text-xs">
                  {story.name}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Scroll stories right"
            onClick={() =>
              storiesRef.current?.scrollBy({
                left: 350,
                behavior: "smooth",
              })
            }
            className="absolute right-0 top-7 hidden h-7 w-7 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition hover:scale-110 sm:flex"
          >
            <FiChevronRight />
          </button>
        </div>
      </section>

      {/* Feed */}
      <section className="mx-auto w-full max-w-[590px] pb-16">
        {posts.map((post, index) => (
          <article
            key={post.id}
            className="mb-5 border-b border-neutral-200 pb-4 animate-[postEnter_.45s_ease_both]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Post header */}
            <header className="flex min-h-[54px] items-center justify-between gap-3 px-3 pb-2 sm:px-0">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="shrink-0 rounded-full bg-[conic-gradient(from_210deg,#ffd776,#ff3040,#c900a7,#ffd776)] p-[2px]">
                  <img
                    src={post.avatar}
                    alt=""
                    className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  />
                </span>

                <div className="min-w-0">
                  <div className="truncate text-[12px] font-semibold sm:text-sm">
                    {post.username}
                    {post.collaborator && (
                      <>
                        <span className="font-normal"> and </span>
                        <span>{post.collaborator}</span>
                      </>
                    )}
                    <span className="font-normal text-neutral-500">
                      {" "}
                      · {post.time}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                aria-label="More post options"
                className="shrink-0 rounded-full p-2 transition hover:bg-neutral-100 active:scale-90"
              >
                <FiMoreHorizontal className="h-5 w-5" />
              </button>
            </header>

            {/* Post image */}
            <div
              className="group relative aspect-[4/5] w-full cursor-pointer overflow-hidden bg-neutral-100 sm:rounded-[3px]"
              onDoubleClick={() => {
                setLikedPosts((previous) =>
                  previous.includes(post.id)
                    ? previous
                    : [...previous, post.id],
                );

                // Prevent duplicate heart animations
                setHeartAnimation((previous) =>
                  previous.includes(post.id)
                    ? previous
                    : [...previous, post.id],
                );

                setTimeout(() => {
                  setHeartAnimation((previous) =>
                    previous.filter((id) => id !== post.id),
                  );
                }, 650);
              }}
            >
              <img
                src={post.image}
                alt={post.caption}
                loading={index === 0 ? "eager" : "lazy"}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              />

              {heartAnimation.includes(post.id) && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <FiHeart className="h-24 w-24 animate-[heartPop_.65s_ease-out] fill-white text-white drop-shadow-lg" />
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between px-3 pt-1 sm:px-0">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  aria-label="Like post"
                  onClick={() =>
                    setLikedPosts((previous) =>
                      previous.includes(post.id)
                        ? previous.filter((id) => id !== post.id)
                        : [...previous, post.id],
                    )
                  }
                  className={`transition duration-200 hover:scale-110 active:scale-90 ${
                    likedPosts.includes(post.id)
                      ? "scale-105 text-red-500"
                      : "text-[#262626]"
                  }`}
                >
                  <FiHeart
                    className={`h-[25px] w-[25px] ${
                      likedPosts.includes(post.id) ? "fill-red-500" : ""
                    }`}
                  />
                </button>

                <button
                  type="button"
                  aria-label="Focus comment input"
                  onClick={() =>
                    document.getElementById(`comment-${post.id}`)?.focus()
                  }
                  className="transition duration-200 hover:scale-110 active:scale-90"
                >
                  <FiMessageCircle className="h-[25px] w-[25px]" />
                </button>

                <button
                  type="button"
                  aria-label="Share post"
                  className="transition duration-200 hover:scale-110 active:scale-90"
                >
                  <FiSend className="h-[24px] w-[24px]" />
                </button>
              </div>

              <button
                type="button"
                aria-label="Save post"
                onClick={() =>
                  setSavedPosts((previous) =>
                    previous.includes(post.id)
                      ? previous.filter((id) => id !== post.id)
                      : [...previous, post.id],
                  )
                }
                className="transition duration-200 hover:scale-110 active:scale-90"
              >
                <FiBookmark
                  className={`h-[25px] w-[25px] ${
                    savedPosts.includes(post.id) ? "fill-black" : ""
                  }`}
                />
              </button>
            </div>

            {/* Caption and comments */}
            <div className="px-3 pt-2 text-[12px] sm:px-0 sm:text-[13px]">
              <p className="mb-2 font-semibold">
                {(
                  post.likes + (likedPosts.includes(post.id) ? 1 : 0)
                ).toLocaleString()}{" "}
                likes
              </p>

              <p className="mb-1 leading-relaxed">
                <span className="mr-1 font-semibold">{post.username}</span>
                {post.caption}
              </p>

              <button
                type="button"
                onClick={() =>
                  document.getElementById(`comment-${post.id}`)?.focus()
                }
                className="my-1 text-neutral-500 transition hover:text-neutral-800"
              >
                View all {post.commentCount + (comments[post.id]?.length || 0)}{" "}
                comments
              </button>

              {comments[post.id]?.map((comment, commentIndex) => (
                <p key={commentIndex} className="my-1 break-words">
                  <span className="mr-1 font-semibold">you</span>
                  {comment}
                </p>
              ))}

              <form
                className="mt-2 flex items-center gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  const value = commentInputs[post.id]?.trim();
                  if (!value) return;

                  setComments((previous) => ({
                    ...previous,
                    [post.id]: [...(previous[post.id] || []), value],
                  }));

                  setCommentInputs((previous) => ({
                    ...previous,
                    [post.id]: "",
                  }));
                }}
              >
                <input
                  id={`comment-${post.id}`}
                  value={commentInputs[post.id] || ""}
                  onChange={(event) =>
                    setCommentInputs((previous) => ({
                      ...previous,
                      [post.id]: event.target.value,
                    }))
                  }
                  placeholder="Add a comment..."
                  aria-label="Add a comment"
                  className="min-w-0 flex-1 bg-transparent py-1 outline-none placeholder:text-neutral-400 focus:outline-none"
                />

                {commentInputs[post.id]?.trim() && (
                  <button
                    type="submit"
                    className="font-semibold text-sky-500 transition hover:text-sky-700"
                  >
                    Post
                  </button>
                )}

                <FiSmile className="shrink-0 text-base text-neutral-500" />
              </form>
            </div>
          </article>
        ))}
      </section>

      {/* Story viewer */}
      {activeStory && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeStory.name} story`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm animate-[fadeIn_.2s_ease]"
          onClick={() => setActiveStory(null)}
        >
          <div
            className="relative h-[min(85dvh,720px)] w-full max-w-[390px] overflow-hidden rounded-lg bg-neutral-900 shadow-2xl animate-[storyOpen_.25s_ease]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute left-3 right-3 top-3 z-10 h-[3px] overflow-hidden rounded-full bg-white/40">
              <div className="h-full w-full origin-left animate-[storyProgress_5s_linear] bg-white" />
            </div>

            <div className="absolute left-4 right-4 top-7 z-10 flex items-center gap-2 text-white">
              <img
                src={activeStory.image}
                alt=""
                className="h-9 w-9 rounded-full border-2 border-pink-500 object-cover"
              />
              <span className="flex-1 text-sm font-semibold">
                {activeStory.name}
              </span>
              <button
                type="button"
                onClick={() => setActiveStory(null)}
                className="px-2 text-2xl"
                aria-label="Close story"
              >
                ×
              </button>
            </div>

            <img
              src={activeStory.image}
              alt={`${activeStory.name}'s story`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}
    </main>
  );
}
