import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import { RateType } from '../types/rate';

type ContextType = {
  editedRates: RateType[];
  setEditedRates: Dispatch<React.SetStateAction<RateType[]>>;
  error: string;
  setError: Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
  originalRates: RateType[];
  setOriginalRates: Dispatch<React.SetStateAction<RateType[]>>;
  success: string;
  setSuccess: Dispatch<React.SetStateAction<string>>;
};

const Context = createContext<ContextType>({
  editedRates: [],
  setEditedRates: () => {},
  error: '',
  setError: () => {},
  loading: false,
  originalRates: [],
  setOriginalRates: () => {},
  setLoading: () => {},
  success: '',
  setSuccess: () => {},
});

export const useContekst = () => useContext(Context);

const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');
  const [editedRates, setEditedRates] = useState<RateType[]>([]);
  const [originalRates, setOriginalRates] = useState<RateType[]>([]);

  const value = useMemo(
    () => ({
      editedRates,
      setEditedRates,
      error,
      setError,
      loading,
      originalRates,
      setOriginalRates,
      setLoading,
      success,
      setSuccess,
    }),
    [editedRates, error, loading, originalRates, success]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
