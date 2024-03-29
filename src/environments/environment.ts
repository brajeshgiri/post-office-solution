// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://localhost:3000/",
  jsonBaseUrl: "/assets/json/",
  isService: true,
  urls: {
    postOfficeListUrl: "office/list",
    deleteOffice: "office/delete",
    postOfficeSaveUrl: "office/add",
    postOfficeUpdateUrl: "office/update",

    getShipmentListUrl: "shipment/list",
    deleteShipmentUrl: "shipment/delete",
    saveShipmentUrl: "shipment/add",
    udpateShipmentUrl: "shipment/update",

    shipmentTypesJsonUrl: "shipmentTypes.json",
    weightTypesJsonUrl: "weightTypes.json",
    statusTypesJsonUrl: "statusTypes.json",
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
