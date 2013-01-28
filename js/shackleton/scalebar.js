//
// Adds a Map Scalebar to the bottom left corner of our application
//
define([ 'dojo/_base/declare', 'esri/dijit/Scalebar' ], function( declare, esriDijitScalebar ) {
  
  var _SKScalebarOptions = {
    map: map
  };

  var SKScalebar = declare('shackleton.scalebar', null, {
      
    constructor: function () {
      
      // We should be able to pass the ``_SKScalebarOptions`` object
      // to ``Scalebar`` as an object ... but everytime we do, Esri
      // freaks out and messes up our app.
      var thisScalebar = new esri.dijit.Scalebar({
        map: map
      });

    }
  });

  return {
    SKScalebar: SKScalebar
  };
  
});
// * * *
// #### External Documentation
// To learn more about the ArcGIS Javascript API methods used to
// create this module:
//
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#geocoder" target=_blank">Class: Geocoder</a>

// * * *
// #### Task List
// 1. Figure out why you cannot pass the JSON Object as a variable for esri.dijit.Scalebar

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
