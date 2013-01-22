define([ 'dojo/_base/declare', 'esri/dijit/Scalebar', 'shackleton/map' ], function( declare, esriDijitScalebar ) {

  var scalebar = declare('shackleton.scalebar', null, {
      
    constructor: function ( map ) {
      
      var thisScalebar = new esri.dijit.Scalebar({
        map: map
      });

    }
  });

  return scalebar;
  
});