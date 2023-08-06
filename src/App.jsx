import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Navbar } from "./components/Navbar";
import { styled } from "styled-components";

const MainContainer = styled.main`
  padding-left: 1rem; 
  padding-right: 1rem; 
  padding-top: 1rem; 
  padding-bottom: 1rem; 
  min-height: calc(100vh - 73px);
  @media screen and (min-width: 640px) {
    padding: 2rem;
  }
`;

const App = () => {
  return (
    <BrowserRouter>
     <Navbar />
      <MainContainer>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </MainContainer>
    </BrowserRouter>
  );
};

export default App;
