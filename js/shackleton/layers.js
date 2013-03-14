/*jslint browser: true*/
/*global $, jQuery, dojo, define, console, globals, esri, layers:true, map, SKMapResponse*/

//
// Enable the user to search for specific addresses or locations on the map
//
var visible = [];

define([
    'dojo/_base/declare',
    'esri/layers/FeatureLayer'
], function (
    declare
) {

    var SKLayers,
        SKLayersChangeVisibility;

    // For hiding and showing layers we simply use the .hide() and .show() operations for the Layer Class
    // in ArcGIS Online's Javascript API.

    SKLayersChangeVisibility = declare(null, {

        constructor: function (layerID) {

            var thisLayerObject = map.getLayer(layerID);

            if (thisLayerObject.visible === false) {
                thisLayerObject.show();
            } else {
                thisLayerObject.hide();
            }

        }

    });

    SKLayers = declare('shackleton.layers', null, {

        layersBuildList: function (layerObjectList, thisLayerContainer) {

            layerObjectList.reverse();

            var items = dojo.map(layerObjectList, function (thisLayer, thisLayerIndex) {

                if (thisLayer.visibility) {
                    visible.push(thisLayer.id);
                }
                                
                return '<label for="' + thisLayer.id + '" class="checkbox"><input type="checkbox" class="layer-item" data-layer="layer_index_' + thisLayerIndex + '" id="' + thisLayer.id + '"' + (thisLayer.visibility ? 'checked="checked"' : '') + ' value="1" /> ' + thisLayer.title + '</label>';

            });

            dojo.byId(thisLayerContainer).innerHTML = items.join('');

        },

        constructor: function (thisLayerContainer) {

            layers = globals.operationalLayers;

            this.layersBuildList(layers, thisLayerContainer);

            jQuery('.layer-item').bind('click', function () {
                SKLayersChangeVisibility(jQuery(this).attr('id'));
            });

        }

    });

    return {
        SKLayers: SKLayers
    };

});

// * * *
// #### External Documentation
// To learn more about the ArcGIS Javascript API methods used to
// create this module:
//
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#Layer" target=_blank">Class: Layer</a>
//
// Example:
//
//    The ID of the layer I want to take action on
//    var thisLayerID = "PA_HUC08_clip_296";
//
//    The action I want to perform on a specific layer
//    map.getLayer(thisLayerID).hide() 
//
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#Map/getLayer" target="_blank">getLayer(id)</a>
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#Layer/show" target="_blank">show()</a>
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#Layer/hide" target="_blank">hide()</a>
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jssamples/fl_ondemand.html" target="_blank">Feature layer in "On Demand Mode"</a>
//
// * * *
// #### Task List
//
// Cannot "use strict" within this module, causes a "not_defined" Reference Error.
// We should look into what causes this in the future.
//
//"use strict";
//
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


