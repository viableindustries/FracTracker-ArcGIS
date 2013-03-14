//
// Enable the user to search for specific addresses or locations on the map
//

var legendLayers = [];

define([ 'dojo/_base/declare', 'esri/dijit/Legend' ], function( declare, esriDijitLegend ) {

   //
   // Listens for when the "search-address" button is clicked. Once it has been clicked
   // it will initialize the rest of the address search functionality.
   //
  var SKLegend = declare('shackleton.legend', null, {
      
    layersBuildList: function (layerObjectList) {
        
        layerObjectList.reverse();

        var items = dojo.map(layerObjectList, function (thisLayer, thisLayerIndex) {

            legendLayers.push({layer: map.getLayer(thisLayer.id), title: thisLayer.title});

        });
    },
    
    constructor: function() {
        
        // Get a list of the layers for our map and
        // build out a legend object to only include
        // the map layers defined in ArcGIS Online
        // and do not show basemap information.
        layers = globals.operationalLayers;
        this.layersBuildList(layers);

        var thisLegend = new esri.dijit.Legend({
          map: map,
          layerInfos:legendLayers
        }, 'legend-content');
        
        console.log(legendLayers);
                
        thisLegend.startup();
        
    }
        
  });

  return {
    SKLegend: SKLegend
  };

});

// * * *
// #### External Documentation
// To learn more about the ArcGIS Javascript API methods used to
// create this module:
//
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#legend" target=_blank">Class: Legend</a>
//
// #### Tasks
//
// - Remove base map data from the legend
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
