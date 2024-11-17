import logo from './santa.png';
import React, { useState, useEffect } from "react";
import axios from "axios";

const HeaderTitle = ({ codeTo }) => {
  const [data, setData] = useState([]); // Estado para almacenar los años filtrados
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Función getJSON para obtener y filtrar los datos del Google Sheet
  const getJSON = async () => {
    const SHEET_ID = "1bs482bl1GBIw-iUDNKN7h9UqcIiNuzOA5cvNTLdvIKo";
    const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

    try {
      const response = await axios.get(URL);

      // Procesar los datos del CSV
      const rows = response.data.split("\n").map((row) => row.split(","));
      const headers = rows[0].map((header) => header.replace(/[?""]/g, "").trim());

      // Filtrar los datos para obtener los años donde activate es true
      const filteredData = rows.slice(1).filter((row) => {
        const obj = {};
        row.forEach((cell, index) => {
          obj[headers[index]] = cell.replace(/[?""]/g, "").trim();
        });

        // Condición:  'activate' es 'true'
        return obj.ACTIVATE === "TRUE";
      });

      // Extraer solo los valores de 'year'
      const years = filteredData.map((row) => {
        const obj = {};
        row.forEach((cell, index) => {
          obj[headers[index]] = cell.replace(/[?""]/g, "").trim();
        });
        return obj.YEAR; // Devuelve únicamente el valor de 'year'
      });
      return years;

    } catch (error) {
      console.error("Hubo un error al obtener los datos:", error);
      return [];
    }
  };

  // Efecto para cargar los datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getJSON(codeTo);
      setData(result);
      setLoading(false);
      getJSON();
    };

    fetchData();
  }, [codeTo]);

  // Renderizado del componente

  return (
    <div className="HeaderTitle">
        <h1>Secret Santa {data[0]} </h1>
        <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
};

export default HeaderTitle;

