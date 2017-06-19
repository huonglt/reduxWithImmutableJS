import Immutable from 'immutable';

const validateTaxCountry = (taxCountry) => {
  const {countryCode, TIN, TINIssued, TINOptional } = taxCountry;
  console.log(`validateTaxCountry: taxCountry = ${JSON.stringify(taxCountry)}`);
  console.log(`validateTaxCountry: countryCode.length = ${countryCode.length}`);
  console.log(`validateTaxCountry: TIN.length = ${TIN.length}`);
  if(countryCode.length == 0) {
    return {valid: false, errMessages: {countryCode: 'Selection is required'}};
  }
  if(TINIssued) {
    if(countryCode === 'US') {
      if(TIN.length === 0) {
        return {valid: false, errMessages: {TIN: 'TIN is required'}};
      } else if(TIN.length !== 9) {
        return {valid: false, errMessages: {TIN: 'TIN is 9 digit numbers'}};
      }
    } else {
      if(!TINOptional) {
        if(TIN.length === 0) {
          return {valid: false, errMessages: {TIN: 'TIN is required'}};
        } else if(TIN.length < 4 || TIN.length > 20) {
          return {valid: false, errMessages: {TIN: 'TIN must be from 4 to 20 character length'}};
        }
      }

    }
  }
  return {valid: true, errMessages: null};
};

export default validateTaxCountry;
