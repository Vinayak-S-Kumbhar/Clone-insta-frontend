import React from "react";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { FaMeta } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Ineligible() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-white text-[#1c1e21] antialiased">
      <div className="mx-auto flex min-h-screen w-full max-w-[1792px] flex-col">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto w-full max-w-[677px] px-6 pt-[69px]"
        >
          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-[4px]"
          >
            <FaMeta className="text-[17px] text-[#0866ff]" />

            <span className="text-[18px] font-medium tracking-[-0.3px]">
              Meta
            </span>
          </motion.div>

          {/* Content */}
          <div className="mt-[94px]">
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-[38px] flex h-[116px] w-[116px] items-center justify-center rounded-full border-[2px] border-[#6b6f72]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.4 }}
              >
                <FiAlertCircle
                  size={67}
                  strokeWidth={1.45}
                  className="text-[#6b6f72]"
                />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="text-[29px] font-semibold leading-[36px] tracking-[-0.65px] text-[#111111]"
            >
              We’re not able to process your registration.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-[7px] text-[19px] leading-[25px] text-[#111111]"
            >
              You are ineligible to register for Instagram.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.5 }}
              whileHover={{
                scale: 1.01,
                backgroundColor: "#075fd7",
              }}
              whileTap={{ scale: 0.985 }}
              type="button"
              className="mt-[19px] h-[44px] w-full rounded-full bg-[#0866e8] text-[17px] font-semibold text-white shadow-[0_2px_7px_rgba(0,0,0,0.08)] transition-all duration-200"
              onClick={() => navigate("/login")}
            >
              Back to home
            </motion.button>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
