//
// Initialize our application and get things moving
//

// Make sure that we have ``declare`` and the ``BasemapGallery``
define([
    'dojo/_base/declare'
], function (
    declare
) {

    var SKApplication = declare('shackleton.application', null, {

        constructor: function () {
            console.log('Application has been loaded');
        }

    });

    return SKApplication;
})();

// * * *
//     Shackleton 0.1.02
//
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