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

define([ 'dojo/_base/declare' ], function( declare ) {
  
  /**
   * Defines Symbol Options for later use
   *
   * This object is defining options that we will later use to create a symbol
   * on our map. This object contains information on the type and style (e.g., circle),
   * the color, and outline information to place a symbol on our map.
   *
   * @see Class: SimpleMarkerSymbol
   *   http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#SimpleMarkerSymbol
   *
   * @see Class: SimpleMarkerSymbol::parameters
   *   http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#SimpleMarkerSymbol/SimpleMarkerSymbolConst3
   *
   */
  var _symbolOptions = {
    "type": "esriSMS",
    "style": "esriSMSCircle",
    "color": [0,86,134,255],
    "outline": {
      "type": "esriSLS",
      "style": "esriSLSSolid",
      "color": [0,159,217,100],
      "width": 10
    }
  };
  
  
  /**
   * Implements SKGeolocationAddPoint
   *
   * This method enables us to add a point based on the geographic
   * information to our map. It adds the point based on the geopgraphic
   * cooridnates we have passed to.
   *
   * @param thisPoint
   *   To pass SKGeolocationAddPoint the proper information we need to create a point,
   *   we must first create a 'new esri.geometry.Point(long, lat)' then we can pass the
   *   value returned to 'esri.geometry.geographicToWebMercator()' finally the value that
   *   creates gets passed to our SKGeolocationAddPoint. For an example of how this works
   *   see SKGeolocationSuccess::constructor
   *
   * @return map.graphics.add
   *   An actual graphic based on what we've told it to display via the _symbolOptions
   *   and placed according to the information we have passed through thisPoint
   *
   * @see Class: SimpleMarkerSymbol
   *   http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#simplemarkersymbol
   *
   * @see Class: Graphic
   *   http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#graphic
   *
   * @see Class: Map::graphics
   *   http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#Map/graphics
   *
   */
  var SKGeolocationAddPoint = declare(null, {
    
    constructor: function ( thisPoint ) {
      var thisSymbol = new esri.symbol.SimpleMarkerSymbol( _symbolOptions );      
      thisGraphic = new esri.Graphic( thisPoint, thisSymbol );
      return map.graphics.add( thisGraphic );
    }

  });

  /**
   * Implements SKGeolocationSuccess
   *
   * This method enables us to take location information that we have previously
   * collected through HTML5 methods and create an ArcGIS ready Web Mercator based
   * geolocation so that we can add a point to our map using those coordinates.
   *
   * @param location
   *   The location parameter being passed is the coming from the HTML5 
   *
   * @return map.centerAndZoom
   *   Take the collected location information, pass it through the ArcGIS
   *   geocoding system and then return a map symbol, finally center
   *   the map on our newly created symbol and zoom in so that we can get
   *   a close up view of where our browser thinks we are.
   *
   * @see Geolocation API Specification Level 2: Geolocation Interface
   *   http://dev.w3.org/geo/api/spec-source-v2#geolocation_interface
   *
   * @see Class: Geometry
   *   http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#geometry
   *
   * @see Class: Point
   *   http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#point
   *
   * @see Class: namespace_geometry
   *   http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#namespace_geometry/esri.geometry.geographicToWebMercator
   *
   * @see Class: Map::centerAndZoom
   *   http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#Map/centerAndZoom
   *
   */
  var SKGeolocationSuccess = declare(null, {
    
    constructor: function ( location ) {
      var geolocationCurrent = new esri.geometry.Point(location.coords.longitude, location.coords.latitude);
      var geolocationPoint = esri.geometry.geographicToWebMercator(geolocationCurrent);
  
      SKGeolocationAddPoint( geolocationPoint );

      return map.centerAndZoom( geolocationPoint, 16 );
    }

  });

  /**
   * Implements SKGeolocationError
   *
   * Handles any errors that we may come up against so that our application
   * doesn't crash and gives useful troubleshooting information to the developer.
   *
   * @todo
   *   Would be helpful to have better error handling, something that not only gives
   *   useful information to the developer, but also gives useful, on-screen information
   *   to the person using the application. Perhaps telling them: "The map you are looking
   *   for either wasn't found or couldn't be loaded right now. Why not check out our library
   *   of other informative maps at http://www.fractracker.org/maps/"
   *
   * @see Geolocation API Specification Level 2: Geolocation Interface
   *   http://dev.w3.org/geo/api/spec-source-v2#geolocation_interface
   *
   */
  var SKGeolocationError = declare(null, {
    
    constructor: function () {
      if ( navigator.geolocation ) {
       navigator.geolocation.clearWatch(locationWatchIdentifier);
      };

      switch (error.code) {
       case error.PERMISSION_DENIED:
         console.log("[ERROR] Core.Location: A location was not provided");
         break;
       case error.POSITION_UNAVAILABLE:
         console.log("[ERROR] Core.Location: A location was not available");
         break;
       case error.TIMEOUT:
         console.log("[ERROR] Core.Location: Timeout");
         break;
       default:
         console.log("[ERROR] Core.Location: An unknown error occured");
         break;
      };
    }

  });
  
  /**
   * Implements SKGeolocationInitialize
   *
   * Checks the users browser for the existence of the HTML5 Geolocation API,
   * based on the response it will either put a symbol on the map or it will display
   * useful developer error information.
   *
   * @todo
   *   Read up on the necessity of the watchPosition method from the HTML5 Geolocation API
   *   and if it is necessary or important the proper operation of the Geolocatio API, then
   *   we should figure out a way to make this Geolocation module only display one sybmol
   *   and not place a duplicate symbol on the map.
   *
   * @see Geolocation API Specification Level 2: Geolocation Interface
   *   http://dev.w3.org/geo/api/spec-source-v2#geolocation_interface
   *
   */  
  var SKGeolocationInitialize = declare(null, {
    constructor: function() {
      if (navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(SKGeolocationSuccess, SKGeolocationError);
        
        /**
         * For the time being we have commented this out, because it adds a second
         * symbol to the map, right beside the original one. We are also not sure of
         * the necessity of the .watchPosition call. If it proves that we need it, then
         * we can readd this as necessary.
         *
         * navigator.geolocation.watchPosition(SKGeolocationSuccess, SKGeolocationError);
         */
      }
    }
  });

  
  /**
   * Implements SKGeolocation
   *
   * Listens via Dojo for when a geoLink is click. Once it is clicked, it will fire the
   * initialization method that collects information from the users browser via the HTML5
   * Geolocation API, based on the response it will either put a symbol on the map or it
   * will display useful developer error information.
   *
   */ 
  var SKGeolocation = declare('shackleton.geolocation', null, {
                    
    constructor: function() {
      var geoLink = dojo.byId("geolocationBegin");
      dojo.connect(geoLink, 'onclick', SKGeolocationInitialize);
    }
        
  });

  return {
    SKGeolocation: SKGeolocation
  };

});