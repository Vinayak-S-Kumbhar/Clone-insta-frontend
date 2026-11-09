import axios from "axios";
import { useEffect, useState } from "react";
import {
  FiSettings,
  FiCamera,
  FiPlus,
  FiGrid,
  FiBookmark,
  FiUserCheck,
  FiAtSign,
  FiX,
  FiImage,
  FiMoreHorizontal,
  FiCheck,
} from "react-icons/fi";
import api from "../api";
import { useQuery } from "@tanstack/react-query";

const fetchUserInfo = (userId) => {
  return api.get(`/user/${userId}`);
};
export default function Profile() {
  const [profile, setProfile] = useState({});
  const [activeTab, setActiveTab] = useState("Posts");
  const [modal, setModal] = useState(null);
  const [storyName, setStoryName] = useState("New");
  const [newPhoto, setNewPhoto] = useState("");
  const [posts, setPosts] = useState([]);
  const [savedProfile, setSavedProfile] = useState(profile);
  const userId = localStorage.getItem("ui");

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserInfo(userId),
  });

  useEffect(() => {
    if (data?.data) {
      setProfile(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <main className="min-h-screen bg-white pb-[76px] pt-[76px] text-[#101114] md:ml-[72px] md:pb-8 md:pt-8">
      <div className="mx-auto w-full max-w-[935px] px-4 sm:px-6 md:px-8">
        {/* Profile header */}
        <section className="relative grid grid-cols-[100px_minmax(0,1fr)] gap-x-4 sm:grid-cols-[minmax(180px,1fr)_2fr] sm:gap-x-7 md:gap-x-12">
          <button
            type="button"
            onClick={() => setModal("edit")}
            aria-label="Change profile photo"
            className="profile-avatar group relative mx-auto mt-1 flex h-[86px] w-[86px] items-center justify-center overflow-hidden rounded-full bg-[#8a8a8a] transition-transform duration-300 hover:scale-[1.03] sm:h-[130px] sm:w-[130px] md:h-[180px] md:w-[180px]"
          >
            <span className="absolute left-1/2 top-[19%] h-[38%] w-[38%] -translate-x-1/2 rounded-full bg-[#626467]" />
            <span className="absolute bottom-[-19%] left-1/2 h-[55%] w-[78%] -translate-x-1/2 rounded-t-[100%] bg-[#626467]" />
            <span className="absolute inset-0 flex items-center justify-center text-white opacity-100 transition-opacity duration-200 group-hover:opacity-100">
              <FiCamera className="h-7 w-7 stroke-[2.8] drop-shadow sm:h-8 sm:w-8 md:h-10 md:w-10" />
            </span>
          </button>

          <div className="min-w-0 pt-0.5 sm:pt-2 md:pt-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h1 className="max-w-full truncate text-[18px] font-normal leading-tight sm:text-[22px] md:text-[28px]">
                {profile.username}
              </h1>
              <button
                type="button"
                aria-label="Profile settings"
                onClick={() => setModal("settings")}
                className="rounded-full p-1.5 transition-all duration-200 hover:rotate-45 hover:bg-neutral-100 active:scale-90"
              >
                <FiSettings className="h-[21px] w-[21px] stroke-[2.3] md:h-7 md:w-7" />
              </button>
              <button
                type="button"
                aria-label="More profile options"
                onClick={() => setModal("settings")}
                className="rounded-full p-1 transition-colors hover:bg-neutral-100 sm:hidden"
              >
                <FiMoreHorizontal className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-[14px] sm:text-[15px] md:text-[16px]">
              {profile.name}
            </p>

            <div className="mt-4 hidden items-center gap-5 text-[15px] md:flex">
              <span>
                <strong className="font-semibold">{posts.length}</strong> posts
              </span>
              <button
                type="button"
                onClick={() => setModal("followers")}
                className="transition-opacity hover:opacity-60"
              >
                <strong className="font-semibold">260</strong> followers
              </button>
              <button
                type="button"
                onClick={() => setModal("following")}
                className="transition-opacity hover:opacity-60"
              >
                <strong className="font-semibold">274</strong> following
              </button>
            </div>
            {profile.bio && (
              <p className="mt-3 hidden whitespace-pre-wrap text-sm md:block">
                {profile.bio}
              </p>
            )}
            <button
              type="button"
              onClick={() => setModal("threads")}
              className="mt-3 hidden items-center gap-1.5 text-sm font-semibold md:flex"
            >
              <FiAtSign className="h-[18px] w-[18px]" /> {profile.username}
            </button>
          </div>

          {/* Mobile profile stats appear below the first row. */}
          <div className="col-span-2 mt-5 grid grid-cols-3 border-y border-neutral-100 py-3 text-center text-[13px] sm:hidden">
            <div>
              <strong className="block text-[15px] font-semibold">
                {posts.length}
              </strong>
              <span className="text-neutral-500">posts</span>
            </div>
            <button type="button" onClick={() => setModal("followers")}>
              <strong className="block text-[15px] font-semibold">260</strong>
              <span className="text-neutral-500">followers</span>
            </button>
            <button type="button" onClick={() => setModal("following")}>
              <strong className="block text-[15px] font-semibold">274</strong>
              <span className="text-neutral-500">following</span>
            </button>
          </div>
          <div className="col-span-2 mt-3 sm:hidden">
            {profile.bio && (
              <p className="mb-2 whitespace-pre-wrap text-sm">{profile.bio}</p>
            )}
            <button
              type="button"
              onClick={() => setModal("threads")}
              className="flex items-center gap-1 text-sm font-semibold"
            >
              <FiAtSign className="h-4 w-4" />
              {profile.username}
            </button>
          </div>
        </section>

        {/* Profile actions */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-7 md:mt-8 md:gap-3">
          <button
            type="button"
            onClick={() => {
              setSavedProfile(profile);
              setModal("edit");
            }}
            className="rounded-lg bg-[#efeff1] px-3 py-2.5 text-center text-[13px] font-semibold transition-all duration-200 hover:bg-[#e4e4e7] active:scale-[0.99] sm:text-sm md:rounded-xl md:py-3"
          >
            Edit profile
          </button>
          <button
            type="button"
            onClick={() => setModal("archive")}
            className="rounded-lg bg-[#efeff1] px-3 py-2.5 text-center text-[13px] font-semibold transition-all duration-200 hover:bg-[#e4e4e7] active:scale-[0.99] sm:text-sm md:rounded-xl md:py-3"
          >
            View archive
          </button>
        </div>

        {/* Story highlight */}
        <div className="mt-8 min-h-[140px] sm:mt-10 sm:min-h-[155px] md:mt-14 md:min-h-[165px]">
          <button
            type="button"
            onClick={() => setModal("story")}
            className="group flex w-[82px] flex-col items-center gap-2.5 rounded-xl p-1 transition-transform duration-200 hover:-translate-y-1 active:scale-95 sm:w-[100px]"
          >
            <span className="flex h-[76px] w-[76px] items-center justify-center rounded-full border-[3px] border-[#dfe2e7] p-[3px] transition-colors duration-200 group-hover:border-neutral-400 sm:h-[88px] sm:w-[88px] md:h-[106px] md:w-[106px]">
              <span className="flex h-full w-full items-center justify-center rounded-full border border-neutral-100 bg-[#f7f7f8] text-[#c7c7c7] transition-colors duration-200 group-hover:bg-[#efeff1]">
                <FiPlus className="h-10 w-10 stroke-[1.5] sm:h-11 sm:w-11 md:h-[54px] md:w-[54px]" />
              </span>
            </span>
            <span className="max-w-full truncate text-[12px] font-medium sm:text-[13px]">
              {storyName}
            </span>
          </button>
        </div>

        {/* Profile tabs */}
        <div className="grid grid-cols-3 border-t border-[#dbdbdb]">
          {[
            { label: "Posts", icon: FiGrid },
            { label: "Saved", icon: FiBookmark },
            { label: "Tagged", icon: FiUserCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const selected = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(tab.label)}
                className={`relative flex h-[54px] items-center justify-center transition-colors duration-200 hover:text-black sm:h-[60px] ${selected ? "text-[#101114]" : "text-[#8e8e8e]"}`}
                aria-selected={selected}
              >
                <Icon
                  className={`h-[22px] w-[22px] transition-transform duration-200 sm:h-[24px] sm:w-[24px] ${selected ? "scale-105 stroke-[2.5]" : "stroke-[1.9]"}`}
                />
                {selected && (
                  <span className="absolute top-[-1px] h-[2px] w-[54px] bg-[#262626] sm:w-[66px]" />
                )}
                <span className="sr-only">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Empty state or uploaded photos */}
        {activeTab === "Posts" && posts.length === 0 && (
          <section className="mx-auto flex min-h-[280px] flex-col items-center justify-start px-4 pt-14 text-center sm:min-h-[350px] sm:pt-16 md:min-h-[390px] md:pt-[74px] animate-fade-in">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border-[1.7px] border-[#111827] sm:h-[76px] sm:w-[76px]">
              <FiCamera className="h-9 w-9 stroke-[1.2] sm:h-10 sm:w-10" />
            </div>
            <h2 className="mt-5 text-[26px] font-bold tracking-tight sm:mt-6 sm:text-[30px]">
              Share Photos
            </h2>
            <p className="mt-2 max-w-[320px] text-[12px] leading-5 text-neutral-600 sm:text-[13px]">
              When you share photos, they will appear on your profile.
            </p>
            <button
              type="button"
              onClick={() => setModal("create")}
              className="mt-3 text-[12px] font-semibold text-[#0095f6] transition-colors hover:text-[#00376b] sm:text-[13px]"
            >
              Share your first photo
            </button>
          </section>
        )}

        {activeTab === "Posts" && posts.length > 0 && (
          <section className="grid grid-cols-3 gap-[2px] pt-1 sm:gap-1 sm:pt-2 animate-fade-in">
            {posts.map((photo, index) => (
              <button
                key={`${photo}-${index}`}
                type="button"
                onClick={() => {
                  setNewPhoto(photo);
                  setModal("photoPreview");
                }}
                className="aspect-square overflow-hidden bg-neutral-100"
              >
                <img
                  src={photo}
                  alt={`Profile post ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                />
              </button>
            ))}
          </section>
        )}

        {activeTab !== "Posts" && (
          <section className="flex min-h-[280px] flex-col items-center pt-12 text-center sm:min-h-[350px] sm:pt-16 animate-fade-in">
            {activeTab === "Saved" ? (
              <FiBookmark className="h-10 w-10 stroke-[1.4] sm:h-12 sm:w-12" />
            ) : (
              <FiUserCheck className="h-10 w-10 stroke-[1.4] sm:h-12 sm:w-12" />
            )}
            <h2 className="mt-4 text-[23px] font-bold sm:text-[28px]">
              {activeTab === "Saved" ? "Save" : "Photos of you"}
            </h2>
            <p className="mt-2 max-w-[330px] text-xs leading-5 text-neutral-600 sm:text-[13px]">
              {activeTab === "Saved"
                ? "Save photos and videos that you want to see again."
                : "When people tag you in photos, they will appear here."}
            </p>
          </section>
        )}
      </div>

      {/* Modals */}
      {modal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px] animate-fade-in"
          onClick={() => setModal(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-[410px] overflow-hidden rounded-2xl bg-white shadow-2xl animate-modal-in"
          >
            <div className="flex h-12 items-center justify-between border-b border-neutral-200 px-4">
              <button
                type="button"
                aria-label="Close dialog"
                onClick={() => setModal(null)}
                className="rounded-full p-1 transition-colors hover:bg-neutral-100"
              >
                <FiX className="h-5 w-5" />
              </button>
              <h2 className="text-sm font-semibold">
                {{
                  edit: "Edit profile",
                  archive: "Archive",
                  story: "New story highlight",
                  create: "Create new post",
                  settings: "Settings",
                  followers: "Followers",
                  following: "Following",
                  threads: "Threads",
                  photoPreview: "Post preview",
                }[modal] || "Instagram"}
              </h2>
              {modal === "edit" ? (
                <button
                  type="button"
                  onClick={() => {
                    setSavedProfile(profile);
                    setModal(null);
                  }}
                  className="text-sm font-semibold text-[#0095f6] hover:text-[#00376b]"
                >
                  Done
                </button>
              ) : (
                <span className="w-8" />
              )}
            </div>

            {modal === "edit" && (
              <form
                className="space-y-4 p-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  setModal(null);
                }}
              >
                <div className="flex items-center gap-3 pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200">
                    <FiCamera className="h-5 w-5 text-neutral-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {profile.username}
                    </p>
                    <button
                      type="button"
                      onClick={() => setModal("create")}
                      className="mt-0.5 text-xs font-semibold text-[#0095f6]"
                    >
                      Change profile photo
                    </button>
                  </div>
                </div>
                <label className="block text-sm font-semibold">
                  Name
                  <input
                    value={profile.name}
                    onChange={(event) =>
                      setProfile({ ...profile, name: event.target.value })
                    }
                    className="mt-1.5 w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm font-normal outline-none transition focus:border-neutral-500"
                  />
                </label>

                <label className="block text-sm font-semibold">
                  Bio
                  <textarea
                    value={profile.bio}
                    onChange={(event) =>
                      setProfile({ ...profile, bio: event.target.value })
                    }
                    rows={3}
                    maxLength={150}
                    placeholder="Write a little about yourself"
                    className="mt-1.5 w-full resize-none rounded-lg border border-neutral-300 px-3 py-2.5 text-sm font-normal outline-none transition focus:border-neutral-500"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#0095f6] py-2.5 text-sm font-semibold text-white transition hover:bg-[#1877f2] active:scale-[0.99]"
                >
                  Save changes
                </button>
              </form>
            )}

            {modal === "archive" && (
              <div className="flex flex-col items-center px-6 py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-neutral-300">
                  <FiCamera className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Your archive</h3>
                <p className="mt-2 max-w-[270px] text-sm leading-5 text-neutral-500">
                  Only you can see the stories and posts you archive.
                </p>
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="mt-5 rounded-lg bg-neutral-100 px-5 py-2 text-sm font-semibold transition hover:bg-neutral-200"
                >
                  Done
                </button>
              </div>
            )}

            {modal === "story" && (
              <form
                className="p-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  setStoryName(storyName.trim() || "New");
                  setModal(null);
                }}
              >
                <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border-2 border-neutral-200 bg-neutral-50 text-neutral-400">
                  <FiPlus className="h-10 w-10" />
                </div>
                <label className="block text-sm font-semibold">
                  Highlight name
                  <input
                    autoFocus
                    value={storyName}
                    onChange={(event) => setStoryName(event.target.value)}
                    maxLength={15}
                    className="mt-2 w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm font-normal outline-none focus:border-neutral-500"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-4 w-full rounded-lg bg-[#0095f6] py-2.5 text-sm font-semibold text-white transition hover:bg-[#1877f2]"
                >
                  Save highlight
                </button>
              </form>
            )}

            {modal === "create" && (
              <div className="flex flex-col items-center px-6 py-9 text-center">
                {newPhoto ? (
                  <img
                    src={newPhoto}
                    alt="Selected upload preview"
                    className="mb-5 max-h-56 max-w-full rounded-lg object-contain"
                  />
                ) : (
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-neutral-300">
                    <FiImage className="h-9 w-9" />
                  </div>
                )}
                <h3 className="text-lg font-medium">
                  {newPhoto ? "Your photo is ready" : "Share a photo"}
                </h3>
                <p className="mt-2 text-sm text-neutral-500">
                  Choose an image from your device to add it to your profile.
                </p>
                <label className="mt-5 cursor-pointer rounded-lg bg-[#0095f6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1877f2] active:scale-[0.98]">
                  {newPhoto ? "Choose another photo" : "Select from computer"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) setNewPhoto(URL.createObjectURL(file));
                    }}
                  />
                </label>
                {newPhoto && (
                  <button
                    type="button"
                    onClick={() => {
                      setPosts([...posts, newPhoto]);
                      setActiveTab("Posts");
                      setNewPhoto("");
                      setModal(null);
                    }}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-100 py-2.5 text-sm font-semibold transition hover:bg-neutral-200"
                  >
                    <FiCheck className="h-4 w-4" /> Add to profile
                  </button>
                )}
              </div>
            )}

            {modal === "photoPreview" && newPhoto && (
              <div className="p-4">
                <img
                  src={newPhoto}
                  alt="Selected profile post"
                  className="mx-auto max-h-[60vh] w-auto rounded-lg object-contain"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPosts(posts.filter((photo) => photo !== newPhoto));
                    setNewPhoto("");
                    setModal(null);
                  }}
                  className="mt-4 w-full rounded-lg bg-red-50 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                >
                  Remove photo
                </button>
              </div>
            )}

            {["settings", "followers", "following", "threads"].includes(
              modal,
            ) && (
              <div className="flex flex-col items-center px-6 py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
                  <FiSettings className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">
                  {modal === "settings"
                    ? "Profile settings"
                    : modal === "followers"
                      ? "260 followers"
                      : modal === "following"
                        ? "274 following"
                        : "Open Threads"}
                </h3>
                <p className="mt-2 max-w-[275px] text-sm leading-5 text-neutral-500">
                  {modal === "settings"
                    ? "Manage your profile preferences and account details."
                    : modal === "followers"
                      ? "Your follower list will appear here when connected to an account."
                      : modal === "following"
                        ? "The accounts you follow will appear here when connected to an account."
                        : "This demo shows the Threads profile link as a preview."}
                </p>
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="mt-5 rounded-lg bg-neutral-100 px-5 py-2 text-sm font-semibold transition hover:bg-neutral-200"
                >
                  Close
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
