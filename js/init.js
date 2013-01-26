//
// Initialize our application and get things moving
//

// Setup the ``defaults`` object which sets options that will be
// use throughout our application.
var defaults = {};

// Here we are going to load our primary map. We need to make sure
// that we include it here, so that we can use it when necessary.
dojo.require('shackleton.map');

var __init__ = function () {
  
  // Setup our initialization variables
  var requestHandle,
      _UIElements = "#progress";

  
  //
  // Make sure we have loaded our classes/libraries
  // properly and that we have access to the Esri
  // mapping object and associated functions. 
  //
  if (typeof esri == 'undefined') {
      console.error('[Map] Could not connect to server');
      return false;
  };
  
try {

   // 
   // Make sure that we are capable of loading an application
   // from ArcGIS Online. In order to do so we need either an
   // appid or Application Idenitification Key, or we need
   // a straight Webmap Identification Key.
   //
  defaults.query = esri.urlToObject(document.location.href).query;

   // 
   // If a WebMap ID is available through the URL object, then
   // we should just go ahead and load the map.
   //
  if ( defaults.query.webmap ) {
    defaults.webmap = defaults.query.webmap;
    var map = new shackleton.map(defaults);
  };
  
   // 
   // If an Application ID is available through the URL object, then
   // we should use the Application ID or appid and load the WebMap ID
   // through the ArcGIS Online Content/Data API to find out the rest 
   // of the information about our Web Map.
   //
  if ( defaults.query.appid ) {
    requestHandle = esri.request({
        url: esri.arcgis.utils.arcgisUrl + "/" + defaults.query.appid + "/data",
        content: {
            f: "json"
         },
        callbackParamName: "callback",
        load: function ( response ) {
          for ( var key in response.values ) {
            defaults[key] = response.values[key];          
          }
          //
          // Here we actually instantiate our map and pass any defaults we have
          // collected either from the application or the URL object.
          //
          var map = new shackleton.map(defaults);
        },
        //
        // If we don't have anything (e.g., Web Map ID, Application ID) then there
        // is no point in continuing, we should just stop everything, remove the
        // "Loading map" progress bar and let the user know something is wrong.
        // We'll display a message to them, giving them access to alternative maps
        // or a way out of this broken page.
        //
        error: function ( error ) {
          jQuery(_UIElements).toggle();
        }
    });
  };
      
      
} catch (e) {

  //
  // Again, same as the last comment, give the user something helpful to work with if
  // there is nothing to display.
  //
  jQuery(_UIElements).toggle();

}

        
};

//
// Let's go ahead and start the application when Dojo decides that the page
// is ready.
//
dojo.ready(__init__);

// * * *
//     Shackleton 0.1.01
//
//     Shackleton is a framework for building web map applications
//     that are compatible with ArcGIS Online.
//
//     It is named in honor of the famous and widely respected
//     British Antarctic explorer Sir Ernest Henry Shackleton.
//
//     Viable Industries, ArcGIS Compatible Web Application,
//     where applicable. This application was built by the 
//     folks at Viable Industries for use by it's clients only. 
//     Any code herein is property of Viable Industries.
//     unless where otherwise noted property of Esri/ArcGIS
//
//     To find out how you can use this software or have your
//     own version of this software, custom built to fit your
//     organizations needs, contact us by visiting
//     www.viableindustries.com or emailing us at joshua@viable.io
//
//     Copyright (c) 2013 Viable Industries, All rights reserved.
//     Unless otherwise noted.