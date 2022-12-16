import axios, { AxiosResponse } from 'axios';
import moment from 'moment';
import { res, res2 } from './res';
import { useContext, useEffect, useMemo, useState } from 'react';
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
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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

const barOptions: ChartOptions<'bar'> = {
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
};

const Graphs = () => {
  const { places, data, setData } = useContext(
    PlacesContext
  ) as ContextInterface;
  console.log('places', places);

  console.log('data', data);

  const barData = useMemo(() => {
    if (!data || !Object.keys(places).length || !data.length) {
      return false;
    }
    return {
      labels: res.hours
        .filter((d, i) => i % 3 === 0)
        .map((d) => d.time.slice(11, 16)),
      datasets: [
        {
          label: 'Dataset 1',
          data: data[0].hours.map((d) => d.waveHeight.noaa),
          borderColor: 'rgba(153, 90, 200)',
          backgroundColor: 'rgba(153, 90, 200, 0.5)',
          fill: true,
          lineTension: 0.04,
        },
        {
          label: 'Dataset 2',
          data: data[1].hours.map((d) => d.waveHeight.noaa),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          fill: true,
          lineTension: 0.4,
        },
      ],
    };
  }, [places]);

  const getData = async (urls: Place[]) => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: process.env.REACT_APP_TIDE_KEY,
      },
    };
    const date = moment().format('YYYY-MM-DD');
    const params =
      'waveHeight,wavePeriod,swellHeight,swellPeriod,swellDirection';
    try {
      const response = await Promise.all([
        axios({
          ...options,
          url: `https://api.stormglass.io/v2/weather/point?lat=${urls[0].lat}&lng=${urls[0].lng}&start=${date}&params=${params}`,
        }),
        axios({
          ...options,
          url: `https://api.stormglass.io/v2/weather/point?lat=${urls[1].lat}&lng=${urls[1].lng}&start=${date}&params=${params}`,
        }),
      ]);
      console.log('res', response);
      setData([response[0].data, response[1].data]);
    } catch (err) {
      // trigger error modal here
      console.log(err);
    }
  };

  useEffect(() => {
    const coordinates = Object.values(places);
    if (coordinates.length === 2) {
      getData(coordinates);
    }
  }, [places]);

  return <Box>{!!barData && <Bar options={barOptions} data={barData} />}</Box>;
};

export default Graphs;
