//
// Adds all of our modules to the map. By adding them here, there is no need to add them
// in the init and map files, because those files are more touchy.
//
define([
  'dojo/_base/declare',
  'shackleton/scalebar',
  'shackleton/meta',
  'shackleton/basemaps',
  'shackleton/geolocation',
  'shackleton/search',
  'shackleton/legend',
  'shackleton/layers',
  'shackleton/print',
  'shackleton/embed'
], function(
  declare,
  shackletonScalebar,
  shackletonMeta,
  shackletonBasemaps,
  shackletonGeolocation,
  shackletonSearch,
  shackletonLegend,
  shackletonLayers,
  shackletonPrint,
  shackletonEmbed
) {

  var _UIElements = "#progress,#toolbox,#logo";

  var SKFeatures = declare('shackleton.features', null, {
    
    /**
     // If you would like to initially hide a feature, simply place it's ID in this list
     */      
    constructor: function () {
      
      //
      // Add new mapping functionality via the ArcGIS Online Javascript API,
      // functionality like Scalebars, Meta Information, Legends, etc.
      // @see http://help.arcgis.com/en/webapi/javascript/arcgis/jssamples/
      //   For a list of more functionality available through to this web map
      //   application on ArcGIS.com.
      //
      try {
        var thisScalebar = new shackleton.scalebar();        
      } catch (error) {
        console.error(error);
      }

      try {
        var thisMeta = new shackleton.meta();       
      } catch (error) {
        console.error(error);
      }

      try {
        var thisBasemaps = new shackleton.basemaps();       
      } catch (error) {
        console.error(error);
      }

      try {
        var thisGeolocation = new shackleton.geolocation();        
      } catch (error) {
        console.error(error);
      }

      try {
        var thisSearch = new shackleton.search();        
      } catch (error) {
        console.error(error);
      }

      try {
        var thisLegend = new shackleton.legend();
      } catch (error) {
        console.error(error);
      }

      try {
        var thisLayers = new shackleton.layers();
      } catch (error) {
        console.error('shackleton.layers', error.message);
      }

      try {
        var thisPrint = new shackleton.print();
      } catch (error) {
        console.error('shackleton.print', error.message);
      }

      try {
        var thisEmbed = new shackleton.embed();
      } catch (error) {
        console.error('shackleton.embed', error.message);
      }

            
      //
      // Make sure that the map resizes properly when the map is loaded on
      // various devices (e.g., desktop, tablet, smartphone) or when the
      // browser window is resized.
      //
      dojo.connect(window, "resize", map, map.resize);
      
      // Hide the progress bar since the map is now loaded.
      jQuery(_UIElements).toggle();
      
      // Makes any ``id="toolbox"`` that has a ``class="draggable"`` into a
      // draggable element, so that the user can position wherever they like.
      jQuery( ".draggable" ).draggable({
        handle: 'h3'
      });
      

      // Toggle all of our various toolboxes (i.e., Legend, Layers, Notes)
      jQuery('.toolbox-toggle').click(function() {
        
        thisToggle = jQuery(this).attr('data-target');
        
        jQuery(thisToggle).toggle();
        
        return false;
                
      });
      
    }
    
  });

  return {
    SKFeatures: SKFeatures
  };
  
});



//
// Each of our individual features (e.g., legend, layers, meta information, scalebar, search)
// is declare and instantiated in this "Features Loader" file.
// 
// To add a new feature module to the map:
//
//   1. Add a new file and it's associated code in a new file, like "js/shackleton/scalebar.js"
//   2. Include the file in the declare statement below (e.g., 'shackleton/scalebar')
//   3. Add the approriate parameter to the function (e.g., shackletonScalebar)
//   4. In the constructor of the Feature Loader, instantiate the new Module (e.g.,  var thisScalebar = new shackleton.scalebar( thisMap );)
//
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
