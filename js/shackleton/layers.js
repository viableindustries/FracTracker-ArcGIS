//
// Enable the user to search for specific addresses or locations on the map
//

var visible = [];

define([ 'dojo/_base/declare', 'esri/dijit/Legend' ], function( declare, esriDijitLegend ) {
  
    var SKLayersAddToList = declare(null, {
      
      constructor: function (layers) {

        /* Overlay: Toggle the visibility of the map overlays
        ======================================================= */
        $('.overlay-button').bind('click', function () {
          $('#overlay').toggle();
        });

        var layerList = layersBuildListVisible(layers);
    
        if (layerList.length > 0) {
      
          //create a menu of layers
          layerList.reverse();
          var menu = new dijit.Menu({
            id: 'overlay-content-menu'
          });
      
          //console.log(layerList);
      
          dojo.forEach(layerList, function (layer) {
            menu.addChild(new dijit.CheckedMenuItem({
            // var menu = new dijit.CheckedMenuItem({
              label: layer.title,
              checked: layer.visible,
              onChange: function () {
                if (layer.layer.featureCollection) {
                  //turn off all the layers in the feature collection even
                  //though only the  main layer is listed in the layer list 
                  dojo.forEach(layer.layer.featureCollection.layers, function (layer) {
                    layer.layerObject.setVisibility(!layer.layerObject.visible);
                  });
                } else {
                  layer.layer.setVisibility(!layer.layer.visible);
                }

              }
            }, dojo.byId('overlay-content-div')));
          });


          // var button = new dijit.form.DropDownButton({
          //   label: i18n.tools.layers.label,
          //   id: "layerBtn",
          //   iconClass: "esriLayerIcon",
          //   title: i18n.tools.layers.title,
          //   dropDown: menu
          // });
          // 
          dojo.byId('overlay-content').appendChild(menu.domNode);
        }
      }
  
    });
  
    var SKLayersBuildListOfVisible = declare(null, {
    
    constructor: function (layers) {
      var layerInfos = [];
      dojo.forEach(layers, function (mapLayer, index) {
        if (mapLayer.featureCollection && !mapLayer.layerObject) {
          if (mapLayer.featureCollection.layers) {
            //add the first layer in the layer collection... not all  - when we turn off the layers we'll 
            //turn them all off 
            if (mapLayer.featureCollection.layers) {
              layerInfos.push({
                "layer": mapLayer,
                "visible": mapLayer.visibility,
                "title": mapLayer.title
              });
            }
          }
        } else if (mapLayer.layerObject) {
          layerInfos.push({
            layer: mapLayer.layerObject,
            visible: mapLayer.layerObject.visible,
            title: mapLayer.title
          });
        }
      });
      return layerInfos;
    }
  });


  var SKLayersBuildList = declare(null, {
    
    constructor: function (layers) {
      var layerInfos = [];
      dojo.forEach(layers, function (mapLayer, index) {
        if (mapLayer.featureCollection && !mapLayer.layerObject) {
          if (mapLayer.featureCollection.layers && mapLayer.featureCollection.showLegend) {
            if (mapLayer.featureCollection.layers.length === 1) {
              layerInfos.push({
                "layer": mapLayer.featureCollection.layers[0].layerObject,
                "title": mapLayer.title
              });
            } else {
              dojo.forEach(mapLayer.featureCollection.layers, function (layer) {
                layerInfos.push({
                  layer: layer.layerObject,
                  title: mapLayer.title
                });
              });
            }

          }
        } else if (mapLayer.layerObject) {
          layerInfos.push({
            layer: mapLayer.layerObject,
            title: mapLayer.title
          });
        }
      });
      return layerInfos;
    }
    
  });


  var SKLayersVisibility = declare(null, {
    
    constructor: function () {
      
      var inputs = dojo.query('.list-item'), input;
      
      for (var i = 0, il = inputs.length; i < il; i++) {
        if (inputs[i].checked) {
          visible.push(inputs[i].id);
        }
      }
      
      if(visible.length === 0){
        visible.push(-1);
      }
  
      layer.setVisibleLayers(visible);
    }
    
  });

   //
   // Listens for when the "search-address" button is clicked. Once it has been clicked
   // it will initialize the rest of the address search functionality.
   //
  var SKLayers = declare('shackleton.legend', null, {
    
    constructor: function() {

        
        
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


