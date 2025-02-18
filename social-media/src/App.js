import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Header from "./components/Header";

function App() {
  const isAuthenticated = sessionStorage.getItem("token");

  return (
    <>
      <div className="">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
