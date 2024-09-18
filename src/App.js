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
  const [proteinaTotalDiaria, setProteinaTotalDiaria] = useState(0);
  const [mostrarBaseDatos, setMostrarBaseDatos] = useState(false);

  useEffect(() => {
    // Cargar datos desde localStorage al iniciar la aplicación
    const datosGuardadosIngesta = JSON.parse(localStorage.getItem('ingestaDiaria')) || [];
    setIngestaDiaria(datosGuardadosIngesta);

    const datosGuardadosAlimentos = JSON.parse(localStorage.getItem('alimentos')) || [
      { nombre: 'Huevo', proteina: 13 },
      { nombre: 'Pollo', proteina: 27 },
      { nombre: 'Atún', proteina: 24 },
      { nombre: 'Lentejas', proteina: 9 },
      { nombre: 'Tofu', proteina: 8 },
      { nombre: 'Queso', proteina: 21 },
      { nombre: 'Carne', proteina: 26 },
    ];
    setAlimentos(datosGuardadosAlimentos);
  }, []);

  useEffect(() => {
    // Guardar ingestaDiaria en localStorage cada vez que cambie
    localStorage.setItem('ingestaDiaria', JSON.stringify(ingestaDiaria));
  }, [ingestaDiaria]);

  useEffect(() => {
    // Guardar alimentos en localStorage cada vez que cambie
    localStorage.setItem('alimentos', JSON.stringify(alimentos));
  }, [alimentos]);

  useEffect(() => {
    const totalProteina = ingestaDiaria.reduce((total, ingesta) => total + ingesta.proteina, 0);
    setProteinaTotalDiaria(totalProteina);
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

  const manejarMostrarBaseDatos = () => {
    setMostrarBaseDatos(!mostrarBaseDatos);
  };

  return (
    <div className="app-container">
      <div className="section">
        <div className="column">
          <h2>Agregar ingesta diaria</h2>
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

          <div className="proteina-total">
            <h2>Proteínas</h2>
            <p>{proteinaTotalDiaria.toFixed(2)}g</p>
          </div>
        </div>

        <div className="column">
          <h2>Ingesta diaria</h2>
          <ul>
            {ingestaDiaria.map((ingesta, index) => (
              <li key={index}>
                {ingesta.alimento} - {ingesta.cantidad}g - {ingesta.proteina.toFixed(2)}g de proteína
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="section">
        <div className="column">
          <h2>Agregar nuevo alimento</h2>
          <input
            type="text"
            placeholder="Nuevo alimento"
            value={nuevoAlimento}
            onChange={(e) => setNuevoAlimento(e.target.value)}
          />
          <input
            type="number"
            placeholder="Cantidad de proteína"
            value={nuevaProteina}
            onChange={(e) => setNuevaProteina(e.target.value)}
          />
          <button onClick={manejarAgregarAlimento}>Agregar alimento</button>
          <button className="mostrar-base-datos" onClick={manejarMostrarBaseDatos}>
            {mostrarBaseDatos ? 'Ocultar base de datos' : 'Ver base de datos'}
          </button>
        </div>
        
        <div className="column">
          {mostrarBaseDatos && (
            <div className="base-datos">
              <h3>Base de datos de alimentos</h3>
              <ul>
                {alimentos.map((alimento, index) => (
                  <li key={index}>
                    {alimento.nombre} - {alimento.proteina}g de proteína
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;