import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccount";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

function App() {
  const [logindata, setLoginData] = useState({ username: "", password: "" });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login logindata={logindata} />} />
          <Route
            path="/create-account"
            element={<CreateAccount setLoginData={setLoginData} />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
