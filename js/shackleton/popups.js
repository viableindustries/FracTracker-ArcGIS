/*jslint browser: true*/
/*global $, jQuery, dojo, define, console, esri, map, SKMapResponse*/

//
// CURRENTLY NOT USED
//

//
// Enable the system to enable and disable popups when other events in the
// system require that the click events be tied to a different function. For
// example, the measurement tools need to disable popups when being used.
//
define([
    'dojo/_base/declare',
    'esri/dijit/Popup'
], function (
    declare,
    esriDijitPopup
) {

    var SKPopups;

    SKPopups = declare('shackleton.popups', null, {

        constructor: function (type) {

            switch(type) {
                case 'enable':
                    if (SKMapResponse.clickEventListener) {
                        SKMapResponse.clickEventHandle = dojo.connect(map, 'onClick', SKMapResponse.clickEventListener);
                    }
                    break;
                case 'disable':
                    if (SKMapResponse.clickEventHandle) {
                        dojo.disconnect(SKMapResponse.clickEventHandle);
                    }
                    break;
            }

        }

    });

    return {
        SKPopups: SKPopups
    };

});

// * * *
// #### External Documentation
// To learn more about the ArcGIS Javascript API methods used to
// create this module:
//
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/" target=_blank">Classes</a>

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


