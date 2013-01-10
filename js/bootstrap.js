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
 
dojo.require('shackleton.map');

var __init__ = function () {
  
  /**
   * Check for ArcGIS Online Server Availibility
   *
   * Make sure we have loaded our classes/libraries
   * properly and that we have access to the Esri
   * mapping object and associated functions.
   *
   */
  if (typeof esri == 'undefined') {
      console.error('[Map] Could not connect to server');
      return false;
  };
  
  var defaults = {
    
    /**
     * Webmap
     *
     * The Webmap ID of the map we want to load from our
     * ArcGIS Online Organization account.
     */
    webmap: '4e21676b1c00414ba14edf654c7f7fe3'
    
  };
  
  var map = new shackleton.map(defaults);
  
  console.log('Bootstrap complete');
        
};

dojo.ready(__init__);