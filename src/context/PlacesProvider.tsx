import { createContext, useState } from 'react';

export interface ContextInterface {
  places: Record<number, Place>;
  setPlaces: React.Dispatch<React.SetStateAction<Record<number, Place>>>;
  data: PlacesResponse[] | [];
  setData: React.Dispatch<React.SetStateAction<PlacesResponse[] | []>>;
}

export interface Place {
  lat?: number;
  lng?: number;
  name?: string;
}

type PlacesData = {
  swellDirection: {};
  swellHeight: {};
  swellPeriod: {};
  time: string;
  waveHeight: { noaa: string };
  wavePeriod: {};
};

interface PlacesResponse {
  hours: PlacesData[];
}

const PlacesContext = createContext<ContextInterface | null>(null);

const PlacesProvider = (props: any) => {
  const [places, setPlaces] = useState<Record<number, Place>>({});
  const [data, setData] = useState<PlacesResponse[] | []>([]);
  return (
    <PlacesContext.Provider value={{ places, setPlaces, data, setData }}>
      {props.children}
    </PlacesContext.Provider>
  );
};

export { PlacesContext, PlacesProvider };
