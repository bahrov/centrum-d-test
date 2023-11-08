import { Box, Button, Pagination, TextField } from '@mui/material';
import { RateType } from '../types/rate';

type propTypes = {
  currentPage: number;
  dateSearch: string;
  getRates: () => void;
  isSearch: boolean;
  paginatedRate: RateType[][];
  search: string;
  setCurrentPage: (param: number) => void;
  setDateSearch: (param: string) => void;
  setSearch: (param: string) => void;
};

const SearchWithPagination = ({
  currentPage,
  dateSearch,
  getRates,
  isSearch,
  paginatedRate,
  search,
  setCurrentPage,
  setDateSearch,
  setSearch,
}: propTypes) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        m: 2,
      }}
    >
      <Box className='centrate'>
        <TextField
          label='Search'
          onChange={(e) => setSearch(e.target.value)}
          size='small'
          sx={{ mr: 2 }}
          value={search}
        />
        {isSearch && (
          <Box className='centrate'>
            <TextField
              onChange={(e) => setDateSearch(e.target.value)}
              size='small'
              sx={{ mr: 2 }}
              type={'date'}
              value={dateSearch}
            />
            <Button onClick={getRates}>Search</Button>
          </Box>
        )}
      </Box>
      {!search && (
        <Pagination
          color='primary'
          count={paginatedRate.length}
          page={currentPage + 1}
          onChange={(_, p) => setCurrentPage(p - 1)}
        />
      )}
    </Box>
  );
};

export default SearchWithPagination;
