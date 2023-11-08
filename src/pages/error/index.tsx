import getErrorMessage from '../../helpers/getErrorMessage';
import { useRouteError } from 'react-router-dom';
import { Typography, styled } from '@mui/material';

const CenteredText = styled(Typography)({
  textAlign: 'center',
  paddingTop: ['20%', 20],
});

export default function ErrorPage() {
  document.title = 'Error 💥';
  const error: unknown = useRouteError();
  console.error(error);

  return (
    <>
      <CenteredText variant='h3'>Oops!</CenteredText>
      <CenteredText variant='subtitle1'>
        Sorry, an unexpected error has occurred.
      </CenteredText>
      <CenteredText>
        <CenteredText variant='subtitle2' sx={{ color: 'grey' }}>
          {getErrorMessage(error)}
        </CenteredText>
      </CenteredText>
    </>
  );
}
