//
// Enable the user to take advantage of the geolocation capabilities of their browser
//

define('SKGeolocation', [ 'dojo/_base/declare' ], function( declare ) {
  
   //
   // This object is defining options that we will later use to create a symbol
   // on our map. This object contains information on the type and style (e.g., circle),
   // the color, and outline information to place a symbol on our map.
   //
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
  
   //
   // This method enables us to add a point based on the geographic
   // information to our map. It adds the point based on the geopgraphic
   // cooridnates we have passed to.
   //
  var SKGeolocationAddPoint = declare(null, {
    
   //
   // To pass SKGeolocationAddPoint the proper information we need to create a point,
   // we must first create a ``new esri.geometry.Point(long, lat)`` then we can pass the
   // value returned to ``esri.geometry.geographicToWebMercator()`` finally the value that
   // creates gets passed to our SKGeolocationAddPoint. For an example of how this works
   // see SKGeolocationSuccess::constructor
   //
    constructor: function ( thisPoint ) {
      var thisSymbol = new esri.symbol.SimpleMarkerSymbol( _symbolOptions );
    
      // An actual graphic based on what we've told it to display via the _symbolOptions
      // and placed according to the information we have passed through thisPoint
      thisGraphic = new esri.Graphic( thisPoint, thisSymbol );
      console.log('GeoLocation', thisPoint);
      return map.graphics.add( thisGraphic );
    }

  });

   //
   // This method enables us to take location information that we have previously
   // collected through HTML5 methods and create an ArcGIS ready Web Mercator based
   // geolocation so that we can add a point to our map using those coordinates.
   //
  var SKGeolocationSuccess = declare(null, {
    
    // The location parameter being passed is the coming from the HTML5 
    constructor: function ( location ) {
      var geolocationCurrent = new esri.geometry.Point(location.coords.longitude, location.coords.latitude);
      var geolocationPoint = esri.geometry.geographicToWebMercator(geolocationCurrent);
  
      SKGeolocationAddPoint( geolocationPoint );

     //
     // Take the collected location information, pass it through the ArcGIS
     // geocoding system and then return a map symbol, finally center
     // the map on our newly created symbol and zoom in so that we can get
     // a close up view of where our browser thinks we are.
     //
      return map.centerAndZoom( geolocationPoint, 16 );
    }

  });

   //
   // Handles any errors that we may come up against so that our application
   // doesn't crash and gives useful troubleshooting information to the developer.
   //
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
  
   //
   // Checks the users browser for the existence of the HTML5 Geolocation API,
   // based on the response it will either put a symbol on the map or it will display
   // useful developer error information   
   //
  var SKGeolocationInitialize = declare(null, {
    constructor: function() {
      if (navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(SKGeolocationSuccess, SKGeolocationError);
        
         // For the time being we have commented this out, because it adds a second
         // symbol to the map, right beside the original one. We are also not sure of
         // the necessity of the .watchPosition call. If it proves that we need it, then
         // we can readd this as necessary.
         //
         // navigator.geolocation.watchPosition(SKGeolocationSuccess, SKGeolocationError);
      }
    }
  });

  
   //
   // Listens via Dojo for when a geoLink is click. Once it is clicked, it will fire the
   // initialization method that collects information from the users browser via the HTML5
   // Geolocation API, based on the response it will either put a symbol on the map or it
   // will display useful developer error information.
   //
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

// * * *
// #### External Documentation
// To learn more about the ArcGIS Javascript API methods used to
// create this module we have listed the most commonly used methods
// below:
//
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#simplemarkersymbol" target=_blank">Class: SimpleMarkerSymbol</a>
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#graphic" target=_blank">Class: Graphic</a>
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#Map/graphics" target=_blank">Class: Map::graphics</a>
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#geometry" target="_blank">Class: Geometry</a>
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#point" target="_blank">Class: Point</a>
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#namespace_geometry/esri.geometry.geographicToWebMercator" target="_blank">Class: namespace_geometry</a>
// - <a href="http://help.arcgis.com/en/webapi/javascript/arcgis/jsapi/#Map/centerAndZoom" target="_blank">Class: Map::centerAndZoom</a>
// - <a href="http://dev.w3.org/geo/api/spec-source-v2#geolocation_interface" target="_blank">W3 Development Documentation: HTML5 Geolocation API</a>

// * * *
// #### Task List
// 1. Read up on the necessity of the watchPosition method from the HTML5 Geolocation API
// and if it is necessary or important the proper operation of the Geolocatio API, then
// we should figure out a way to make this Geolocation module only display one sybmol
// and not place a duplicate symbol on the map.
// 2. Would be helpful to have better error handling, something that not only gives
// useful information to the developer, but also gives useful, on-screen information
// to the person using the application. Perhaps telling them: "The map you are looking
// for either wasn't found or couldn't be loaded right now. Why not check out our library
// of other informative maps at http://www.fractracker.org/maps/"
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
