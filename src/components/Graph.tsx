import axios from 'axios';
import moment from 'moment';
import { data1A } from './res2';
import { useContext, useEffect, useMemo, useState } from 'react';
import {
  PlacesContext,
  ContextInterface,
  Place,
} from '../context/PlacesProvider';
import {
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';
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
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '48hr Wave Height Forecast (m)',
    },
  },
};

const Graph = () => {
  const { places, data, setData } = useContext(
    PlacesContext
  ) as ContextInterface;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState('');

  const barData = useMemo(() => {
    // if (!data || !Object.keys(places).length || !data.length) {
    //   return false;
    // }
    return {
      // labels: data[0].hours
      labels: data1A.hours
        .filter((d, i) => i % 3 === 0)
        .map((d) => d.time.slice(11, 16)),
      datasets: [
        {
          // label: places[0].name,
          // data: data[0].hours.map((d) => d.waveHeight.noaa),
          label: '1',
          data: data1A.hours.map((d) => d.waveHeight.noaa),
          borderColor: '#FFC482',
          backgroundColor: '#FFC482',
          fill: true,
          lineTension: 0.04,
        },
        {
          // label: places[1].name,
          // data: data[1].hours.map((d) => d.waveHeight.noaa),
          label: '2',
          data: data1A.hours.map((d) => d.waveHeight.noaa),
          borderColor: '#66999B',
          backgroundColor: '#66999B',
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
    const startDate = moment().format('YYYY-MM-DD');
    const endDate = moment().add(2, 'days').format('YYYY-MM-DD');
    const params = 'waveHeight';
    try {
      const response = await Promise.all([
        axios({
          ...options,
          url: `https://api.stormglass.io/v2/weather/point?lat=${urls[0].lat}&lng=${urls[0].lng}&start=${startDate}&end=${endDate}&params=${params}`,
        }),
        axios({
          ...options,
          url: `https://api.stormglass.io/v2/weather/point?lat=${urls[1].lat}&lng=${urls[1].lng}&start=${startDate}&end=${endDate}&params=${params}`,
        }),
      ]);
      setData([response[0].data, response[1].data]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(`${error.response?.data.errors.key}.`);
        onOpen();
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  useEffect(() => {
    const coordinates = Object.values(places);
    if (coordinates.length === 2 && coordinates[0].lat && coordinates[1].lat) {
      // getData(coordinates);
    }
  }, [places]);

  return (
    <Box py={3}>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p={3} backgroundColor='red.200'>
          <ModalHeader pb={0}>Oops! There is an error:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error}
            <Text>Please try again later.</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
      {!!barData && (
        <Box minH='30vh'>
          <Bar options={barOptions} data={barData} />
        </Box>
      )}
    </Box>
  );
};

export default Graph;
