import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { SiMeta } from "react-icons/si";
import "../index.css";
import collage from "../assets/instagram-collage.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login({ logindata }) {
  const [username, setUsername] = useState(logindata.username);
  const [password, setPassword] = useState(logindata.password);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); //for login button
  const navigate = useNavigate();
  const canLogin = useMemo(
    () => username.trim().length > 0 && password.length > 0,
    [username, password],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("login");
    console.log(username, password);
    setLoading(true);
    try {
      const responce = await axios.post("http://localhost:8080/Auth/login", {
        username: username,
        password: password,
      });
      console.log(responce);

      localStorage.setItem("Ig_at", responce.data.accessToken);
      localStorage.setItem("Ig_rt", responce.data.refreshToken);
      localStorage.setItem("ui", responce.data.userId);
      toast.success("login Successfull");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[55.6%_44.4%]">
        <section className="relative hidden min-h-screen overflow-hidden border-r border-[#e6e6e6] lg:block">
          <motion.div
            className="absolute left-[53px] top-[53px]"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <FaInstagram
              className="text-[74px]"
              fill="url(#instagramGradient)"
              aria-label="Instagram"
            />
          </motion.div>

          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient
                id="instagramGradient"
                x1="0"
                y1="1"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#F58529" />
                <stop offset="35%" stopColor="#DD2A7B" />
                <stop offset="67%" stopColor="#8134AF" />
                <stop offset="100%" stopColor="#515BD4" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center pt-[150px]">
            <motion.h1
              className="text-center text-[40px] font-normal leading-[1.18] tracking-[-1.7px]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              See everyday moments from your
              <span className="mt-[18px] block bg-gradient-to-r from-[#ff654d] via-[#ee1474] to-[#8d1fd1] bg-clip-text text-transparent">
                close friends.
              </span>
            </motion.h1>

            <motion.div
              className="mt-[48px] animate-gentle-float"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.22,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img
                src={collage}
                alt="Instagram close friends collage"
                className="w-[465px] max-w-[44vw] select-none object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.10)]"
                draggable="false"
              />
            </motion.div>
          </div>
        </section>

        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10 lg:items-start lg:px-0 lg:pt-[110px]">
          <motion.div
            className="w-full max-w-[666px]"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-[48px] flex items-center px-[2px]">
              {/* <motion.button
                type="button"
                aria-label="Back"
                className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-black/[0.04]"
                whileHover={{ x: -3, scale: 1.04 }}
                whileTap={{ scale: 0.92 }}
              ></motion.button> */}
              <h2 className="ml-7 text-[20px] font-semibold leading-none tracking-[-0.25px]">
                Log into Clone Instagram
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-[15px] m-7">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.5 }}
              >
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="username"
                  className="h-[65px] w-full rounded-[18px] border border-[#8f959b] bg-white px-[21px] text-[18px] outline-none transition focus:border-[#4a77d8] focus:ring-2 focus:ring-[#4a77d8]/10"
                />
              </motion.div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.5 }}
              >
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="h-[65px] w-full rounded-[18px] border border-[#d3d7db] bg-white px-[21px] pr-[100px] text-[18px] outline-none transition focus:border-[#4a77d8] focus:ring-2 focus:ring-[#4a77d8]/10"
                />
                {password.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[15px] font-semibold text-[#4c4c4c] transition hover:text-black"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                )}
              </motion.div>
              {/* <motion.button
                type="submit"
                disabled={!canLogin || loading}
                className="mt-[15px] h-[55px] w-full rounded-[28px] bg-[#8cb5ec] text-[18px] font-semibold text-white transition disabled:cursor-default disabled:opacity-90 enabled:hover:bg-[#78a6e6] enabled:hover:shadow-[0_7px_20px_rgba(68,116,196,0.18)]"
                whileTap={canLogin ? { scale: 0.985 } : undefined}
              >
                {loading ? "Log in..." : "Log in"}
              </motion.button> */}
              <motion.button
                type="submit"
                disabled={!canLogin || loading}
                className={`mt-[15px] h-[55px] w-full rounded-[28px] text-[18px] font-semibold text-white transition-all duration-300
    ${
      canLogin && !loading
        ? "bg-[#1877f2] hover:bg-[#0866ff] hover:shadow-[0_7px_20px_rgba(68,116,196,0.18)]"
        : "bg-[#8cb5ec] cursor-default"
    }`}
                whileTap={canLogin && !loading ? { scale: 0.985 } : undefined}
              >
                {loading ? "Logging in..." : "Log in"}
              </motion.button>
            </form>

            {/* <motion.button
              type="button"
              className="mx-auto mt-[31px] block text-[18px] font-medium transition hover:opacity-65"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.31, duration: 0.45 }}
            >
              Forgot password?
            </motion.button> */}

            <div className="my-[35px] h-px w-full bg-transparent" />

            <div className="p-7">
              <motion.button
                type="button"
                className="mt-[15px] flex h-[55px] w-full items-center justify-center rounded-[28px] border border-[#0866ff] text-[18px] font-medium text-[#0866ff] transition hover:bg-[#0866ff]/[0.04]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.45 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => navigate("/create-account")}
              >
                Create new account
              </motion.button>
            </div>

            <motion.div
              className="mt-[31px] flex items-center justify-center gap-[6px] text-[19px]"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.45 }}
            >
              <SiMeta className="text-[22px] text-[#1877f2]" />
              <span className="font-medium">Meta</span>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

export default Login;
