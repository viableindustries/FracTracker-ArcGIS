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
  
  var geolocation = declare('shackleton.geolocation', null, {
    
    name: "blah",
                
    constructor: function() {
            
      var geoLink = dojo.byId("geolocationBegin");

      dojo.connect(geoLink, 'onclick', this.initialize);
      
    },
    
    initialize: function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.success, this.error);
        navigator.geolocation.watchPosition(this.success, this.error);
      };      
    },
        
    success: function ( location ) {
      var geolocationCurrent = new esri.geometry.Point(location.coords.longitude, location.coords.latitude);
      var geolocationPoint = esri.geometry.geographicToWebMercator(geolocationCurrent);
   
      this.addPoint( geolocationPoint );
   
      return map.centerAndZoom( geolocationPoint, 16 );
    },

    error: function ( geolocationPoint ) {
     if (navigator.geolocation) {
       navigator.geolocation.clearWatch(locationWatchIdentifier);
     }
     
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
   
     }
   
    },

    addPoint: function ( geolocationPoint ) {
    
      var geolocationSymbol = new esri.symbol.SimpleMarkerSymbol( _symbolOptions );
      
      geolocationGraphic = new esri.Graphic( geolocationPoint, geolocationSymbol );
 
      map.graphics.add( geolocationGraphic );

    }
    
  });

  return geolocation;

});