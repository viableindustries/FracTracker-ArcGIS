<!DOCTYPE html>

<html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="description" content="" />
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="translucent black" />
        
        <link rel="stylesheet" href="css/global.css" />
        <link rel="apple-touch-startup-image" href="//maps.fractracker.org/images/startup-iPad-Portrait.png" />
        <link rel="shortcut icon" href="images/icon-frac-72x72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="images/icon-frac-72x72.png" />
        <link rel="apple-touch-icon-precomposed" href="images/icon-frac-72x72.png" />
        <link href="images/startup-iPad-Portrait.png" media="(device-width: 768px) and (orientation: portrait)" rel="apple-touch-startup-image">
        <link href="images/startup-iPad-Landscape.png" media="(device-width: 768px) and (orientation: landscape)" rel="apple-touch-startup-image">

        <title>FracMapper by The FracTracker Alliance</title>

  </head>

    <body>

        <div id="fracmapper"></div>

        <!-- Legend -->
        <div id="legend" class="toolbox-container draggable ui-draggable" style="display: none;">
          <div class="toolbox">
            <div class="toolbox-inner">
              <a data-toggle="modal" href="#modalLegend" title="Close the legend" class="legend-button titleButton modal-close-button close">close</a>
              <h3>Legend</h3>
              <div id="legend-content"></div>
            </div>
          </div>
        </div>
        <!-- End Legend -->

        <!-- Toolbar -->
        <aside class="toolbox-container">
            <div class="toolbox fullscreen-navigation">
                <nav class="toolbox-inner">
                    <ul class="nav">
                        <li><a href="#modalDetails" title="Learn more about the contents of this map" class="icon icon-about" data-toggle="modal">About</a></li>
                        <li><a href="#modalSearch" title="Find a location or specific information on this map" class="icon icon-search" data-toggle="modal">Search</a></li>
                        <li><a href="#modalLayers" title="Toggle the layers of this map" class="icon icon-layers">Layers</a></li>
                        <li><a href="#modalLegend" title="" class="icon icon-legend">Legend</a></li>
                        <li><a href="#modalBasemaps" title="" class="icon icon-about" data-toggle="modal">Base Maps</a></li>
                        <li><a href="#modalMeasure" title="" class="icon icon-about">Measure</a></li>
                        <li><a href="#modalExport" title="" class="icon icon-about" data-toggle="modal">Export</a></li>
                    </ul>
                </nav>
            </div>
        </aside>
        <!-- End Toolbar -->

        <script type="text/javascript"> 
            var dojoConfig = {
              parseOnLoad: true,
              packages: [{
                  name: "esriTemplate",
                  location: location.pathname.replace(/\/[^/]+$/, '')
              }, {
                  name: "utilities",
                  location: location.pathname.replace(/\/[^/]+$/, '') + '/js'
              }, {
                  name: "apl",
                  location: location.pathname.replace(/\/[^/]+$/, '') + '/apl'
              }]
           };
        </script>
        <script src="//serverapi.arcgisonline.com/jsapi/arcgis/3.3"></script>
        <script src="js/modules.js?<?php print date('U'); ?>"></script>
        <script src="js/proxy.js?<?php print date('U'); ?>"></script>
        <script src="js/urlobject.js?<?php print date('U'); ?>"></script>
        <script src="js/settings.js?<?php print date('U'); ?>"></script>
        <script src="js/variables.js?<?php print date('U'); ?>"></script>
        <script src="js/map.js?<?php print date('U'); ?>"></script>

   </body>

</html>
