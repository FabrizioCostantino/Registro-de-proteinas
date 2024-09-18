import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [alimentos, setAlimentos] = useState([
    { nombre: 'Huevo', proteina: 13 },
    { nombre: 'Pollo', proteina: 27 },
    { nombre: 'Atún', proteina: 24 },
    { nombre: 'Lentejas', proteina: 9 },
    { nombre: 'Tofu', proteina: 8 },
    { nombre: 'Queso', proteina: 21 },
    { nombre: 'Carne', proteina: 26 },
  ]);

  const [ingestaDiaria, setIngestaDiaria] = useState([]);
  const [alimentoSeleccionado, setAlimentoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [nuevoAlimento, setNuevoAlimento] = useState('');
  const [nuevaProteina, setNuevaProteina] = useState('');
  const [proteinaTotalDiaria, setProteinaTotalDiaria] = useState(0); // Variable para almacenar el total de proteína

  // Calcular la proteína total diaria cada vez que cambie la ingesta diaria
  useEffect(() => {
    const totalProteina = ingestaDiaria.reduce((total, ingesta) => total + ingesta.proteina, 0);
    setProteinaTotalDiaria(totalProteina);
    console.log(`Proteína total diaria: ${totalProteina}`); // Para debug
  }, [ingestaDiaria]);

  const manejarAgregarIngesta = () => {
    if (!alimentoSeleccionado || !cantidad) return;

    const alimento = alimentos.find((a) => a.nombre === alimentoSeleccionado);
    const proteinaTotal = (alimento.proteina * cantidad) / 100;
    const nuevaIngesta = { alimento: alimentoSeleccionado, cantidad, proteina: proteinaTotal };

    setIngestaDiaria([...ingestaDiaria, nuevaIngesta]);

    setAlimentoSeleccionado('');
    setCantidad('');
  };

  const manejarAgregarAlimento = () => {
    if (!nuevoAlimento || !nuevaProteina) return;

    const nuevo = { nombre: nuevoAlimento, proteina: parseFloat(nuevaProteina) };
    setAlimentos([...alimentos, nuevo]);
    setNuevoAlimento('');
    setNuevaProteina('');
  };

  return (
    <div className="app-container">
      <div className="section">
        <h2>Agregar Ingesta Diaria</h2>
        <select
          value={alimentoSeleccionado}
          onChange={(e) => setAlimentoSeleccionado(e.target.value)}
        >
          <option value="">Seleccionar alimento</option>
          {alimentos.map((alimento) => (
            <option key={alimento.nombre} value={alimento.nombre}>
              {alimento.nombre}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Cantidad (gramos)"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <button onClick={manejarAgregarIngesta}>Agregar ingesta</button>
      </div>

      <div className="section">
        <h2>Ingesta Diaria</h2>
        <ul>
          {ingestaDiaria.map((ingesta, index) => (
            <li key={index}>
              {ingesta.alimento} - {ingesta.cantidad}g - {ingesta.proteina.toFixed(2)}g de proteína
            </li>
          ))}
        </ul>
      </div>

      {/* Cuadro de respuesta que muestra la proteína total ingerida en el día */}
      <div className="section">
        <h2>Proteína Total Ingerida Hoy</h2>
        <p>{proteinaTotalDiaria.toFixed(2)}g de proteína</p>
      </div>

      <div className="section">
        <h2>Agregar Nuevo Alimento</h2>
        <input
          type="text"
          placeholder="Nuevo alimento"
          value={nuevoAlimento}
          onChange={(e) => setNuevoAlimento(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cantidad de proteína cada 100g"
          value={nuevaProteina}
          onChange={(e) => setNuevaProteina(e.target.value)}
        />
        <button onClick={manejarAgregarAlimento}>Agregar alimento</button>
      </div>
    </div>
  );
};

export default App;