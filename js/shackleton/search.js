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

  var search = declare('shackleton.search', null, {  
    constructor: function () {
      console.log( 'shackleton.search._constructor' );
      this.pooGas( 'constructor pooGas' );
    },
    pooGas: function ( thisVar ) {
      console.log( 'shackleton.search.pooGas', thisVar );
      this.ohNo( 'ohNo pooGas' );
    },
    ohNo: function ( thisVar ) {
      console.log( 'shackleton.search.ohNo', thisVar );
    }
  });

  return true;

});