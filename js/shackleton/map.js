define(['dojo/_base/declare', 'esri/arcgis/utils', 'shackleton/features' ], function(declare, esriArcgisUtils, shackletonFeatures ){

  map = declare('shackleton.map', null, {
    
    constructor: function ( defaults ) {
      
      var mapDeferred = new esri.arcgis.utils.createMap(defaults.webmap, 'map', {
        wrapAround180: true,
        extent: esri.geometry.geographicToWebMercator()
      });

      mapDeferred.then(
        function ( response ) {

          SKEvent = response;        

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

  return {
    map: map
  };

});