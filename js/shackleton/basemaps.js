//
// Visit the <a target="_blank" href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#basemapgallery">ArcGIS Online API Documentation to learn more about
// the Esri Basemaps Class and read further documentation</a>
// 

// Make sure that we have ``declare`` and the ``BasemapGallery``
define('SKBasemaps', ['dojo/_base/declare', 'esri/dijit/BasemapGallery' ], function(declare, esriDijitBasemap ) {

  var SKBasemaps = declare('shackleton.basemaps', null, {

    constructor: function () {

      //
      // Instantiate our Basemap Gallery and make sure that
      // we are using the basic set of ArcGIS Basemaps.
      var basemapsGallery = new esri.dijit.BasemapGallery({
        showArcGISBasemaps: true,
        map: map
        // Add the Basemaps to the Basemaps modal
      }, 'basemaps-gallery');


      // Startup the Basemap Gallery as soon as possible
      basemapsGallery.startup();
    }

  });

  return SKBasemaps;

});

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
