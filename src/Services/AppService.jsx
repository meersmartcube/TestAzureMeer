export const BASEURL = window.Configs.APIUrl;//'http://localhost/SBCS.Services.AppWebApi/';
//export const BASEURL = window.configs.APIURL; //'https://br.smartcube.co/SBCS.Services.AppWebApi/';
export const WEATHERFORECAST = 'weatherforecast';

export const APIUSER = 'api/Users/';
export const APIBUSINESSES = 'api/Businesses/';
export const APISCHEDULES = 'api/Schedules/';
export const APICOMPLAINS = 'api/Complains/';
export const APICOMMON = 'api/Common/';

export const SAVECECKINCHECKOUT = `${APIBUSINESSES}SaveCheckInCheckOut`;
export const GETCHECKINCHECKOUTLIST = `${APIBUSINESSES}GetCheckInCheckOutList`;
export const GETOPENANDCLOSESTATUS = `${APIBUSINESSES}GetOpenAndCloseStatus`;
export const SAVEBUSINESSLOCATION = `${APIBUSINESSES}SaveBusinessLocation`;
export const SAVEBUSINESSAUTHORIZED = `${APIBUSINESSES}SaveBusinessAuthorized`;
export const SAVEBUSINESSCONTACTDETAIL = `${APIBUSINESSES}SaveBusinessContactDetail`;

//User
export const AUTHENTICATEWEBUSER = `${APIUSER}AuthenticateWebUser`;
export const CHANGEPASSWORD = `${APIUSER}ChangePassword`;
export const FORGETPASSWORD = `${APIUSER}ForgetPassword`;

//Business
export const GETBUSINESSDETAIL = `${APIBUSINESSES}GetBusinessDetail`;
export const GETBUSINESSESBYRADIUS = `${APIBUSINESSES}GetBusinessesByRadius`;
export const GETCLEANSINGHISTORY = `${APIBUSINESSES}GetCleansingHistory`;

//Schedules
export const GETBUSINESSESSCHEDULES = `${APISCHEDULES}GetBusinessesSchedules`;

//Complains
export const SAVECOMPLAIN = `${APICOMPLAINS}SaveComplain`;
export const GETCOMPLAINS = `${APICOMPLAINS}GetComplains`;

//Common
export const GETLOOKUP = `${APICOMMON}GetLookup`;