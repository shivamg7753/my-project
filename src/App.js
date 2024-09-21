import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/DashBoard";
import "./App.css";

const App = () => {
  const [grouping, setGrouping] = useState(localStorage.getItem("grouping") || "status");
  const [ordering, setOrdering] = useState(localStorage.getItem("ordering") || "priority");

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
  };

  const handleOrderingChange = (newOrdering) => {
    setOrdering(newOrdering);
  };

  return (
    <div className="app">
      <Navbar
        grouping={grouping}
        setGrouping={handleGroupingChange}
        ordering={ordering}
        setOrdering={handleOrderingChange}
      />
      <Dashboard grouping={grouping} ordering={ordering} />
    </div>
  );
};

export default App;
