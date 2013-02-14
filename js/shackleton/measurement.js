/*jslint browser: true*/
/*global $, jQuery, dojo, define, console, esri, map, SKMapResponse*/

//
// Enable the user to draw shape(s) on the map and retrieve useful area and distance
// information regarding their drawn shape(s).
//
define([
    'dojo/_base/declare',
    'esri/dijit/Measurement'
], function (
    declare
) {

    "use strict";

    var SKMeasurement,
        thisMeasurementTools;

   //
   // Listens for when the "search-address" button is clicked. Once it has been clicked
   // it will initialize the rest of the address search functionality.
   //
    SKMeasurement = declare('shackleton.measurement', null, {

        constructor: function (thisMeasurementContainer) {

            thisMeasurementTools = new esri.dijit.Measurement({
                map: map
            }, thisMeasurementContainer);

            thisMeasurementTools.startup();

            this.popupHandler();

            dojo.connect(thisMeasurementTools, "onMeasureEnd", function (activeTool) {
                // Disable the active tool
                this.setTool(activeTool, false);

                // Enable Popups
                if (SKMapResponse.clickEventListener) {
                    SKMapResponse.clickEventHandle = dojo.connect(map, 'onClick', SKMapResponse.clickEventListener);
                }
            });
        },

        popupHandler: function () {

            jQuery('.esriMeasurement .esriButton').bind('click', function () {
                // Disable Popups
                if (SKMapResponse.clickEventHandle) {
                    dojo.disconnect(SKMapResponse.clickEventHandle);
                }
                jQuery('.esriToggleButton .dijitButtonNode').addClass('btn btn-success');
                jQuery('.dijitArrowButtonChar').text('').addClass('caret');
                jQuery('.dijitMenu').addClass('dropdown-menu');
            });

        }

    });

    return {
        SKMeasurement: SKMeasurement
    };

});


// * * *
// #### External Documentation
// To learn more about the ArcGIS Javascript API methods used to
// create this module:
//
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#measurement" target=_blank">Class: Measurement</a>

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
