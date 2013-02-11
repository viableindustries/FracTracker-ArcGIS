//
// Enable the user to draw shape(s) on the map and retrieve useful area and distance
// information regarding their drawn shape(s).
//
define([ 'dojo/_base/declare', 'esri/dijit/Measurement' ], function( declare, esriDijitMeasurement ) {

   //
   // Listens for when the "search-address" button is clicked. Once it has been clicked
   // it will initialize the rest of the address search functionality.
   //
  var SKMeasurement = declare('shackleton.measurement', null, {

    constructor: function() {

        var thisMeasurementTools = new esri.dijit.Measurement({
          map: map
        }, 'measurement-content');

        thisMeasurementTools.startup();

    }

  });

  return {
    SKMeasurement: SKMeasurement
  };

});

// * * *
// #### External Documentation
// To learn more about the ArcGIS Javascript API methods used to
// create this module:
//
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#measurement" target=_blank">Class: Measurement</a>

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
