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
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const tideData = {
  data: [
    {
      height: '1.18',
      time: '2019-03-15 03:40:44+00:00',
      type: 'high',
    },
    {
      height: '0.60',
      time: '2019-03-15 09:53:54+00:00',
      type: 'low',
    },
    {
      height: '1.20',
      time: '2019-03-15 16:23:29+00:00',
      type: 'high',
    },
    {
      height: '0.61',
      time: '2019-03-15 22:39:15+00:00',
      type: 'low',
    },
  ],
  meta: {
    cost: 1,
    dailyQuota: 800,
    end: '2019-03-16 00:00',
    lat: 60.936,
    lng: 5.114,
    requestCount: 145,
    start: '2019-03-15 00:00',
    station: {
      distance: 61,
      lat: 60.398046,
      lng: 5.320487,
      name: 'bergen',
      source: 'sehavniva.no',
    },
  },
};

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
};

const data = {
  labels: tideData.data.map((d) => d.time.slice(10, 19)),
  datasets: [
    {
      label: 'Dataset 1',
      data: res.data.map((d) => d.height),
      backgroundColor: 'red',
    },
    {
      label: 'Dataset 2',
      data: res2.data.map((d) => d.height),
      backgroundColor: 'blue',
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

  const getData = async (urls: Place[]) => {
    try {
      const response = await Promise.all([
        axios({
          ...options,
          url: `https://api.stormglass.io/v2/tide/extremes/point?lat=${urls[0].lat}&lng=${urls[0].lng}&start=2022-12-06&end=2022-12-07`,
        }),
        axios({
          ...options,
          url: `https://api.stormglass.io/v2/tide/extremes/point?lat=${urls[1].lat}&lng=${urls[1].lng}&start=2022-12-06&end=2022-12-07`,
        }),
      ]);
      console.log('res', response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const coordinates = Object.values(places);
    if (coordinates.length === 2) {
      getData(coordinates);
    }
  }, [places]);

  return (
    <Box>
      <Bar options={barOptions} data={data} />
    </Box>
  );
};

export default Graphs;
