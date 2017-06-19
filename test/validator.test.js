import validateTaxCountry from '../client/components/validator';
import { findTaxCountry } from '../client/components/reducer';
test('find tax country with countryCode = US, shhould find it', () => {
  const taxCountry = findTaxCountry('US');
  expect(taxCountry.countryCode).toBe('US');
})
test('test validator', () => {
  const taxCountry = {countryCode: 'US', TINIssued: true, TINOptional: false, TIN: ''};
  let {valid, errMsg} = validateTaxCountry(taxCountry);
  console.log(`valid = ${valid}, errMsg=${errMsg}`);
  expect(1).toBe(1);
});
