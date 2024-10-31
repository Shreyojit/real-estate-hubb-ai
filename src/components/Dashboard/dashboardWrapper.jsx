"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


const DashboardLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed((prevCollapsed) => !prevCollapsed);

  return (
    
    <div className="flex bg-gray-50 text-gray-900 w-full min-h-screen">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <Navbar toggleSidebar={toggleSidebar} />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardWrapper;
