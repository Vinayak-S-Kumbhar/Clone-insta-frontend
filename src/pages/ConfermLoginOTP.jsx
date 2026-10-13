import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiChevronDown } from "react-icons/fi";

export default function ConfermLoginOTP() {
  const [code, setCode] = useState("");

  return (
    <div className="min-h-screen bg-white text-[#1c1e21]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1792px] flex-col">
        <motion.main
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto w-full max-w-[642px] flex-1 px-6 pt-[50px]"
        >
          {/* Back button */}
          <motion.button
            type="button"
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.92 }}
            className="mb-[35px] flex h-[30px] w-[30px] items-center justify-center rounded-full text-[#65676b] transition-colors hover:bg-[#f2f3f5]"
            aria-label="Go back"
          >
            <FiArrowLeft size={28} strokeWidth={1.7} />
          </motion.button>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <h1 className="text-[30px] font-semibold leading-[36px] tracking-[-0.6px] text-[#161617]">
              Enter the confirmation code
            </h1>

            <p className="mt-[4px] text-[19px] leading-[25px] text-[#1c1e21]">
              To confirm your account, enter the 6-digit code we sent to{" "}
              <span className="font-semibold">080801 04115</span>.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={(e) => {
              e.preventDefault();
              if (code.length === 6) {
                alert("Code submitted");
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="mt-[25px]"
          >
            <motion.input
              whileFocus={{ scale: 1.005 }}
              value={code}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                setCode(value);
              }}
              inputMode="numeric"
              maxLength={6}
              placeholder="Confirmation code"
              className="h-[73px] w-full rounded-[18px] border border-[#ccd0d5] bg-white px-[20px] text-[19px] outline-none transition-all duration-200 placeholder:text-[#65676b] focus:border-[#8c939d] focus:ring-1 focus:ring-[#8c939d]"
            />

            {/* Continue */}
            <motion.button
              type="submit"
              disabled={code.length !== 6}
              whileHover={code.length === 6 ? { scale: 1.01 } : {}}
              whileTap={code.length === 6 ? { scale: 0.985 } : {}}
              className={`mt-[29px] h-[54px] w-full rounded-full text-[19px] font-semibold text-white transition-all duration-200 ${
                code.length === 6
                  ? "bg-[#0866e8] shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:bg-[#075fd7]"
                  : "cursor-not-allowed bg-[#0866e8]"
              }`}
            >
              Continue
            </motion.button>

            {/* Didn't get code */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              className="mt-[13px] h-[54px] w-full rounded-full bg-[#f1f2f4] text-[19px] font-normal text-[#1c1e21] transition-all duration-200 hover:bg-[#e5e6e8]"
            >
              I didn't get the code
            </motion.button>

            {/* Already have account */}
            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="mx-auto mt-[54px] block text-[18px] font-semibold text-[#0668e9] transition-colors hover:text-[#055fd5]"
            >
              I already have an account
            </motion.button>
          </motion.form>
        </motion.main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pb-[220px] pt-[30px] text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-[18px] gap-y-[8px] px-6 text-[16px] text-[#73777c]">
            <a href="#" className="transition-colors hover:text-[#1c1e21]">
              Meta
            </a>
            <a href="#" className="transition-colors hover:text-[#1c1e21]">
              About
            </a>
            <a href="#" className="transition-colors hover:text-[#1c1e21]">
              Blog
            </a>
            <a href="#" className="transition-colors hover:text-[#1c1e21]">
              Jobs
            </a>
            <a href="#" className="transition-colors hover:text-[#1c1e21]">
              Help
            </a>
            <a href="#" className="transition-colors hover:text-[#1c1e21]">
              API
            </a>
            <a href="#" className="transition-colors hover:text-[#1c1e21]">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-[#1c1e21]">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-[#1c1e21]">
              Locations
            </a>
            <a href="#" className="transition-colors hover:text-[#1c1e21]">
              Instagram Lite
            </a>
            <a href="#" className="transition-colors hover:text-[#1c1e21]">
              Contact Uploading &amp; Non-Users
            </a>
            <a href="#" className="transition-colors hover:text-[#1c1e21]">
              Meta Verified
            </a>
          </div>

          <div className="mt-[10px] flex items-center justify-center gap-[17px] text-[16px] text-[#73777c]">
            <button
              type="button"
              className="flex items-center gap-[5px] transition-colors hover:text-[#1c1e21]"
            >
              English
              <FiChevronDown size={17} strokeWidth={1.8} />
            </button>

            <span>© 2026 Instagram from Meta</span>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
