import Immutable from 'immutable';
import _ from 'lodash';
import * as actions from './actions';

const log = (...obj) => console.log(JSON.stringify(obj));
const originalTaxCountryList = [
  {countryCode: 'US', countryName: 'United States', TINIssued: true, TINOptional: false},
  {countryCode: 'NZ', countryName: 'New Zealand', TINIssued: true, TINOptional: false},
  {countryCode: 'VN', countryName: 'Vietnam', TINIssued: false, TINOptional: true},
  {countryCode: 'SG', countryName: 'Singapore', TINIssued: true, TINOptional: true},
];
export const findTaxCountry = (countryCode) => {
  return originalTaxCountryList.find((taxCountry) => taxCountry.countryCode == countryCode);
}
export const initialState = Immutable.fromJS({
  isForeignTaxResident: true,
  isUSCitizen: null,
  maxTaxCountry: 4,
  selectedTaxCountries: []
});

const selectUSCitizen = (state, action) => {
  if(action.isUSCitizen) {
    return state.merge({isUSCitizen: true, maxTaxCountry: 5});
  }
  return state.merge({isUSCitizen: false, maxTaxCountry: 4});
};
const loadTaxCountryList = (state , action) => {
  let originalTaxCountryList = action.originalTaxCountryList;
  return state.set('originalTaxCountryList', originalTaxCountryList);
};
const addBlankTaxCountry = (state, action) => {
  if(state.get('selectedTaxCountries').size === state.get('maxTaxCountry')) {
    return state;
  }
  let selectedTaxCountries = state.get('selectedTaxCountries').push(Immutable.Map({countryCode: '', TIN: ''}));
  return state.set('selectedTaxCountries', selectedTaxCountries);
}
const selectCountryCode = (state , action) => {
  const { index, countryCode } = action;
  if(index < 0 || index >= state.get('selectedTaxCountries').size) {
    return state;
  }

  let selectedTaxCountries = state.get('selectedTaxCountries').update(index, (taxCountry) => taxCountry.merge({countryCode, TIN: '', valid: true, errMsg: null}));
  return state.set('selectedTaxCountries', selectedTaxCountries);
};

const changeTIN = (state, action) => {
  const { index, TIN } = action;
  console.log(`changeTIN: action.index = ${index}, action.TIN = ${TIN}`);
  if(index < 0 || index >= state.get('selectedTaxCountries').size) {
    return state;
  }

  let selectedTaxCountries = state.get('selectedTaxCountries').update(index, (taxCountry) => taxCountry.merge({TIN}));
  return state.set('selectedTaxCountries', selectedTaxCountries);
};

const removeTaxCountry = (state, action) => {
  const index = action.index;
  if(index < 0 || index >= state.get('selectedTaxCountries').size) {
    return state;
  }
  // cannot remove tax country US when is US citizen
  let isTaxCountryUS = state.get('selectedTaxCountries').get(index).get('countryCode') === 'US';
  if(state.get('isForeignTaxResident') === true && state.get('isUSCitizen') === true && isTaxCountryUS) {
    console.log('cannot remove tax country US when you are an US citizen');
    return state;
  }

  // must have at least 1 tax country selected when is a foreign tax resident
  if(state.get('isForeignTaxResident') === true && state.get('selectedTaxCountries').size <= 1) {
    console.log('require to have at least one tax country selected. cannot remove');
    return state;
  }

  let selectedTaxCountries = state.get('selectedTaxCountries').delete(index);
  return state.set('selectedTaxCountries', selectedTaxCountries);
};
const reducer = (state = initialState, action = {type:''}) => {
  switch(action.type) {
    case actions.LOAD_ORIGINAL_TAX_LIST:
      return loadTaxCountryList(state, action);
    case actions.ADD_TAX_COUNTRY:
      return addBlankTaxCountry(state);
    case actions.SELECT_US_CITIZEN:
      return selectUSCitizen(state, action);
    case actions.SELECT_COUNTRY_CODE:
        return selectCountryCode(state, action);
    case actions.CHANGE_TIN:
        return changeTIN(state, action);
    case actions.REMOVE_TAX_COUNTRY:
        return removeTaxCountry(state, action);
    default:
      return state;
  }
}

export default reducer;
