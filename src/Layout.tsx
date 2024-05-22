import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    applyMode(isDarkMode);
  }, []);

  const toggleMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    applyMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  const applyMode = (mode: boolean) => {
    const htmlElement = document.documentElement;
    if (mode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  };

  return (
    <div>
      <div className={`top-0 px-10 fixed z-10 w-full  py-4 ${darkMode? 'bg-white border-[0.5px] drop-shadow  border-white' :'drop-shadow  bg-[#2B3743]'}`}>
        <div className={`flex-row  flex justify-between ${darkMode? 'text-black' :' text-white'}`}>
          <h1 className="font-bold">Where in the world?</h1>
          <div className="flex-row flex items-center space-x-2">
            <button onClick={toggleMode}>
              {darkMode ? (
                <div className="flex-row flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
</svg>

                  <p>Light Mode</p>
                </div>
              ) : (
                <div className="flex-row flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>
                  <p>Dark Mode</p>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
      <main>
        <Outlet context={{ darkMode }}/>
      </main>
    </div>
  );
}
