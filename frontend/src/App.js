import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/landing";
import Login from "./components/login";
import Register from "./components/register";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/landing" element={<Landing/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
