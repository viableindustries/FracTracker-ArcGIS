/**
 * Developed Simple ArcGIS Web Application (c) 2013
 *
 *
 * This application was built by the folks at Viable for
 * use by it's clients. Any code herein is property of Developed
 * Simple unless where otherwise noted property of ESRI.
 *
 * To find out how you can use this software or have your
 * own version of this software built to fit your custom
 * needs, contact us by visiting www.developedsimple.com.
 *
 */
 
define(['dojo/_base/declare', 'esri/dijit/BasemapGallery' ], function(declare, esriDijitBasemap ){

  var basemaps = declare('shackleton.basemaps', null, {

    constructor: function () {

      var basemapsGallery = new esri.dijit.BasemapGallery({
        showArcGISBasemaps: true,
        map: map
      }, 'basemaps-gallery');

      basemapsGallery.startup();
    }

  });

  return basemaps;

});