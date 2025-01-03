import { useState } from 'react'
import retos from "./retos/retos"
import {colorCarta, textCarta} from './constantes/constantes.js';
import { parrafo, parrafo2, parraro3, reglas, niveles } from './constantes/reglas.js';
import Swal from 'sweetalert2'


function App() {
  const [retosDisponibles, setRetosDisponibles]=useState({...retos});
  const [selectedReto, setSelectedReto] = useState("");
  const [selectedTipo, setSelectedTipo] = useState(false);
  const [mostrarReglas, setMostrarReglas] = useState(true);



  const handleSelectReto = (tipo) => {
    if (retosDisponibles[tipo].length === 0) {
      Swal.fire({
        title: '¡Atención!',
        text: `Gracias por llegar hasta este punto. No hay más retos disponibles en la categoría ${tipo}. Términa con las siguientes cartas y completa el juego LA PROFECIA. Esperamos que lo hayas disfrutado`,
        icon: 'warning',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#d33', 
        backdrop: true,
        customClass: {
          popup: 'my-popup-class',
          title: 'my-title-class',
          confirmButton: 'my-confirm-button-class'
        }
      });
      return;
    }

    const randomIndex = Math.floor(Math.random() * retosDisponibles[tipo].length);
    const reto = retosDisponibles[tipo][randomIndex];

    setSelectedReto(reto);
    setSelectedTipo(tipo);
    setRetosDisponibles({
      ...retosDisponibles,
      [tipo]: retosDisponibles[tipo].filter((_, index) => index !== randomIndex),
    });
  };

  const handleReset = () => {
    setRetosDisponibles( {...retos});
    setSelectedReto("");
    setSelectedTipo("");
  };

   if (!retos) {
    return <div>Cargando Retos...</div>
  } 
  console.log(retosDisponibles);


  if (mostrarReglas) {
    Swal.fire({
      title: 'Reglas!',
      html: [parrafo, parrafo2, niveles, reglas, parraro3],
      icon: 'info',
      confirmButtonText: 'COMENZAR'
    }).then(() => setMostrarReglas(false)); 
  }
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
    <img src="/image.png" alt="" />
    <div className="grid grid-cols-1 gap-4 md:gap-6 mb-6">
      {["cielo", "tierra", "infierno"].map((tipo) => (
        <button
          key={tipo}
          onClick={() => handleSelectReto(tipo)}
          className={`font-semibold text-gray-700 py-2 px-4 grid gap-1 rounded-lg transition-colors w-[170px] h-[210px] ${colorCarta[tipo]}`}
        >
          {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
          <hr className='border-gray-700'/>
          <p className='gap-2 grid text-[10px]'>{tipo==="cielo"? [textCarta.cielo[0], textCarta.cielo[1]] : tipo==="tierra" ? [textCarta.tierra[0], textCarta.tierra[1]]: tipo==="infierno" ? [textCarta.infierno[0], textCarta.infierno[1]]: ""}</p>
        </button>
      ))}
    </div>
    {selectedReto && (
      <div className={`mt-6 p-4 bg-white shadow-md text-center transition-colors font-medium rounded-md ${colorCarta[selectedTipo]}`}>
        <h2 className="text-xl font-semibold">Reto Seleccionado:</h2>
        <p className="text-gray-700 mt-2 te">{selectedReto}</p>
      </div>
    )}
    <button
      onClick={handleReset}
      className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
    >
      Reiniciar Juego
    </button>
  </div>
);
};

export default App
