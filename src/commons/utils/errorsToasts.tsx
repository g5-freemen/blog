import { toast, ToastOptions } from 'react-toastify';
import { TOAST_TIMEOUT } from './constants';

const errorOpts: ToastOptions = {
  type: 'error',
  autoClose: TOAST_TIMEOUT,
};

export function errorsToasts(data: any) {
  if (data?.message) {
    const msg = data.message[0].toUpperCase() + data.message.slice(1);
    toast(msg, errorOpts);
    return;
  }

  if (typeof data === 'object' && data?.errors) {
    const errorsKeys = Object.keys(data.errors);
    const errorsValues = Object.values(data.errors);
    errorsKeys.forEach((key, i) => {
      const keyCap = key[0].toUpperCase() + key.slice(1);
      toast(`${keyCap} ${errorsValues[i]}`, errorOpts);
    });
    return;
  }

  toast('Error', errorOpts);
}

export function toastNotLogged() {
  toast("You're not logged in!", {
    type: 'warning',
    autoClose: TOAST_TIMEOUT,
  });
}
