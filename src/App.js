
import './App.css';
import './utils.js'
import HeaderTitle from './HeaderTitle.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Result from './Result.js';
import React, { useState } from 'react';


let nombre="BOTÓN"

function App() {
  const [codeTo, setCodeTo] = useState(''); // Estado para el valor del input
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar la alerta
  const [alertData, setAlertData] = useState(null); // Estado para los datos que muestra la alerta

  const handleButtonClick = async () => {
    if (codeTo) {
      setShowAlert(true); // Mostrar alerta cuando se presione el botón
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <HeaderTitle/>
      <div>
        
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
        <div>

      
      {/* Condicionalmente mostramos el componente como una alerta */}
      {showAlert && <Result codeTo={codeTo.toLocaleUpperCase()} />}
        <TextField label="Outlined secondary" color="secondary" focused 
        value={codeTo}
        onChange={(e) => {
          setCodeTo(e.target.value); // Actualizamos el valor del input
          setShowAlert(true);       // Mostramos la alerta
        }}
        sx={{ input: { color: 'white'} }}
      />
            
          </div>
        </Box>
    </div>
  </header>

  
</div>)
}


/*
nombre=getJSON('"PMF95"')
  .then((data) => {
  return data[0];
  App()
    console.log("Datos filtrados:", nombre); // Aquí obtienes las filas que coinciden con 'CODE_TO' === "ABC123"
  })
  .catch((error) => {
    console.error("Hubo un error al obtener los datos:", error);
  });

  console.log("Dat:", nombre); // Aquí obtienes las filas que coinciden con 'CODE_TO' === "ABC123"*/

export default App;
