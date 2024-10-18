import Cookies from 'js-cookie';

export const setThresholdsInCookie = (thresholds) => {
  Cookies.set('tempThreshold', thresholds.tempThreshold, { expires: 7 });
  Cookies.set('conditionThreshold', thresholds.conditionThreshold, { expires: 7 });
};

export const getThresholdsFromCookie = () => {
  const tempThreshold = Cookies.get('tempThreshold');
  const conditionThreshold = Cookies.get('conditionThreshold');
  return {
    tempThreshold: tempThreshold ? parseFloat(tempThreshold) : 35,
    conditionThreshold: conditionThreshold || 'Rain',
  };
};

export const clearThresholdsFromCookie = () => {
  Cookies.remove('tempThreshold');
  Cookies.remove('conditionThreshold');
};


