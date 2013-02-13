//
// Enable the user to search for specific addresses or locations on the map
//

define([ 'dojo/_base/declare', 'dijit/layout/BorderContainer', 'dojox/layout/FloatingPane', 'dijit/layout/ContentPane', 'dijit/form/CheckBox' , 'dijit/form/ComboBox' ], function( declare, dijitLayoutBordercontainer, dojoxLayoutFloatingPane, dijitLayoutContentPane, dijitFormCheckBox, dijitFormComboBox ) {

   //
   // Listens for when the "search-address" button is clicked. Once it has been clicked
   // it will initialize the rest of the address search functionality.
   //
  var SKDataExtract = declare('shackleton.dataextract', null, {
    
    _extract: function() {

        var clipLayers = [];
        
        // if( dijit.byId('layer1').checked ) {
        //   clipLayers.push('Incident Points');
        // };
        // 
        // if( dijit.byId('layer2').checked ) {
        //   clipLayers.push('Incident Lines');
        // };
        // 
        // if( dijit.byId('layer3').checked ) {
        //   clipLayers.push('Incident Areas');
        // };
        // 
        // if( clipLayers.length === 0 || map.graphics.graphics.length === 0 ) {
        //   alert('Select layers to extract and area of interest');
        //   return;
        // };
        
        var features = [];
        features.push( map.graphics.graphics[0] );
        
        var featureSet = new esri.tasks.FeatureSet();
        featureSet.features = features;

        var params = {
          "Layers_to_Clip":clipLayers,
          "Area_of_Interest": featureSet,
          "Feature_Format": dijit.byId('formatBox').value
        };
          
        /******************************/
        
        /** THE GEOPROCESSING SERVICE DOES NOT EXIST **/
        
        /*****************************/
        
        if (typeof thisGP != 'undefined') {
          thisGP.submitJob(params, _complete , _status, function( error ) {
            console.error('shackleton.dataexport', error);
          });
        }
        else {
          console.error('The Geoprocessing Server needed to export data from this map does not exist.');
        };
              
    },
    
    constructor: function() {
      
      console.log('externally accessible function');
      
    }
    
  });

  var SKDataExport = declare('shackleton.dataexport', null, {
    
    _tools: function() {
      
      SKSelectionToolbar = new esri.toolbars.Draw( map );
      
      dojo.connect(SKSelectionToolbar, 'onDrawEnd', function ( thisGeometry ) {
        
        SKSelectionToolbar.deactivate();
        
        var thisSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255,0,0]), 2), new dojo.Color([255,255,0,0.25]));
        
        var thisGraphic = new esri.Graphic(thisGeometry, thisSymbol);
        map.graphics.add(thisGraphic);
        
      });
      
    },

    _complete: function(thisJob) {
      
        if (thisJob.jobStatus !== "esriJobFailed"){
          SKGeoProcessor.getResultData(thisJob.jobId, "Output_Zip_File", downloadFile);
        };
      
    },

    _status: function( thisJob ) {
      
      var thisStatus = thisJob.jobStatus;
      
      if (thisStatus === 'esriJobFailed') {
        alert(thisStatus);
      }
      
    },

    _download: function( thisFile ) {
      
      map.graphics.clear();
      var thisUrl = thisFile.value.url;
      window.location = thisUrl;
      
    },

    constructor: function() {
      
      // Start up the drawing tools
      this._tools();

      var thisGP;
      
      jQuery('.extract-data').bind('click', function () {
        var thisDataExtraction = new shackleton.dataextract();
        
        thisDataExtraction._extract();
      });
            
    }

  });

  return {
    SKDataExport: SKDataExport
  };

});

// * * *
// #### External Documentation
// To learn more about the ArcGIS Javascript API methods used to
// create this module:
//
// - <a href="http://www.youtube.com/watch?v=HsMK9ZtYN5k" target=_blank">YouTube Tutorial: Data Extraction Services in ArcGIS Server</a>
// - <a href="http://forums.arcgis.com/threads/46552-Extract-Data-Task-GP-Not-Extracting-Features-PLEASE-HELP!!!" target=_blank">Help topic regarding Data Extraction</a>

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
