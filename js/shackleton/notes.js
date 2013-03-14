/*jslint browser: true*/
/*global $, jQuery, dojo, define, console, globals, esri, map, SKMapResponse, thisNote:true*/

//
// Enable users to add notes to any map and store those notes locally, within their browser's storage
//

var notesCollection = {}, noteLayers = [];

define([
    'dojo/_base/declare',
    'esri/dijit/editing/Editor-all',
    'dojo/DeferredList',
    'dijit/form/Button'
], function (
    declare
) {

    var SKNotes,
        thisNote;

   //
   // Listens for when the "search-address" button is clicked. Once it has been clicked
   // it will initialize the rest of the address search functionality.
   //
    SKNotes = declare('shackleton.notes', null, {

        getLayerResource: function (thisURL) {

            var deferred = esri.request({
                url: thisURL,
                content: {
                    f: 'json'
                },
                callbackParamName: "callback"
            });

            return deferred;
        },

        addLayer: function (thisCollection) {

            var fields = dojo.map(thisCollection.layerDefinition.fields, function (field) {
                return field.name;
            });

            var featureLayer = new esri.layers.FeatureLayer(thisCollection, {
                outFields: fields
            });

            var selectionSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 20, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 0, 0.5]), 10), new dojo.Color([255, 255, 0, 0.9]));

            featureLayer.setSelectionSymbol(selectionSymbol);
            map.addLayers([featureLayer]);

        },

        layersBuildList: function (layerObjectList) {

            layerObjectList.reverse();

            var items = dojo.map(layerObjectList, function (thisLayer, thisLayerIndex) {

                noteLayers.push({layer: map.getLayer(thisLayer.id), title: thisLayer.title});

            });
        },
        
        grrr: function () {
            console.log('grrr');
        },

        buildNoteEditor: function (SKNotesContainer) {

            console.log('build editor');

            // layers = globals.operationalLayers;
            // this.layersBuildList(layers);
            // 
            // var settings = {
            //     map: map,
            //     layerInfos: noteLayers
            // };
            // 
            // var params = {
            //     settings: settings
            // };
            // 
            // var editorWidget = new esri.dijit.editing.Editor(params, SKNotesContainer);
            // editorWidget.startup();
            // map.infoWindow.resize(290, 220);

        },

        // saveNote: function () {
        //     //save the edited features to local storage
        //     console.log('Edits saved to storage');
        //     console.log(featureLayer.toJson());
        //     window.localStorage.setItem("myFracMapperNotes", dojo.toJson(featureLayer.toJson()));
        // },

        // The feature service we are loading that contains the information necessary to collect
        // notes in the users browser storage:
        //
        // http://services.arcgis.com/jDGuO8tYggdCCnUJ/arcgis/rest/services/Note_Templates/FeatureServer/0

        constructor: function (SKNotesContainer) {

            console.log('Begin notes');

            var notesFeatureURL = 'http://services.arcgis.com/jDGuO8tYggdCCnUJ/arcgis/rest/services/Note_Templates/FeatureServer/0';
            var deferredNotes = this.getLayerResource(notesFeatureURL);

            this.grrr();

            this.buildNoteEditor(SKNotesContainer);

            console.log(notesFeatureURL, deferredNotes);

            deferredNotes.then(function (response) {
                notesCollection.layerDefinition = response;

                console.log('deferred', notesCollection.layerDefinition);

                var noteFields = dojo.map(notesCollection.layerDefinition.fields, function (thisField) {
                    return dojo.mixin({
                        editable: true,
                        domain: null
                    }, thisField);
                });

                console.log('fields', noteFields);
                
                notesCollection.layerDefinition.fields = noteFields;

                window.localStorage.setItem("myFracMapperNotes", dojo.toJson(notesCollection));
                console.log("Notes added to storage");
                console.log(notesCollection);
                this.addLayer(notesCollection);
            });

        }

    });

    return {
        SKNotes: SKNotes
    };

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
