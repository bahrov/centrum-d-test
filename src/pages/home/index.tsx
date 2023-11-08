import Changer from '../../components/Changer';
import CurrencyItem from '../../components/CurrencyItem';
import getErrorMessage from '../../helpers/getErrorMessage';
import SearchWithPagination from '../../components/SerchWithPagination';
import { RateType } from '../../types/rate';
import { splitArray } from '../../helpers/splitArray';
import { useContekst } from '../../context';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import getRatesByDate from '../../requests/getRatesByDate';

type propTypes = {
  location: 'home' | 'changed' | 'search';
};

const HomePage = ({ location }: propTypes) => {
  const { cc } = useParams();
  document.title = cc || location;
  const context = useContekst();
  const isChanged = useMemo(() => location === 'changed', [location]);
  const isSearch = useMemo(() => location === 'search', [location]);
  const isHome = useMemo(() => location === 'home', [location]);

  const [rates, setRates] = useState<RateType[]>([]);
  const [paginatedRates, setPaginatedRates] = useState<RateType[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const [dateSearch, setDateSearch] = useState('');

  const getRates = useCallback(async () => {
    try {
      const isValid = new Date() >= new Date(dateSearch);
      if (!isValid) {
        throw new Error(
          'please, select a date that would be earlier than today'
        );
      }
      context.setLoading(true);
      setCurrentPage(0);
      setPaginatedRates([]);
      setRates([]);
      const response = await getRatesByDate(dateSearch);
      if (response.error) {
        throw new Error(response.error);
      } else if (response.data) {
        setPaginatedRates(splitArray(response.data));
        setRates(response.data);
      }
    } catch (error) {
      context.setError(getErrorMessage(error));
    } finally {
      context.setLoading(false);
    }
  }, [context, dateSearch]);

  const refresh = useCallback(() => {
    setCurrentPage(0);
    setSearch('');
    setDateSearch('');
  }, []);

  useEffect(() => {
    if (isHome) {
      setPaginatedRates(splitArray(context.originalRates));
      setRates(context.originalRates);
      refresh();
    } else if (isChanged) {
      setPaginatedRates(splitArray(context.editedRates));
      setRates(context.editedRates);
      refresh();
    } else if (isSearch) {
      setPaginatedRates(splitArray(context.originalRates));
      setRates(context.originalRates);
      refresh();
    }
  }, [
    context.editedRates,
    context.originalRates,
    isChanged,
    isHome,
    isSearch,
    refresh,
  ]);

  return (
    <span className='overflow-scroll'>
      {!cc && (
        <>
          {!cc && !!paginatedRates.length && (
            <SearchWithPagination
              dateSearch={dateSearch}
              getRates={getRates}
              isSearch={isSearch}
              currentPage={currentPage}
              paginatedRate={paginatedRates}
              search={search}
              setCurrentPage={setCurrentPage}
              setDateSearch={setDateSearch}
              setSearch={setSearch}
            />
          )}
          {isChanged && !paginatedRates.length && (
            <Typography align='center' sx={{ mt: 20 }}>
              You haven't edited any rates yet
            </Typography>
          )}
          {!!paginatedRates.length &&
            !search &&
            paginatedRates[currentPage].map((rate) => (
              <CurrencyItem key={rate.cc} rate={rate} />
            ))}
          {!!search &&
            rates.map((rate) => {
              if (rate.txt.toLowerCase().includes(search.toLowerCase())) {
                return <CurrencyItem key={rate.cc} rate={rate} />;
              }
            })}
        </>
      )}
      {cc && <Changer cc={cc} />}
    </span>
  );
};

export default HomePage;
