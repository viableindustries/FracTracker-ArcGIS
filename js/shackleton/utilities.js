//
// Provides basic utilities for use within our application
//
define([ 'dojo/_base/declare' ], function( declare ) {

  var SKRemoteData = declare(null, {
  
    constructor: function ( dataKey, dataType ) {

      var thisURL = esri.arcgis.utils.arcgisUrl + "/" + dataKey + "/data";

      requestHandle = esri.request({
          url: thisURL,
          content: {
              f: "json"
           },
          callbackParamName: "callback",
          load: function ( response ) {
              
            var sharingContentItems = (dataType == 'application') ? response.values: response;
        
            for ( var key in sharingContentItems ) {
              globals[key] = sharingContentItems[key];
            }

            if (dataType == 'application') {
              requestRemoteData(globals.webmap, 'webmap');
            }
            else if (dataType == 'webmap' && globals.webmap) {
                var thisMap = new shackleton.map( globals );
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

      return globals;
    }
  });


  var SKUtilities = declare('shackleton.utilities', null, {
    
    /**
     // If you would like to initially hide a feature, simply place it's ID in this list
     */      
    constructor: function () {
      return true;
    }
    
  });

  return {
    SKUtilities: SKUtilities,
    SKRemoteData: SKRemoteData
  };
  
});



//
// Each of our individual features (e.g., legend, layers, meta information, scalebar, search)
// is declare and instantiated in this "Features Loader" file.
// 
// To add a new feature module to the map:
//
//   1. Add a new file and it's associated code in a new file, like "js/shackleton/scalebar.js"
//   2. Include the file in the declare statement below (e.g., 'shackleton/scalebar')
//   3. Add the approriate parameter to the function (e.g., shackletonScalebar)
//   4. In the constructor of the Feature Loader, instantiate the new Module (e.g.,  var thisScalebar = new shackleton.scalebar( thisMap );)
//
//
// * * *
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
