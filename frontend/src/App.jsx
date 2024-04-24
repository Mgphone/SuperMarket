import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./components/Register.jsx";
import HomeSuperUser from "./pages/HomeSuperUser";

import "./App.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import HomeNormalUser from "./pages/HomeNormalUser";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homesuper" element={<HomeSuperUser />} />
        <Route path="/homenormal" element={<HomeNormalUser />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
