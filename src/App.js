import React, { useState } from "react";
import Chat from "./componentes/Chat";
import logo from './logo.svg'
import "./App.css";

function App() {
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if (nombre !== "") {
      setRegistrado(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <img src={logo} className="App-logo absolute z-10 top-0 font-bold text-center text-xl mb-1 " alt="Helena" />
      <label className="text-center font-bold text-center text-2xl mb-5">Helena</label>
      <div className="bg-white z-20 shadow w-full rounded-lg divide-y divide-gray-200">
        {!registrado && (
          <form onSubmit={registrar} className="px-5 py-7">
            <label htmlFor="" className="font-semibold text-sm text-gray-600 pb-1 block">Introduzca su nombre</label>
            <input value={nombre} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" onChange={(e) => setNombre(e.target.value)} />
            <div className="px-5 py-7"></div>
            <button className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">Ir al chat</button>
          </form>
        )}

        {registrado && <Chat nombre={nombre} />}
      </div>
      
      </div>
    </div>
  );
}

export default App;
