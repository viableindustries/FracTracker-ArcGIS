/*jslint browser: true*/
/*global $, jQuery, dojo, define, declare:true, console, esri, map:true, shackleton, symbolOptions:true, SKMapResponse:true*/

//
// Enable the user to search for specific addresses or locations on the map
//
define([
    'dojo/_base/declare',
    'esri/dijit/Geocoder'
], function (
    declare
) {

    "use strict";

    //
    // This object is defining options that we will later use to create a symbol
    // on our map. This object contains information on the type and style (e.g., circle),
    // the color, and outline information to place a symbol on our map.
    //
    var symbolOptions = {
            "type": "esriSMS",
            "style": "esriSMSCircle",
            "color": [0, 86, 134, 255],
            "outline": {
                "type": "esriSLS",
                "style": "esriSLSSolid",
                "color": [0, 159, 217, 100],
                "width": 10
            }
        },
        SKSearchAddPoint,
        SKSearchAddress,
        SKSearchGeocoder,
        SKSearchResultPoint,
        thisSymbol,
        thisGraphic;

    //
    // This method enables us to add a point based on the geographic
    // information to our map. It adds the point based on the geopgraphic
    // cooridnates we have passed to.
    //
    SKSearchAddPoint = declare(null, {

        //
        // To pass SKGeolocationAddPoint the proper information we need to create a point,
        // we must first create a ``new esri.geometry.Point(long, lat)`` then we can pass the
        // value returned to ``esri.geometry.geographicToWebMercator()`` finally the value that
        // creates gets passed to our SKGeolocationAddPoint. For an example of how this works
        // see SKGeolocationSuccess::constructor
        //
        constructor: function (thisPoint) {
            thisSymbol = new esri.symbol.SimpleMarkerSymbol(symbolOptions);

            // An actual graphic based on what we've told it to display via the _symbolOptions
            // and placed according to the information we have passed through thisPoint
            thisGraphic = new esri.Graphic(thisPoint, thisSymbol);
            return map.graphics.add(thisGraphic);
        }

    });

    //
    // Listens for when the "search-address" button is clicked. Once it has been clicked
    // it will initialize the rest of the address search functionality.
    //
    SKSearchAddress = declare('shackleton.search', null, {

        constructor: function () {

            SKSearchGeocoder = new esri.dijit.Geocoder({
                map: map,
                autoComplete: true
            }, "search-address-test");

            SKSearchGeocoder.startup();

            dojo.connect(SKSearchGeocoder, 'onSelect', function (results) {

                console.log('Search:onSelect', results);

                // Once the user selects an address from the drop down
                // we need to add a point to the map.
                SKSearchResultPoint = new SKSearchAddPoint(results.feature.geometry);
            });
        }

    });

    return {
        SKSearchAddress: SKSearchAddress
    };

});

// * * *
// #### External Documentation
// To learn more about the ArcGIS Javascript API methods used to
// create this module:
//
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#geocoder" target=_blank">Class: Geocoder</a>

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
