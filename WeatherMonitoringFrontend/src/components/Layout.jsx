import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import { HiMiniBellAlert } from "react-icons/hi2";
import { RiHome4Fill } from "react-icons/ri";
import { setTempUnitInCookie, getTempUnitFromCookie } from "../utils/unit";
import { useTemperatureUnit } from "../context/TemperatureUnitContext";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { tempUnit, setTempUnit } = useTemperatureUnit();

  useEffect(() => {
    const initialUnit = getTempUnitFromCookie() || "Celsius";
    setTempUnit(initialUnit);
  }, [setTempUnit]);

  const toggleTemperatureUnit = () => {
    const newUnit = tempUnit === "Celsius" ? "Kelvin" : "Celsius";
    setTempUnit(newUnit);
    setTempUnitInCookie(newUnit);
  };

  useEffect(() => {
    console.log(`Current temperature unit: ${tempUnit}`);
  }, [tempUnit]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`fixed inset-y-0 left-0 transform transition-transform duration-300 bg-white border-r shadow-r shadow-xl z-10 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:shadow-none`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-bold">Weather App</h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden"
          >
            {isSidebarOpen ? <MdClose size={15} /> : <MdMenu size={15} />}{" "}
          </button>
        </div>
        <nav className="p-4">
          <ul>
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 text-lg p-2 hover:bg-gray-200"
              >
                <RiHome4Fill />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/alert"
                className="flex gap-2 items-center p-2 hover:bg-gray-200 text-lg"
              >
                <HiMiniBellAlert />
                <span>Alert</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="fixed w-full bg-white shadow p-4 z-20">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleTemperatureUnit}
              className="text-white ml-4 bg-blue-500 py-2 px-4 rounded hover:bg-blue-600"
            >
              Switch to {tempUnit === "Celsius" ? "Kelvin" : "Celsius"}
            </button>
            <h1 className="text-xl font-bold p-2"></h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              {isSidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}{" "}
            </button>
          </div>
        </header>

        <main className="flex-1 mt-16 lg:mt-18 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
