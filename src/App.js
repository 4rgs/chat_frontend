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
    <div className="min-h-screen bg-slate-700 flex flex-col justify-center sm:py-8">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <img src={logo} className="App-logo w-24 h-24 font-bold text-center text-xl mb-1 " alt="Helena" />
      <label className="text-center font-bold text-center text-2xl mb-5 text-2xl font-bold text-transparent md:text-3xl bg-clip-text bg-gradient-to-r from-orange-400  to-orange-800">Helena</label>
      <div className="bg-gray-100 z-20 shadow w-full rounded-lg divide-y divide-gray-200">
        {!registrado && (
          <form onSubmit={registrar} className="px-5 py-7">
            <label htmlFor="" className="font-semibold text-sm text-gray-600 pb-1 block">Introduzca su nombre</label>
            <input value={nombre} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" onChange={(e) => setNombre(e.target.value)} />
            <div className="px-5 py-7"></div>
            <button className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-orange-600 hover:bg-orange-500 focus:outline-none">Ir al chat</button>
          </form>
        )}

        {registrado && <Chat nombre={nombre} />}
      </div>
      </div>
    </div>
  );
}

export default App;
