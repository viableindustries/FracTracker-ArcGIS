//
// Enable the user to switch to the Base Map of their choice
// 

// Make sure that we have ``declare`` and the ``BasemapGallery``
define('SKBasemaps', ['dojo/_base/declare', 'esri/dijit/BasemapGallery' ], function(declare, esriDijitBasemap ) {

  var SKBasemaps = declare('shackleton.basemaps', null, {

    constructor: function () {

      //
      // Instantiate our Basemap Gallery and make sure that
      // we are using the basic set of ArcGIS Basemaps.
      //
      var thisBasemapGallery = new esri.dijit.BasemapGallery({
        showArcGISBasemaps: true,
        map: map
        // Add the Basemaps to the Basemaps modal
      }, 'basemaps-gallery');


      // Startup the Basemap Gallery as soon as possible
      thisBasemapGallery.startup();
      
      dojo.connect( thisBasemapGallery, "onSelectionChange", function() {

          var newBasemap = thisBasemapGallery.getSelected();
          
          if (map.getLayer('World_Reference_Overlay_3749').visible === true) {
              map.getLayer('World_Reference_Overlay_3749').hide();
          }
          
          jQuery('#basemap-changed .title').text(newBasemap.title);          
          jQuery('#basemap-changed').show().delay(3000).fadeOut();
          
      });
    }

  });

  return SKBasemaps;

});


// * * *
// #### External Documentation
// To learn more about the ArcGIS Javascript API methods used to
// create this module we have listed the most commonly used methods
// below:
//
// - <a target="_blank" href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#basemapgallery">Class: BasemapGallery</a>
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
