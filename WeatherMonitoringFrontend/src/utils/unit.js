import Cookies from 'js-cookie';


// New Functions for Temperature Unit
export const setTempUnitInCookie = (unit) => {
    Cookies.set('tempUnit', unit, { expires: 7 }); // Set cookie for 7 days
  };
  
  export const getTempUnitFromCookie = () => {
    return Cookies.get('tempUnit') || 'Celsius'; // Default to 'Celsius'
  };
  
  export const clearTempUnitFromCookie = () => {
    Cookies.remove('tempUnit');
  };