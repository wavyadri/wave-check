import axios from 'axios';
import { res, res2 } from './res';
import { useContext, useEffect } from 'react';
import {
  PlacesContext,
  ContextInterface,
  Place,
} from '../context/PlacesProvider';
import { Box } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
  interaction: {
    // mode: 'nearest',
    // axis: 'x',
    // intersect: false,
  },
  // scales: {
  //   x: {
  //     stacked: true,
  //   },
  //   y: {
  //     stacked: true,
  //   },
  // },
};

const data = {
  labels: res.hours
    // .filter((d, i) => i % 3 === 0)
    .map((d) => d.time.slice(11, 16)),
  datasets: [
    {
      label: 'Dataset 1',
      data: res.hours.map((d) => d.waveHeight.noaa),
      borderColor: 'rgba(153, 90, 200)',
      backgroundColor: 'rgba(153, 90, 200, 0.5)',
      fill: true,
      lineTension: 0.04,
    },
    {
      label: 'Dataset 2',
      data: res2.hours.map((d) => d.waveHeight.noaa),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      fill: true,
      lineTension: 0.4,
    },
  ],
};

const Graphs = () => {
  const { places } = useContext(PlacesContext) as ContextInterface;
  console.log(places);
  const options = {
    method: 'GET',
    headers: {
      Authorization: process.env.REACT_APP_TIDE_KEY,
    },
  };

  // const getData = async (urls: Place[]) => {
  //   const params =
  //     'waveHeight,wavePeriod,swellHeight,swellPeriod,swellDirection';
  //   try {
  //     const response = await Promise.all([
  //       axios({
  //         ...options,
  //         url: `https://api.stormglass.io/v2/weather/point?lat=${urls[0].lat}&lng=${urls[0].lng}&start=2022-12-09&params=${params}`,
  //       }),
  //       axios({
  //         ...options,
  //         url: `https://api.stormglass.io/v2/weather/point?lat=${urls[1].lat}&lng=${urls[1].lng}&start=2022-12-09&params=${params}`,
  //       }),
  //     ]);
  //     console.log('res', response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    const coordinates = Object.values(places);
    if (coordinates.length === 2) {
      // getData(coordinates);
    }
  }, [places]);

  return (
    <Box>
      <Line options={barOptions} data={data} />
      <Bar options={barOptions} data={data} />
    </Box>
  );
};

export default Graphs;
