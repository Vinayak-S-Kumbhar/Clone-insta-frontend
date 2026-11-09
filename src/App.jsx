import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccount";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import ReelPage from "./pages/ReelPage";
import MessagesPage from "./pages/MessagesPage";
import SearchPage from "./pages/SearchPage";

function App() {
  const [logindata, setLoginData] = useState({ username: "", password: "" });

  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/login" element={<Login logindata={logindata} />} />
          <Route
            path="/create-account"
            element={<CreateAccount setLoginData={setLoginData} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Reels" element={<ReelPage />} />
          <Route path="/Messages" element={<MessagesPage />} />
          <Route path="/Search" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
