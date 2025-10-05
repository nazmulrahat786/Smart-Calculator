// App.jsx
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (input === "Error") setInput("");
    if (value === "=") return; 
    setInput((prev) => prev + value);
  };

  const handleClear = () => setInput("");

  const handleDelete = () => {
    if (input === "Error") {
      setInput("");
    } else {
      setInput((prev) => prev.slice(0, -1));
    }
  };

  const handleCalculate = () => {
    if (!input) {
      toast.warn("Please enter a number or expression first!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    try {
      
      const result = eval(input);
      setInput(result.toString());
    } catch {
      setInput("Error");
      toast.error("Invalid Expression!", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+"
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 mx-2 rounded-3xl shadow-xl w-80 flex flex-col">
    
        <div className="bg-gray-900 text-white text-right text-3xl p-4 rounded-lg mb-4 min-h-[60px] break-words">
          {input || "0"}
        </div>

   
        <div className="grid grid-cols-4 gap-4 mb-4">
       
          <button
            onClick={handleClear}
            className="col-span-2 bg-red-500 text-white text-xl p-4 rounded-lg hover:bg-red-600 transition"
          >
            AC
          </button>

      
          <button
            onClick={handleDelete}
            className="col-span-2 bg-yellow-500 text-white text-xl p-4 rounded-lg hover:bg-yellow-600 transition"
          >
            DEL
          </button>

       
          {buttons.map((btn, index) => {
            if (btn === "=")
              return (
                <button
                  key={index}
                  onClick={handleCalculate}
                  className="bg-green-500 text-white text-xl p-4 rounded-lg hover:bg-green-600 transition"
                >
                  {btn}
                </button>
              );
            return (
              <button
                key={index}
                onClick={() => handleClick(btn)}
                className={`text-white text-xl p-4 rounded-lg transition ${
                  ["+", "-", "*", "/"].includes(btn)
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {btn}
              </button>
            );
          })}
        </div>

       
        <p className="text-gray-400 text-center text-sm">
          Developed by <a className="text-blue-600 font-sans" href="https://nazmul-haque-rahat.web.app/">Nazmul Haque Rahat</a> 
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
