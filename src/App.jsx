import { useState } from "react";
import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Cancellations from "./Components/Cancellations";
import { ClassNames } from "@emotion/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/">
            <Route path="" element={<Home remainingSeats />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cancellations" element={<Cancellations />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
