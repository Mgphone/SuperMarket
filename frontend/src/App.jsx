import { Route, Routes } from "react-router-dom";
import Home from "./Home";
// import Register from "./Register";
import Register from "./Register";
import "./App.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
