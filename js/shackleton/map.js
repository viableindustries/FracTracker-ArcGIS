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
      extent: esri.geometry.geographicToWebMercator(this._extent),
      sliderStyle: "large"
    },

    constructor: function ( defaults ) {

      mapDeferred = new esri.arcgis.utils.createMap(defaults.webmap, 'map', this._options);

      mapDeferred.then( function ( response ) {

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

      },function(error){
        console.log("Map creation failed: ", dojo.toJson(error));        
      });

    }

  });

  return map;

});