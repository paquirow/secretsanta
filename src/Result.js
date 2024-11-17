import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import logo from './reyes.png';

// Componente Result donde se define la función getJSON
const Result = ({ codeTo }) => {
  const [data, setData] = useState([]); // Estado para almacenar los datos
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga

  // Función getJSON definida dentro de Result
  const getJSON = async (code_to) => {
    const SHEET_ID = "1bs482bl1GBIw-iUDNKN7h9UqcIiNuzOA5cvNTLdvIKo";
    const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

    try {
      const response = await axios.get(URL);
      const rows = response.data.split("\n").map(row => row.split(","));
      const headers = rows[0].map(header => header.replace(/[?""]/g, "").trim());

      const filteredData = rows.slice(1).filter(row => {
        const obj = {};
        row.forEach((cell, index) => {
          obj[headers[index]] = cell.replace(/[?""]/g, "").trim();
        });
        return obj.CODE_TO === code_to; // Filtramos por el valor de 'CODE_TO'
      });

      // Si no se encuentran resultados, retornamos una cadena vacía
      return filteredData.length > 0 ? filteredData : Array(rows.length - 1).fill(""); // Rellenamos con cadenas vacías
      
    } catch (error) {
      console.error("Hubo un error al obtener los datos:", error);
      return [];
    }
  };

  // Llamamos a getJSON dentro de useEffect cuando el componente se monta o cambia codeTo
  useEffect(() => {
    if (codeTo) {
      
      getJSON(codeTo).then((result) => {
        setData(result); // Almacenamos los datos obtenidos
        console.log(data)
        
        setLoading(true);

      });
    }
  }, [codeTo]); // El efecto se ejecuta cuando codeTo cambia

  if (loading && data[0]!=="" && data.length>0) {
  return (
    <div className="Alert">
        <Alert severity="info">Tu amigo invisible es: {data[0][3].replace(/[?""]/g, "")}</Alert>
      <h2>¡Hola {data[0][1].replace(/[?""]/g, "")}!</h2>
      <img src={logo} className="App-logo2" alt="logo" />
      <p>Esperamos que estés disfrutando de la magia de la Navidad, porque hoy tenemos algo muy especial que contarte. Los Reyes Magos estamos muy ocupados este año, repartiendo regalos por todo el mundo y no podemos venir directamente. Por eso necesitamos tu ayuda para llevar acabo nuestro plan mágico. Este año necesitamos que seas tu quien entregue su regalo a:</p> 
      <h3>¡{data[0][3].replace(/[?""]/g, "")}!</h3>
      <p>{data[0][3].replace(/[?""]/g, "")} nos ha escrito en su carta que lo que más le gustaría recibir esta navidad es</p>
      <h3>{data[0][4].replace(/[?""]/g, "")}</h3> 
      <p> Es un secreto entre tú y nosotros, porque así es como se mantiene viva la magia. Recuerda que los Reyes confían en ti para guardar este secreto y que la sorpresa sea tan mágica como ellos la imaginan. </p>
    <p>Con cariño,
        Los Reyes Magos y la Magia de la Navidad</p>
    </div>
  );
}
};

export default Result;

