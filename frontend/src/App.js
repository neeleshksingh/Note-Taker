import { BrowserRouter, Route, Routes } from "react-router-dom";
import Add from "./components/addnote";
import Edit from "./components/edit";
import Landing from "./components/landing";
import Login from "./components/login";
import Nav from "./components/nav";
import Register from "./components/register";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/landing" element={<><Nav/><Landing/></>} />
          <Route path="/add" element={<><Nav/><Add/></>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/edit:id" element={<><Nav/><Edit/></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
