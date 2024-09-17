import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Variables from "./pages/Variables/Variables";
import VariableDetail from "./pages/VariableDetail/VariableDetail";
import Navigation from "./components/Navigation/Navigation";
import { ResultProvider } from "./Utils/Hooks/useResult";

const App = () => (
    <ResultProvider>
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/variables" element={<Variables />} />
                <Route
                    path="/variables/:variableId"
                    element={<VariableDetail />}
                />
            </Routes>
        </Router>
    </ResultProvider>
);

export default App;
