import { Chart } from 'primereact/chart';
import { useState, useEffect } from 'react';

export const DashboardIndex = () => {

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const [chartData2, setChartData2] = useState({});
  const [chartOptions2, setChartOptions2] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ['Masculino', 'Femenino'],
      datasets: [
        {
          data: [8, 4],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
          ]
        }
      ]
    }
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true
          }
        }
      }
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  useEffect(() => {
    const data = {
      labels: ['Aprobados', 'Reprobados'],
      datasets: [
        {
          label: 'Cantidad',
          data: [10, 23,],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',

          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
          ],
          borderWidth: 1
        }
      ]
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    setChartData2(data);
    setChartOptions2(options);
  }, []);

  // Grafica 3
  // Datos de los promedios
  const promedios = [70, 81.19, 90, 92.34, 56.76, 100, 78.9, 90, 100, 78.9, 56.76, 70];

  // Función para contar la cantidad de promedios en cada rango
  const contarPromediosPorRango = () => {
    let rango70_79 = 0;
    let rango80_89 = 0;
    let rango90_100 = 0;
    let debajoDe70 = 0;

    promedios.forEach(promedio => {
      if (promedio >= 70 && promedio <= 79) {
        rango70_79++;
      } else if (promedio >= 80 && promedio <= 89) {
        rango80_89++;
      } else if (promedio >= 90 && promedio <= 100) {
        rango90_100++;
      } else if (promedio < 70) {
        debajoDe70++;
      }
    });

    return [rango70_79, rango80_89, rango90_100, debajoDe70];
  };

  const [data, setData] = useState({});

  useEffect(() => {

    const [rango70_79, rango80_89, rango90_100, debajoDe70] = contarPromediosPorRango();

    const chartData = {
      labels: ['70-79', '80-89', '90-100', 'Menos de 70'],
      datasets: [
        {
          label: 'Cantidad de Promedios',
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFCA28', '#EF5350'],
          data: [rango70_79, rango80_89, rango90_100, debajoDe70]
        }
      ]
    };

    setData(chartData);
  }, []);


  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }]
    },
    legend: {
      display: false
    }
  };

  return (
    <>
      <div className='flex justify-between items-center'>
        <h1 className="text-4xl font-semibold mb-5 mt-10">Graficas y Resultados</h1>
      </div>
      <div className='flex justify-around gap-10 items-center'>
        <div className=''>
          <h3 className='font-semibold text-xl text-center'>Generos</h3>
          <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-12rem" />
        </div>
        <div>
          <h3 className='font-semibold text-xl text-center'>Aprobados / Reprobados</h3>
          <Chart type="bar" data={chartData2} options={chartOptions} className="md:w-25rem" />
        </div>
      </div>
      <div className='flex justify-around gap-10 items-center mt-3'>
        <div>
          <h3 className='font-semibold text-xl text-center'>Promedios</h3>
          <Chart type="bar" data={data} options={options} className="md:w-25rem" />
        </div>
        <div>
          <h3 className='font-semibold text-xl text-center'>Edades</h3>
          <Chart type="bar" data={data} options={options} className="md:w-25rem" />
        </div>
      </div>
    </>
  )
}
