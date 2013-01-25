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
var defaults = {}, requestHandle;

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
  
try {
  /**
   * Check to see what parameters exist in the URL
   *
   * Make sure that we are capable of loading an application
   * from ArcGIS Online. In order to do so we need either an
   * appid or Application Idenitification Key, or we need
   * a straight Webmap Identification Key.
   *
   */
  defaults.query = esri.urlToObject(document.location.href).query;


  /**
   * Check to see how we should load our map
   *
   * If a WebMap ID is available through the URL object, then
   * we should just go ahead and load the map.
   *
   */
  if ( defaults.query.webmap ) {
    defaults.webmap = defaults.query.webmap;
    var map = new shackleton.map(defaults);
  };
  
  /**
   * Check to see how we should load our map
   *
   * If an Application ID is available through the URL object, then
   * we should use the Application ID or appid and load the WebMap ID
   * through the ArcGIS Online Content/Data API to find out the rest 
   * of the information about our Web Map.
   *
   */
  if ( defaults.query.appid ) {
    requestHandle = esri.request({
        url: esri.arcgis.utils.arcgisUrl + "/" + defaults.query.appid + "/data",
        content: {
            f: "json"
         },
        callbackParamName: "callback",
        load: function ( response ) {
          for ( var key in response.values ) {
            defaults[key] = response.values[key];          
          }
          var map = new shackleton.map(defaults);
        },
        error: function ( error ) {
          var _UIElements = "#progress";
    
          console.error(error.message);
          jQuery(_UIElements).toggle();
        }
    });
  };
      
      
} catch (e) {

  /**
   * Check to see if we have any query parameters in our URL
   *
   * If we don't have anything (e.g., Web Map ID, Application ID)
   * then there is no point in continuing, we should just stop
   * everything and let the user know something is wrong.
   *
   */
  var _UIElements = "#progress";
    
  console.log('stop the presses', e);
  jQuery(_UIElements).toggle();

}

        
};

dojo.ready(__init__);