import React, { useState, useEffect } from 'react';
import GraficoMensual from './GraficoMensual';
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
  const [datosMensuales, setDatosMensuales] = useState([]);
  const [mostrarBaseDatos, setMostrarBaseDatos] = useState(false);

  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem('datosMensuales')) || [];
    setDatosMensuales(datosGuardados);
  }, []);

  useEffect(() => {
    localStorage.setItem('datosMensuales', JSON.stringify(datosMensuales));
  }, [datosMensuales]);

  const manejarAgregarIngesta = () => {
    if (!alimentoSeleccionado || !cantidad) return;

    const alimento = alimentos.find((a) => a.nombre === alimentoSeleccionado);
    const proteinaTotal = (alimento.proteina * cantidad) / 100;
    const nuevaIngesta = { alimento: alimentoSeleccionado, cantidad, proteina: proteinaTotal };

    setIngestaDiaria([...ingestaDiaria, nuevaIngesta]);

    const fechaActual = new Date().toISOString().split('T')[0];
    const nuevoDato = { fecha: fechaActual, proteina: proteinaTotal };

    setDatosMensuales((prevDatos) => {
      const index = prevDatos.findIndex((dato) => dato.fecha === fechaActual);
      if (index !== -1) {
        const datosActualizados = [...prevDatos];
        datosActualizados[index].proteina += proteinaTotal;
        return datosActualizados;
      } else {
        return [...prevDatos, nuevoDato];
      }
    });

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

      <div className="section">
        <h2>Gráfico de Consumo Mensual</h2>
        <GraficoMensual datos={datosMensuales} />
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

      <div className="section">
        <button onClick={manejarMostrarBaseDatos}>
          {mostrarBaseDatos ? 'Ocultar base de datos' : 'Ver base de datos'}
        </button>
      </div>

      {mostrarBaseDatos && (
        <div className="section">
          <h3>Base de Datos de Alimentos</h3>
          <ul>
            {alimentos.map((alimento, index) => (
              <li key={index}>
                {alimento.nombre} - {alimento.proteina}g de proteína cada 100g
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;