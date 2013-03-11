/*jslint browser: true*/
/*global $, jQuery, dojo, define, console, defaults, esri, map, SKMapResponse, thisNote:true*/

//
// Enable users to add notes to any map and store those notes locally, within their browser's storage
//

define([
    'dojo/_base/declare',
    'esri/dijit/Legend'
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
        
        // The feature service we are loading that contains the information necessary to collect
        // notes in the users browser storage:
        //
        // http://services.arcgis.com/jDGuO8tYggdCCnUJ/arcgis/rest/services/Note_Templates/FeatureServer/0

        constructor: function () {
            thisNote = '';
            console.log('shackleton.notes load complete');
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
