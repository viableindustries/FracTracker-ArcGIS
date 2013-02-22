/*jslint browser: true*/
/*global $, jQuery, dojo, define, console, esri, map:true, shackleton, SKMapResponse:true*/

//
// Create the map
//
define([
    'dojo/_base/declare',
    'esri/arcgis/utils',
    'shackleton/features'
], function (
    declare
) {

    var SKMap,
        mapDeferred,
        thisFeatureLoader;

    SKMap = declare('shackleton.map', null, {

        constructor: function (defaults) {

            mapDeferred = new esri.arcgis.utils.createMap(defaults.webmap, 'map', {
                wrapAround180: true,
                extent: esri.geometry.geographicToWebMercator()
            });

            mapDeferred.then(
                function (response) {

                    SKMapResponse = response;

                    defaults.details = response.itemInfo.item;
                    map = response.map;

                    // if (map.loaded) {
                    //     thisFeatureLoader = new shackleton.features();
                    // } else {
                    //     dojo.connect(map, "onLoad", function () {
                    //         thisFeatureLoader = new shackleton.features();
                    //     });
                    // }
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