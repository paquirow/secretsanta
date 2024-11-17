import axios from "axios";

export const getJSON = async (code_to) => {
    const SHEET_ID = "1bs482bl1GBIw-iUDNKN7h9UqcIiNuzOA5cvNTLdvIKo";
    // Construimos la URL de la API de Google Sheets con el ID de la hoja y el rango de datos
    const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
    //const RANGE = "SORTEO!A1:D100";
    
    
    console.log(code_to)
    try {
        // Hacemos una solicitud GET a la URL de la API usando axios y esperamos la respuesta
        const response = await axios.get(URL);
    
        // Convertimos los datos CSV a un arreglo de JSON
        const rows = response.data.split("\n").map(row => row.split(","));
        // Usamos la primera fila como los encabezados para construir los objetos JSON y filtrar
        const headers = rows[0].map(header => header.replace(/[?""]/g, "").trim()); // Limpiamos los encabezados de la primera fila
        
        // Filtramos directamente las filas para encontrar aquellas cuyo valor de CODE_TO coincida con 'code_to'
        const filteredData = rows.slice(1)  // Obtenemos las filas sin los encabezados
            .filter(row => {
                const obj = {}; // Creamos un objeto vacío para cada fila
                row.forEach((cell, index) => {
                    obj[headers[index]] = cell; // Asignamos cada celda al encabezado correspondiente
                });
                return obj.CODE_TO === code_to; // Filtramos solo los objetos donde CODE_TO coincide con 'code_to'
            });

            // Retornamos los datos filtrados
            return filteredData;
    } catch (error) {
        // Si ocurre un error durante la solicitud, lo capturamos y mostramos un mensaje en la consola
        console.error("Error al obtener datos:", error);
    }
};
    
  
