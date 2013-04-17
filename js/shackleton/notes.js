/*jslint browser: true*/
/*global $, jQuery, dojo, define, console, globals, esri, map, SKMapResponse, thisNote:true*/

var featureLayer;

//
// Enable users to add notes to any map and store those notes locally, within their browser's storage
//
define([
   'dojo/_base/declare',
    "esri/dijit/editing/Editor-all",
    "dijit/layout/ContentPane",
    "dijit/layout/BorderContainer",
    "dojo/DeferredList",
    "dijit/form/Button"
], function (
    declare
) {

   //
   // Listens for when the "search-address" button is clicked. Once it has been clicked
   // it will initialize the rest of the address search functionality.
   //
   return declare('shackleton.notes', null, {

		getLayerResource: function (url) {
	        var deferred = esri.request({
	          url: url,
	          content: {
	            f: 'json'
	          },
	          callbackParamName: "callback"
	        });
	        return deferred;
		},
		
		addFeatureLayer: function (featureCollection) {
	        var fields = dojo.map(featureCollection.layerDefinition.fields, function(field) {
	          return field.name;
	        });
	        var featureLayer = new esri.layers.FeatureLayer(featureCollection, {
	          outFields: fields
	        });

	        var selectionSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 20, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 0, 0.5]), 10), new dojo.Color([255, 255, 0, 0.9]));

	        featureLayer.setSelectionSymbol(selectionSymbol);
	        map.addLayers([featureLayer]);
		},

        initEditor: function (results) {
	        var featureLayerInfos = dojo.map(results, function(result) {
	          return {
	            'featureLayer': result.layer
	          };
	        });
	        featureLayer = results[0].layer;
	        var settings = {
	          map: map,
	          layerInfos: featureLayerInfos
	        };

	        var params = {
	          settings: settings
	        };
	        var editorWidget = new esri.dijit.editing.Editor(params, 'editorDiv');
	        editorWidget.startup();
	        map.infoWindow.resize(290, 220);
        },

        saveCollection: function () {
	        //save the edited features to local storage
	        console.log('Edits saved to storage');
	        console.log(featureLayer.toJson());
	        window.localStorage.setItem("storedCollection", dojo.toJson(featureLayer.toJson()));
        },

        constructor: function () {
	        dojo.connect(map, "onLayersAddResult", this.initEditor);

	        if (window.localStorage.getItem("storedCollection")) {
	          console.log('Feature Collection read from storage');
	          this.addFeatureLayer(dojo.fromJson(window.localStorage.getItem("storedCollection")));
	        } else {
			  var mapserverUrl = 'http://services.arcgis.com/jDGuO8tYggdCCnUJ/arcgis/rest/services/notes_template/FeatureServer/0';
	          var deferred = this.getLayerResource(mapserverUrl);

	          deferred.then(function(response) {
	            var featureCollection = {};
	            featureCollection.layerDefinition = response;

	            var fields = dojo.map(featureCollection.layerDefinition.fields, function(field) {
	              return dojo.mixin({
	                editable: true,
	                domain: null
	              }, field);
	            });

	            featureCollection.layerDefinition.fields = fields;

	            window.localStorage.setItem("storedCollection", dojo.toJson(featureCollection));
	            console.log("Feature Collection added to storage");
	            console.log(featureCollection);
	            this.addFeatureLayer(featureCollection);
	          });
	        }
        }

    });

});

// * * *
// #### External Documentation
// To learn more about the ArcGIS Javascript API methods used to
// create this module:
//
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jssamples/#sample/exp_localstorage" target=_blank">Experimental Local Storage</a>
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
