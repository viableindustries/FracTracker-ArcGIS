//
// Initialize our application and get things moving
//

// Setup the ``defaults`` object which sets options that will be
// use throughout our application.
var map, defaults = {}, clickHandler, clickListener;

// Here we are going to load our primary map. We need to make sure
// that we include it here, so that we can use it when necessary.
dojo.require('shackleton.map');

var requestRemoteData = function ( dataKey, dataType ) {
  
  var thisURL = esri.arcgis.utils.arcgisUrl + "/" + dataKey + "/data";
  console.log(thisURL);
  
  requestHandle = esri.request({
      url: thisURL,
      content: {
          f: "json"
       },
      callbackParamName: "callback",
      load: function ( response ) {
                
        var sharingContentItems = (dataType == 'application') ? response.values: response;
          
        for ( var key in sharingContentItems ) {
          defaults[key] = sharingContentItems[key];
        }

        if (dataType == 'application') {
          requestRemoteData(defaults.webmap, 'webmap');
        }
        else if (dataType == 'webmap' && defaults.webmap) {
            var thisMap = new shackleton.map( defaults );
        }
        else {
          return true;
        };
        
      },
      //
      // If we don't have anything (e.g., Web Map ID, Application ID) then there
      // is no point in continuing, we should   just stop everything, remove the
      // "Loading map" progress bar and let the user know something is wrong.
      // We'll display a message to them, giving them access to alternative maps
      // or a way out of this broken page.
      //
      error: function ( error ) {
        jQuery(_UIElements).toggle();
        console.log(error);
      }
  });    
  
  return defaults;
};

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
    if (typeof defaults.query.webmap != 'undefined' ) {
      defaults.webmap = defaults.query.webmap;
      requestRemoteData(defaults.webmap, 'webmap');    
    } 
    else if (typeof defaults.query.appid != 'undefined' ) {
      requestRemoteData(defaults.query.appid, 'application');
    }
    else {
      console.log('Please add an ID to the URL above to load an ArcGIS Online Entity');
    };

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