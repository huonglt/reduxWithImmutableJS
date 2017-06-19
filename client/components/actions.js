export const ADD_TAX_COUNTRY = 'ADD_TAX_COUNTRY';
export const LOAD_ORIGINAL_TAX_LIST = 'LOAD_ORIGINAL_TAX_LIST';
export const SELECT_US_CITIZEN = 'SELECT_US_CITIZEN';
export const SELECT_COUNTRY_CODE = 'SELECT_COUNTRY_CODE';
export const CHANGE_TIN = 'CHANGE_TIN';
export const REMOVE_TAX_COUNTRY = 'REMOVE_TAX_COUNTRY';

export const addTaxCountry = () => ({ type: ADD_TAX_COUNTRY });
export const loadOriginalTaxList = () => ({ type: LOAD_ORIGINAL_TAX_LIST });
export const selectUSCitizen = (isUSCitizen) => ({ type: SELECT_US_CITIZEN, isUSCitizen});
export const selectCountryCode = (index, countryCode) => ({ type: SELECT_COUNTRY_CODE, index, countryCode });
export const changeTIN = (index, TIN) => ({ type: CHANGE_TIN, index, TIN});
export const removeTaxCountry = (index) => ({ type: REMOVE_TAX_COUNTRY, index});
