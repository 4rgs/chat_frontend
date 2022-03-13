import React, { useState, useEffect, useRef } from "react";
import socket from "./Socket";
import "../App.css";

const Chat = ({ nombre }) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.emit("conectado", nombre);
  }, [nombre]);

  useEffect(() => {
    socket.on("mensajes", (mensaje) => {
      setMensajes([...mensajes, mensaje]);
    });

    return () => {
      socket.off();
    };
  }, [mensajes]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const submit = (e) => {
    e.preventDefault();
    socket.emit("mensaje", nombre, mensaje);
    setMensaje("");
  };

  return (
    <div className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      <div className="flex flex-col  h-72 space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {mensajes.map((e, i) => (
          <div key={i} className="flex items-end justify-end rounded-lg">
            <div className="flex flex-col bg-gray-100 rounded-lg p-2 space-y-2 text-xs max-w-xs mx-2 order-2 items-start">{e.mensaje}</div>
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">{e.nombre}</div>
          </div>
        ))}
        <div ref={divRef}></div>
      </div>
      <form onSubmit={submit}>
        <label htmlFor="">Escriba su mensaje</label>
        <input
          name=""
          id=""
          type="text"
          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        ></input>
        <button className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
