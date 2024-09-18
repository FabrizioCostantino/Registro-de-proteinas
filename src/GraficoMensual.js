import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

const GraficoMensual = ({ datos }) => {
  const chartRef = useRef(null);
  const myChartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    if (datos.length > 0) {
      myChartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: datos.map((item) => item.fecha),
          datasets: [
            {
              label: 'Proteínas Ingeridas',
              data: datos.map((item) => Math.round(item.proteina)), // Redondea las proteínas a enteros
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0, // Asegura que solo se muestren números enteros en el eje Y
              },
            },
          },
        },
      });
    }

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, [datos]);

  return <canvas ref={chartRef}></canvas>;
};

export default GraficoMensual;