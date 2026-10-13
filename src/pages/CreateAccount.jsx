import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiChevronDown,
  FiEye,
  FiEyeOff,
  FiHelpCircle,
  FiCheckCircle,
  FiXCircle,
  FiLoader,
} from "react-icons/fi";
import { FaMeta } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Ineligible from "../components/Ineligible.jsx";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateAccount({ setLoginData }) {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false); //for submit button

  const [ineligible, setIneligible] = useState(false);
  const navigate = useNavigate();

  const [usernameStatus, setUsernameStatus] = useState({
    status: "idle",
    message: "",
    suggestions: [],
  });

  //validating username
  useEffect(() => {
    const value = username.trim().toLowerCase();

    // Reset when the input is empty.
    if (!value) {
      setUsernameStatus({
        status: "idle",
        message: "",
        suggestions: [],
      });
      return;
    }

    // Validate the username format before calling the backend.
    const pattern = /^[a-z0-9._]{3,30}$/;

    if (!pattern.test(value)) {
      setUsernameStatus({
        status: "invalid",
        message: "Use 3-30 letters, numbers, periods, or underscores.",
        suggestions: [],
      });
      return;
    }

    const controller = new AbortController();

    setUsernameStatus({
      status: "checking",
      message: "Checking username...",
      suggestions: [],
    });

    // Wait 400 ms after typing stops to avoid excessive API calls.
    const timer = setTimeout(async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/Auth/username/check",
          {
            params: { username: value },
            signal: controller.signal,
          },
        );

        const data = response.data;

        setUsernameStatus({
          status: !data.valid
            ? "invalid"
            : data.available
              ? "available"
              : "taken",
          message: data.message,
          suggestions: data.suggestions || [],
        });
      } catch (error) {
        // Ignore requests cancelled because the user typed again.
        if (error.code === "ERR_CANCELED") {
          return;
        }

        setUsernameStatus({
          status: "error",
          message: "Unable to check username. Please try again.",
          suggestions: [],
        });
      }
    }, 500);

    // Cancel outdated requests and pending timers.
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [username]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i,
  );

  const canSubmit =
    Email.trim() &&
    password.trim() &&
    month &&
    day &&
    year &&
    name.trim() &&
    username.trim() &&
    usernameStatus.status === "available";

  const submit = async (e) => {
    e.preventDefault();

    const age = calculateAge();

    if (age < 18) {
      setIneligible(true);
      return;
    }
    setIneligible(false);
    setLoading(true);
    try {
      const responce = await axios.post("http://localhost:8080/Auth/signup", {
        email: Email,
        name: name,
        username: username.replace(/\s/g, ""),
        password: password,
        dateOfBirth: day + " " + month + " " + year,
      });

      navigate("/login");
      toast.success(responce.data || "Account Created Successfully!");
    } catch (err) {
      const data = err.response?.data;

      if (data?.errors) {
        // Validation errors returned by the backend
        const messages = Object.values(data.errors);
        toast.error(messages.join(",  "));
      } else if (data?.message) {
        // Runtime exceptions, such as an existing username
        toast.error(data.message);
      } else if (typeof data === "string") {
        // Plain-text backend error
        toast.error(data);
      } else {
        toast.error(err.message || "Something went wrong");
      }
    } finally {
      setLoginData({ username: username, password: password });
      setLoading(false);
    }
  };

  const calculateAge = () => {
    const today = new Date();

    const months = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };

    const birthMonth = months[month];

    let years = today.getFullYear() - year;
    let monthsAge = today.getMonth() - birthMonth;
    let days = today.getDate() - day;

    if (days < 0) {
      monthsAge--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (monthsAge < 0) {
      years--;
      monthsAge += 12;
    }
    return years;
  };

  const inputClass =
    "h-[51px] w-full rounded-[14px] border border-[#ccd0d5] bg-white px-[14px] text-[14px] text-[#1c1e21] outline-none transition-all duration-200 placeholder:text-[#65676b] focus:border-[#8c939d] focus:ring-1 focus:ring-[#8c939d]";

  if (ineligible) {
    return <Ineligible />;
  }
  return (
    <main className="min-h-screen bg-white px-5 py-8 text-[#1c1e21] antialiased">
      <div className="mx-auto w-full max-w-[567px]">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          type="button"
          aria-label="Go back"
          className="mb-[10px] flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-[#f2f3f5]"
          onClick={() => navigate("/login")}
        >
          <FiArrowLeft size={22} strokeWidth={1.8} className="text-[#65676b]" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="mb-[9px] flex items-center gap-[3px]">
            <FaMeta className="text-[15px] text-[#0866ff]" />
            <span className="text-[14px] font-medium tracking-[-0.2px]">
              Meta
            </span>
          </div>

          <h1 className="mb-[2px] text-[21px] font-semibold leading-[26px] tracking-[-0.35px]">
            Get started on Clone Instagram
          </h1>

          <p className="mb-[10px] text-[14px] leading-[19px]">
            Sign up to see photos and videos from your friends.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          onSubmit={(e) => submit(e)}
        >
          {/* Mobile number / Email */}
          <div className="mb-[9px]">
            <label className="mb-[6px] block text-[14px] font-medium">
              Email
            </label>

            <input
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              className={inputClass}
            />

            <p className="mt-[9px] text-[13px] leading-[15px]">
              You may receive notifications from us.{" "}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="font-semibold text-[#0064e0] hover:underline"
              >
                Learn why we ask for your contact
                <br />
                information
              </a>
            </p>
          </div>

          {/* Password */}
          <div className="mb-[12px]">
            <label className="mb-[6px] block text-[14px] font-medium">
              Password
            </label>

            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="new-password"
                className={`${inputClass} pr-[50px]`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-[10px] top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-[#f2f3f5]"
              >
                {showPassword ? (
                  <FiEye
                    size={18}
                    strokeWidth={1.8}
                    className="text-[#1c1e21]"
                  />
                ) : (
                  <FiEyeOff
                    size={18}
                    strokeWidth={1.8}
                    className="text-[#1c1e21]"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Birthday */}
          <div className="mb-[14px]">
            <div className="mb-[6px] flex items-center gap-[5px]">
              <label className="text-[14px] font-medium">Birthday</label>

              <FiHelpCircle size={16} strokeWidth={1.8} />
            </div>

            <div className="flex gap-[13px]">
              <div className="relative flex-1">
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className={`h-[50px] w-full appearance-none rounded-[14px] border border-[#ccd0d5] bg-white px-[14px] pr-[38px] text-[14px] outline-none transition-all duration-200 focus:border-[#8c939d] focus:ring-1 focus:ring-[#8c939d] ${
                    month ? "text-[#1c1e21]" : "text-[#65676b]"
                  }`}
                >
                  <option value="" disabled>
                    Month
                  </option>

                  {months.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <FiChevronDown
                  size={20}
                  className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2"
                />
              </div>

              <div className="relative flex-1">
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className={`h-[50px] w-full appearance-none rounded-[14px] border border-[#ccd0d5] bg-white px-[14px] pr-[38px] text-[14px] outline-none transition-all duration-200 focus:border-[#8c939d] focus:ring-1 focus:ring-[#8c939d] ${
                    day ? "text-[#1c1e21]" : "text-[#65676b]"
                  }`}
                >
                  <option value="" disabled>
                    Day
                  </option>

                  {days.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <FiChevronDown
                  size={20}
                  className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2"
                />
              </div>

              <div className="relative flex-1">
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className={`h-[50px] w-full appearance-none rounded-[14px] border border-[#ccd0d5] bg-white px-[14px] pr-[38px] text-[14px] outline-none transition-all duration-200 focus:border-[#8c939d] focus:ring-1 focus:ring-[#8c939d] ${
                    year ? "text-[#1c1e21]" : "text-[#65676b]"
                  }`}
                >
                  <option value="" disabled>
                    Year
                  </option>

                  {years.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <FiChevronDown
                  size={20}
                  className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2"
                />
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="mb-[14px]">
            <label className="mb-[6px] block text-[14px] font-medium">
              Name
            </label>

            <div className="relative">
              {name && (
                <span className="pointer-events-none absolute left-[14px] top-[8px] text-[11px] text-[#65676b]">
                  Full name
                </span>
              )}

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className={`${inputClass} ${name ? "pb-[1px] pt-[16px]" : ""}`}
              />
            </div>
          </div>

          {/* Username */}
          <div className="mb-[23px]">
            <label className="mb-[6px] block text-[14px] font-medium">
              Username
            </label>

            <div className="relative">
              <input
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))
                }
                placeholder="Username"
                autoComplete="username"
                aria-invalid={["taken", "invalid"].includes(
                  usernameStatus.status,
                )}
                className={`${inputClass} pr-[46px] ${
                  usernameStatus.status === "available"
                    ? "border-green-600 focus:border-green-600 focus:ring-green-100"
                    : ["taken", "invalid"].includes(usernameStatus.status)
                      ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                      : ""
                }`}
              />

              {/* Status icon */}
              <span className="absolute right-[14px] top-1/2 -translate-y-1/2">
                {usernameStatus.status === "checking" && (
                  <FiLoader size={19} className="animate-spin text-gray-500" />
                )}

                {usernameStatus.status === "available" && (
                  <FiCheckCircle size={21} className="text-green-600" />
                )}

                {["taken", "invalid"].includes(usernameStatus.status) && (
                  <FiXCircle size={21} className="text-red-500" />
                )}
              </span>
            </div>

            {/* Validation message */}
            {usernameStatus.message && (
              <p
                aria-live="polite"
                className={`mt-2 flex items-center gap-1.5 text-[13px] leading-5 ${
                  usernameStatus.status === "available"
                    ? "text-green-700"
                    : ["taken", "invalid"].includes(usernameStatus.status)
                      ? "text-red-500"
                      : "text-gray-500"
                }`}
              >
                {usernameStatus.message}
              </p>
            )}

            {/* Suggestions when username is taken */}
            {usernameStatus.status === "taken" &&
              usernameStatus.suggestions.length > 0 && (
                <div className="mt-2 overflow-hidden rounded-[14px] border border-[#ccd0d5] bg-white">
                  <p className="border-b border-[#e4e6eb] bg-gray-50 px-4 py-2 text-[12px] text-gray-500">
                    Try one of these usernames
                  </p>

                  {usernameStatus.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setUsername(suggestion)}
                      className="flex w-full items-center justify-between border-b border-[#e4e6eb] px-4 py-3 text-left text-[15px] transition-colors last:border-b-0 hover:bg-gray-50"
                    >
                      <span className="font-medium text-[#1c1e21]">
                        {suggestion}
                      </span>

                      <span className="text-[12px] font-medium text-blue-600">
                        Use this
                      </span>
                    </button>
                  ))}
                </div>
              )}
          </div>

          {/* Legal text */}
          <div className="space-y-[8px] text-[13px] leading-[15px]">
            <p>
              People who use our service may have uploaded your contact
              information to Instagram.{" "}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="font-semibold text-[#0064e0] hover:underline"
              >
                Learn more.
              </a>
            </p>

            <p>
              By tapping Submit, you agree to create an account and to
              Instagram&apos;s{" "}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="font-semibold text-[#0064e0] hover:underline"
              >
                Terms
              </a>
              ,{" "}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="font-semibold text-[#0064e0] hover:underline"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="font-semibold text-[#0064e0] hover:underline"
              >
                Cookies Policy
              </a>
              .
            </p>

            <p>
              The{" "}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="font-semibold text-[#0064e0] hover:underline"
              >
                Privacy Policy
              </a>{" "}
              describes the ways we can use the information we collect when you
              create an account. For example, we use this information to
              provide, personalize and improve our products, including ads.
            </p>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={!canSubmit || loading}
            whileHover={canSubmit ? { scale: 1.01 } : {}}
            whileTap={canSubmit ? { scale: 0.985 } : {}}
            className={`mt-[16px] h-[37px] w-full rounded-full text-[14px] font-semibold text-white transition-all duration-200 ${
              canSubmit
                ? "bg-[#0668e9] hover:bg-[#055fd5]"
                : "cursor-not-allowed bg-[#9fc4ef]"
            }`}
          >
            {loading ? "Creating Account..." : "Submit"}
          </motion.button>

          {/* Existing account */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.985 }}
            className="mt-[10px] h-[37px] w-full rounded-full bg-[#f1f2f4] text-[14px] text-[#1c1e21] transition-all duration-200 hover:bg-[#e4e6e8]"
            onClick={() => navigate("/login")}
          >
            I already have an account
          </motion.button>
        </motion.form>
      </div>
    </main>
  );
}
