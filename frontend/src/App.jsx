import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./components/UserAuthenticationFront/Register.jsx";
import HomeSuperUser from "./pages/HomeSuperUser";
import RegisterSuper from "./components/UserAuthenticationFront/RegisterSuper.jsx";
import "../src/styles/App.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import HomeNormalUser from "./pages/HomeNormalUser";
import Notfound from "./components/NotFound/Notfound.jsx";
import HomeBranchManager from "./pages/HomeBranchManager.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        className="toast-container-high-zindex"
      />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/registersuper"
            element={<RegisterSuper role="super_user" />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/homesuper" element={<HomeSuperUser />} />
          <Route path="/homenormal" element={<HomeNormalUser />} />
          <Route path="/homebranch" element={<HomeBranchManager />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
