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

define(['dojo/_base/declare', 'esri/arcgis/utils', 'shackleton/features' ], function(declare, esriArcgisUtils, shackletonFeatures ){

  map = declare('shackleton.map', null, {

    _options: {
      wrapAround180: true,
      extent: esri.geometry.geographicToWebMercator()
    },
    
    constructor: function ( defaults ) {
      
      var mapDeferred = new esri.arcgis.utils.createMap(defaults.webmap, 'map', this._options);

      mapDeferred.then(
        function ( response ) {

          defaults.details = response.itemInfo.item;
          map = response.map;
            
          if (map.loaded) {
            var thisFeatureLoader = new shackleton.features();
          }
          else {
            dojo.connect(map, "onLoad", function() {
              var thisFeatureLoader = new shackleton.features();
            });      
          } 
          
       },
        function ( error ) {
          console.log("Map creation failed: ", dojo.toJson(error));        
        }
      );
          
    }

  });

  return map;

});