define([ 'dojo/_base/declare', 'dijit/_WidgetBase', 'dijit/_TemplatedMixin', 'esri/arcgis/utils'], function(declare, _WidgetBase, _TemplatedMixin, esriArcgisUtils){

  var map = declare('shackleton.map', null, {
    constructor: function ( defaults ) {
      if (typeof esri == 'undefined') {
          console.error('[Shackleton] Could not connect to server');
          return false;
      } else {
        console.log('Shackleton');
      };
      
      /**
       * Define the initial map extent
       *
       * This example uses 5440 Penn Ave Pittsburgh PA 15206
       * as the default map extent
       *
       */
      var initialExtentOptions = {
          "xmin": -79.935073,
          "ymin": 40.464668,
          "xmax": -79.935073,
          "ymax": 40.464668,
          "spatialReference": {
              "wkid": 102100
          }
      };
      var initialExtent = new esri.geometry.Extent(initialExtentOptions);

      /**
       * Define the Maps basic options
       */
      var mapOptions = {
          wrapAround180: true,
          extent: esri.geometry.geographicToWebMercator(initialExtent),
          slider: true,
          sliderStyle: 'default',
          fadeOnZoom: false,
          force3DTransforms: false,
          navigationMode: "css-transforms"
      };

      /**
       * Using the 'esri' object, create the map with it's options
       */
      map = new esri.arcgis.utils.createMap(defaults.webmap, 'map', mapOptions);
    
      /**
       * Resize the map, when the window is resized
       */
      dojo.connect(map, "onLoad", function(map) {
          dojo.connect(window, "resize", map, map.resize);
      });

    }
  });

  return map;
  
});