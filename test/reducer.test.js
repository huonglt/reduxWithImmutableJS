import * as actions from '../client/components/actions';
import reducer, { initialState } from '../client/components/reducer';
import Immutable from 'immutable';

test('reducer of undefined state & undefined action will return the initialState', () => {
  expect(reducer().toJS()).toEqual(initialState.toJS());
});
test('ADD_TAX_COUNTRY will add a new item into selectedTaxCountries with empty countryCode & empty TIN', () => {
  let state = initialState; // immutableJS object
  let size = state.get('selectedTaxCountries').size;

  state = reducer(state, actions.addTaxCountry());
  let sizeNext = state.get('selectedTaxCountries').size;
  let taxCountry = state.get('selectedTaxCountries').get(sizeNext - 1);
  expect(sizeNext).toEqual(size + 1);
  expect(taxCountry.toJS()).toEqual({countryCode:'', TIN:''});
});
test('Select US Citizen with value true, the isUSCitizen field would be set to true, and maxTaxCountry = 5', () => {
  let state = initialState;
  state = reducer(initialState, actions.selectUSCitizen(true));
  expect(state.get('isUSCitizen')).toBe(true);
  expect(state.get('maxTaxCountry')).toEqual(5);
});
test('Select US citizen with value No, the isUSCitizen field is set to false, and maxTaxCountry = 4', () => {
  let state = initialState;
  state = reducer(initialState, actions.selectUSCitizen(false));
  expect(state.get('isUSCitizen')).toBe(false);
  expect(state.get('maxTaxCountry')).toEqual(4);
});
test('Remove a tax country with index > size, state should be unchanged', () => {
  let state = initialState;
  let size = state.get('selectedTaxCountries').size;
  state = reducer(initialState, actions.removeTaxCountry(size));
  expect(state).toEqual(initialState);
});
test('Given selected tax countries size > 1, remove a tax country with index < size, the tax country at the index will be removed', () => {
  let state = initialState;
  state = reducer(state, actions.addTaxCountry());
  state = reducer(state, actions.addTaxCountry());
  let size = state.get('selectedTaxCountries').size;

  state = reducer(state, actions.removeTaxCountry(size - 1));
  let newSize = state.get('selectedTaxCountries').size;
  expect(newSize).toEqual(size - 1);
});
test('update country code of an item which index not in range of 0 and size, state would be unchanged', () => {
  let state = initialState;
  state = reducer(state, actions.selectCountryCode(1, 'US'));
  expect(state).toEqual(initialState);
});
test('delete tax country US, when is a US citizen, state should be unchanged', () => {
  let _state = initialState.merge({isUSCitizen: true, selectedTaxCountries:[{countryCode: 'US', TIN: ''}]});
  let state = reducer(_state, actions.removeTaxCountry(0));
  expect(state).toEqual(_state);
});
test('delete a tax country where there is only 1 selected tax country, state would be unchanged', () => {
  let _state = initialState.merge({isUSCitizen: false, selectedTaxCountries:[{countryCode:'VN', TIN: ''}]});
  let state = reducer(_state, actions.removeTaxCountry(0));
  expect(state).toEqual(_state);
});
test('changeTIN to 123 for country at index 0, the countryCode at index 0 will be 123', () => {
  let _state = initialState.merge({isUSCitizen: false, selectedTaxCountries:[{countryCode:'VN', TIN: ''}]});
  let state = reducer(_state, actions.changeTIN(0, '123'));
  console.log(`state = ${JSON.stringify(state)}`);
  expect(state.get('selectedTaxCountries').get(0).get('TIN')).toEqual('123');
});
test('set TIN to US country, will have errMsg and invalid', () => {

});
