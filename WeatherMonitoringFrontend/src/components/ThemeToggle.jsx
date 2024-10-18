import { useTheme } from './theme-provider';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={() => setTheme("light")} 
        className={`p-2 rounded ${theme === "light" ? "bg-gray-200" : ""}`}
      >
        <MdOutlineLightMode />
      </button>
      <button 
        onClick={() => setTheme("dark")} 
        className={`p-2 rounded ${theme === "dark" ? "bg-gray-200" : ""}`}
      >
        <MdOutlineDarkMode />
      </button>
    </div>
  );
};

export default ThemeToggle;
