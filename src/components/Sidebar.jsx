import { useEffect, useState } from "react";
import {
  FiInstagram,
  FiHome,
  //   FiPlaySquare,
  FiSend,
  FiSearch,
  FiHeart,
  FiPlusSquare,
  FiUser,
  FiMenu,
  FiGrid,
  FiX,
} from "react-icons/fi";

import { FiPlayCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState(
    window.location.href.split("/")[3],
  );
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  console.log(window.location.href.split("/")[3]);

  const navItems = [
    { label: "Home", icon: FiHome, link: "/" },
    { label: "Reels", icon: FiPlayCircle, link: "/Reels" },
    { label: "Messages", icon: FiSend, link: "/Messages" },
    { label: "Search", icon: FiSearch, link: "/Search" },
    { label: "Notifications", icon: FiHeart, link: "/Notifications" },
    { label: "Create", icon: FiPlusSquare, link: "/Create" },
    { label: "Profile", icon: FiUser, link: "/Profile" },
  ];

  useEffect(() => {
    if (window.location.href.split("/")[3] == "") {
      setActiveItem("Home");
    }
  }, [navItems]);

  return (
    <>
      {/* Desktop / laptop sidebar: expands over the page when hovered or keyboard-focused. */}
      <aside className="instagram-sidebar group/sidebar fixed inset-y-0 left-0 z-40 hidden w-[72px] flex-col border-r border-black/5 bg-white px-3 pb-5 pt-7 transition-[width] duration-300 ease-in-out hover:w-[244px] focus-within:w-[244px] md:flex">
        <button
          type="button"
          aria-label="Instagram home"
          onClick={() => setActiveItem("Home")}
          className="mb-8 flex h-12 shrink-0 items-center gap-4 rounded-xl px-2 text-left transition-colors hover:bg-neutral-100"
        >
          <FiInstagram className="h-7 w-7 min-w-7" />
          <span className="sidebar-label whitespace-nowrap text-[23px] font-semibold tracking-tight opacity-0 transition-all duration-200 group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100 group-focus-within/sidebar:translate-x-0 group-focus-within/sidebar:opacity-100">
            Instagram
          </span>
        </button>

        <nav
          aria-label="Main navigation"
          className="flex flex-1 flex-col gap-2"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const selected = activeItem === item.label;
            return (
              <button
                key={item.label}
                // type="button"
                title={item.label}
                onClick={() => {
                  setActiveItem(item.label);
                  navigate(item.link);
                }}
                className={`group/nav flex h-[52px] w-full shrink-0 items-center gap-4 rounded-xl px-[13px] text-left transition-all duration-200 hover:bg-neutral-100 active:scale-[0.98] ${selected ? "font-semibold" : "font-normal"}`}
                aria-current={selected ? "page" : undefined}
              >
                <Icon
                  className={`h-[25px] w-[25px] min-w-[25px] transition-transform duration-200 group-hover/nav:scale-105 ${selected ? "stroke-[2.4]" : "stroke-[1.8]"}`}
                />
                <span className="sidebar-label translate-x-[-5px] whitespace-nowrap text-[16px] opacity-0 transition-all duration-200 group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100 group-focus-within/sidebar:translate-x-0 group-focus-within/sidebar:opacity-100">
                  {item.label}
                </span>
                {item.label === "Messages" && (
                  <span className="ml-auto hidden h-2 w-2 rounded-full bg-red-500 group-hover/sidebar:hidden" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="relative mt-4">
          {showMore && (
            <div className="absolute bottom-[58px] left-0 w-[220px] overflow-hidden rounded-2xl border border-black/5 bg-white py-2 shadow-[0_4px_30px_rgba(0,0,0,0.14)] animate-pop-in">
              <button
                type="button"
                onClick={() => {
                  setActiveItem("Settings");
                  setShowMore(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-100"
              >
                Settings
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveItem("Your activity");
                  setShowMore(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-100"
              >
                Your activity
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveItem("Switch appearance");
                  setShowMore(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-100"
              >
                Switch appearance
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={() => setShowMore((value) => !value)}
            className="flex h-[52px] w-full items-center gap-4 rounded-xl px-[13px] text-left transition-colors hover:bg-neutral-100 active:scale-[0.98]"
            aria-expanded={showMore}
          >
            {showMore ? (
              <FiX className="h-[25px] w-[25px] min-w-[25px]" />
            ) : (
              <FiMenu className="h-[25px] w-[25px] min-w-[25px]" />
            )}
            <span className="sidebar-label translate-x-[-5px] whitespace-nowrap text-[16px] opacity-0 transition-all duration-200 group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100 group-focus-within/sidebar:translate-x-0 group-focus-within/sidebar:opacity-100">
              More
            </span>
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-[58px] items-center justify-between border-b border-black/5 bg-white/95 px-4 backdrop-blur md:hidden">
        <button
          type="button"
          aria-label="Instagram home"
          onClick={() => setActiveItem("Home")}
          className="rounded-md p-1 transition-transform active:scale-95"
        >
          <FiInstagram className="h-[27px] w-[27px]" />
        </button>
        <span className="text-[21px] font-semibold tracking-tight">
          Instagram
        </span>
        <button
          type="button"
          aria-label="Create post"
          onClick={() => setActiveItem("Create")}
          className="rounded-md p-1 transition-transform active:scale-95"
        >
          <FiPlusSquare className="h-6 w-6" />
        </button>
      </header>

      {/* Mobile bottom navigation */}
      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-40 flex h-[58px] items-center justify-around border-t border-black/10 bg-white px-2 md:hidden"
      >
        {[
          { label: "Home", icon: FiHome },
          { label: "Search", icon: FiSearch },
          { label: "Reels", icon: FiPlayCircle },
          { label: "Messages", icon: FiSend },
          { label: "Profile", icon: FiUser },
        ].map((item) => {
          const Icon = item.icon;
          const selected = activeItem === item.label;
          return (
            <button
              type="button"
              key={item.label}
              title={item.label}
              onClick={() => setActiveItem(item.label)}
              className={`flex h-11 w-12 items-center justify-center rounded-xl transition-all duration-200 active:scale-90 ${selected ? "bg-neutral-100" : "hover:bg-neutral-50"}`}
              aria-current={selected ? "page" : undefined}
            >
              <Icon
                className={`h-[24px] w-[24px] transition-transform duration-200 ${selected ? "stroke-[2.4]" : "stroke-[1.8]"}`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
