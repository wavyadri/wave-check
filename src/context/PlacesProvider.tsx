import { createContext, useState } from 'react';

export interface ContextInterface {
  places: Record<number, Place>;
  setPlaces: React.Dispatch<React.SetStateAction<Record<number, Place>>>;
}

interface Place {
  lat?: number;
  lng?: number;
}

const PlacesContext = createContext<ContextInterface | null>(null);

const PlacesProvider = (props: any) => {
  const [places, setPlaces] = useState<Record<number, Place>>({});
  const [data, setData] = useState([]);

  return (
    <PlacesContext.Provider value={{ places, setPlaces }}>
      {props.children}
    </PlacesContext.Provider>
  );
};

export { PlacesContext, PlacesProvider };
