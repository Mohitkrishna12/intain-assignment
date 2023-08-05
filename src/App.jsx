import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
     <Navbar />
      <main className="sm:p-8 px-4 py-4 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
