/**
 * Developed Simple ArcGIS Web Application (c) 2013
 *
 *
 * This application was built by the folks at Viable for
 * use by it's clients. Any code herein is property of Developed
 * Simple unless where otherwise noted property of ESRI.
 *
 * To find out how you can use this software or have your
 * own version of this software built to fit your custom
 * needs, contact us by visiting www.developedsimple.com.
 *
 */

/**
 * Each of our individual features (e.g., legend, layers, meta information, scalebar, search)
 * is declare and instantiated in this "Features Loader" file.
 *
 * To add a new feature module to the map:
 *
 *   1. Add a new file and it's associated code in a new file, like "js/shackleton/scalebar.js"
 *   2. Include the file in the declare statement below (e.g., 'shackleton/scalebar')
 *   3. Add the approriate parameter to the function (e.g., shackletonScalebar)
 *   4. In the constructor of the Feature Loader, instantiate the new Module (e.g.,  var thisScalebar = new shackleton.scalebar( thisMap );)
 *
 */

define([ 'dojo/_base/declare', 'shackleton/scalebar', 'shackleton/meta' ], function( declare, shackletonScalebar, shackletonMeta ) {

  var features = declare('shackleton.features', null, {
    
    /**
     * If you would like to initially hide a feature, simply place it's ID in this list
     */
    _UIElements: "#progress,#toolbox,#logo",
      
    constructor: function ( thisMap, thisDefaults ) {
      
      /**
       * Add new mapping functionality via the ArcGIS Online Javascript API,
       * functionality like Scalebars, Meta Information, Legends, etc.
       *
       * @see http://help.arcgis.com/en/webapi/javascript/arcgis/jssamples/
       *   For a list of more functionality available through to this web map
       *   application on ArcGIS.com.
       *
       */
      var thisScalebar = new shackleton.scalebar( thisMap );
      var thisMeta = new shackleton.meta( thisDefaults );
      
      /**
       * Make sure that the map resizes properly when the map is loaded on
       * various devices (e.g., desktop, tablet, smartphone) or when the
       * browser window is resized.
       *
       */
      dojo.connect(window, "resize", map, map.resize);
      
      /**
       * Hide the progress bar since the map is now loaded.
       *
       */
      jQuery(this._UIElements).toggle();
      
    }
    
  });

  return features;
  
});