//
// Enable the user to search for specific addresses or locations on the map
//

define([ 'dojo/_base/declare', 'esri/dijit/Geocoder' ], function( declare, esriDijitGeocoder ) {

   //
   // Listens for when the "search-address" button is clicked. Once it has been clicked
   // it will initialize the rest of the address search functionality.
   //
  var SKSearchAddress = declare('shackleton.search', null, {

    _updateSearchOptions: function ( layerObjectList ) {

      layerObjectList.reverse();

      var items = dojo.map(layerObjectList, function ( thisLayer, thisLayerIndex ) {

        if (thisLayer.url) {
          jQuery("#search-type").append('<option value="' + thisLayer.url + '">' + thisLayer.title + '</option>');
        }

      });

      return items;

    },

    constructor: function() {

        var thisGeocoder = new esri.dijit.Geocoder({
          map: map,
          autoComplete: true
        }, "search-address-test");

        thisGeocoder.startup();

        layers = defaults.operationalLayers;
        this._updateSearchOptions(layers);

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
