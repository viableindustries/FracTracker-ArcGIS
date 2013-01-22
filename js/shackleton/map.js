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

define([ 'dojo/_base/declare', 'esri/arcgis/utils', 'esri/dijit/Scalebar', 'shackleton/scalebar' ], function( declare, esriArcgisUtils, esriDijitScalebar ){

  var map = declare('shackleton.map', null, {

    _extentOptions: {
      "xmin": -79.935073,
      "ymin": 40.464668,
      "xmax": -79.935073,
      "ymax": 40.464668,
      "spatialReference": {
          "wkid": 102100
      }
    },

    _extent: new esri.geometry.Extent(this._extentOptions),

    _options: {
      wrapAround180: true,
      extent: esri.geometry.geographicToWebMercator(this._extent)
    },
        
    constructor: function ( defaults ) {

      var mapDeferred = new esri.arcgis.utils.createMap(defaults.webmap, 'map', this._options);

      mapDeferred.then(
        function ( response ) {
                    
          defaults.details = response.itemInfo.item;
          map = response.map;
          
          if (map.loaded) {
            var thisScalebar = new shackleton.scalebar( map );
            document.getElementById('progress').style.display = 'none';
          }
          else {
            dojo.connect(map, "onLoad", function() {
              var thisScalebar = new shackleton.scalebar( map );
              dojo.connect(window, "resize", map, map.resize);
              document.getElementById('progress').style.display = 'none';
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