//
// Enable the user to search for specific addresses or locations on the map
//
var singleLayer, visible = [];

define([ 'dojo/_base/declare', 'dijit/dijit', "dijit/Menu", "dijit/MenuItem", "dijit/CheckedMenuItem", "dijit/MenuSeparator", "dijit/PopupMenuItem" ], function( declare, Menu, MenuItem, CheckedMenuItem, MenuSeparator, PopupMenuItem ) {

  var SKLayersBuildList = declare(null, {

    constructor: function ( layer ) {
      
      layer.reverse();
      
      var items = dojo.map(layer, function ( thisLayer, index ) {
        
        if ( thisLayer.visibility ) {
          visible.push( thisLayer.id );
        };
        
        return '<label for="' + thisLayer.id + '" class="checkbox"><input type="checkbox" class="layer-item" data-layer="' + index + '" id="' + thisLayer.id + '"' + (thisLayer.visibility ? 'checked="checked"': '') + ' /> ' + thisLayer.title + '</label>';
      
      });
      
      dojo.byId("layers-content").innerHTML = items.join('');

      
    }

  });

  var SKUpdateLayerVisibility = declare(null, {

    constructor: function ( layerItemId ) {
      
      var thisLayerItemId = '#' + layerItemId.srcElement.id;
      
      var thisLayerId = jQuery(thisLayerItemId).data('layer');
      
      if (layerItemId.toElement.checked == true) {

        console.log(thisLayerId);
        jQuery(thisLayerItemId + '_layer').css('display','block');
        
        layers[thisLayerId].visibility = true;
 
      } else if (layerItemId.toElement.checked == false) {
 
        console.log(thisLayerId);
        jQuery(thisLayerItemId + '_layer').css('display','none');
        
        layers[thisLayerId].visibility = false;
         
      };
      
      
            //       
            //       
            // //thisElement = 'jQuery("#' + layerItemId.srcElement.id + '_layer").toggle();';
            // thisElement = 'svg g#' + layerItemId.srcElement.id + '_layer';            
            // 
            // //console.log(thisElement);
            // 
      // var inputs = dojo.query(".layer-item"), input;
      // 
      // visible = [];
      // 
      // dojo.forEach(inputs, function( input ){
      //   if (input.checked) {
      //       visible.push(input.id);
      //   }
      // });
      // 
      // console.log('The visible layers list after update', visible);
      
    }

  });
    
  var SKLayers = declare('shackleton.layers', null, {
                    
    constructor: function() {
      
      layers = defaults.operationalLayers;
      
      dojo.forEach(layers, function ( thisLayer, index ) {
        if (thisLayer.url) {
          singleLayer[index] = new esri.layers.ArcGISDynamicMapServiceLayer(thisLayer.url);
        }
      });
      
      SKLayersBuildList( layers );
      
      console.log(layers);
                  
      jQuery('.layer-item').click(SKUpdateLayerVisibility);

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
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#legend" target=_blank">Class: Legend</a>

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


