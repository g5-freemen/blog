import { toast } from 'react-toastify';
import { TOAST_TIMEOUT } from './constants';

export function errorsToasts(data: any) {
  const errorsKeys = Object.keys(data.errors);
  const errorsValues = Object.values(data.errors);
  errorsKeys.forEach((key, i) => {
    const keyCap = key[0].toUpperCase() + key.slice(1);
    toast(`${keyCap} ${errorsValues[i]}`, {
      type: 'error',
      autoClose: TOAST_TIMEOUT,
    });
  });
}
