import getErrorMessage from '../helpers/getErrorMessage';
import { RateType } from '../types/rate';

async function getRatesByDate(params:string) {
  try {
    const [year, month, day] = params.split('-');
    const date = `${year}${month}${day}`;
    const request = await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${date}&json`);
    if (request.status === 200) {
      const response: RateType[] = await request.json();
      return {data: response};
    } else {
      throw new Error('something went wrong');
    }
  } catch (error) {
    return {error: getErrorMessage(error)};
  }
}

export default getRatesByDate;