import React, { useState, useEffect, useRef } from "react";
import socket from "./Socket";
import "../App.css";
import axios from 'axios'

const Chat = ({ nombre }) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const url = 'https://helena.spids.cl/chat'

  
  useEffect(() => {
    socket.emit("conectado", nombre);
  }, [nombre]);

  useEffect(() => {
    const fetchMensaje = (msg_emisor) => {
      axios.post(url,{
        "entrada": msg_emisor
      }).then((response) => {
        socket.emit("respuesta", response.data.nombre,response.data.mensaje);
      });
    }

    socket.on("mensajes", (mensaje) => {
      setMensajes([...mensajes, mensaje]);
      fetchMensaje(mensaje)
    });

    socket.on("respuestas", (respuesta) => {
      setMensajes([...mensajes, respuesta]);
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
      <div className="chat rounded-xl flex flex-col  h-72 space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        
        {mensajes.map((e, i) => (
          e.nombre !== nombre ?
            <div key={i} className="flex items-start justify-start rounded-lg">
              <img className="w-6 h-6 rounded-full" alt={e.nombre} src={"https://ui-avatars.com/api/?name="+e.nombre+"&background=random"} />
              <div className="bg-gray-200 rounded-lg p-2 space-y-2 text-xs max-w-xs mx-2 order-1">{e.mensaje}</div>
            </div>
          :
          <div key={i} className="flex flex-row-reverse items-start justify-start rounded-lg">
              <div className="bg-gray-200 rounded-lg p-2 space-y-2 text-xs max-w-xs mx-2 order-2">{e.mensaje}</div>
              <img className="w-6 h-6 rounded-full flex-end"  alt={e.nombre} src={"https://ui-avatars.com/api/?name="+e.nombre+"&background=random"} />
            </div>
         
        ))
        }
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
        <button className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-orange-600 hover:bg-orange-500 focus:outline-none">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
