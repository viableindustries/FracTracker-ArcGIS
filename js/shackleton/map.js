
/*jslint browser: true*/
/*global $, jQuery, dojo, define, console, esri, map:true, shackleton, SKMapResponse:true*/

//
// Create the map
//
define([
    'dojo/_base/declare',
    'esri/arcgis/utils',
    'shackleton/features',
    'esri/layers/FeatureLayer'
], function (
    declare
) {

    var mapDeferred,
        thisFeatureLoader;

    map = declare('shackleton.map', null, {

        constructor: function (globals) {

            mapDeferred = new esri.arcgis.utils.createMap(globals.webmap, 'map', {
                wrapAround180: true,
                extent: esri.geometry.geographicToWebMercator()
            });

            mapDeferred.then(
                function (response) {
            
                    SKMapResponse = response;
            
                    globals.details = response.itemInfo.item;
                    map = response.map;
                    
                    dojo.forEach(SKMapResponse.itemInfo.itemData.operationalLayers, function (thisLayer, i) {
                        
                        var thisNewLayer = new esri.layers.FeatureLayer(thisLayer.url, {
                            mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
                            outFields: ["*"]
                        });
                        
                        map.addLayer(thisNewLayer);
                        //console.log(thisNewLayer.url, " added");
                            
                    });
            
                    if (map.loaded) {
                        thisFeatureLoader = new shackleton.features();
                    } else {
                        dojo.connect(map, "onLoad", function () {
                            thisFeatureLoader = new shackleton.features();
                        });
                    }
            
                },
                function (error) {
                    console.log("Map creation failed: ", dojo.toJson(error));
                }
            );

        }
    });

    return {
        map: map
    };

});