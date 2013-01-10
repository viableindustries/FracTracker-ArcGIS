<!DOCTYPE html>

<html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="description" content="" />
        
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="translucent black" />
        
        <link rel="stylesheet" href="css/global.css" />
        
        <link rel="shortcut icon" href="favicon.gif" />
        <link rel="apple-touch-startup-image" href="images/ios/apple-touch-startup-image.png" />
        <link rel="apple-touch-icon-precomposed" href="images/ios/apple-touch-icon-precomposed.png" />
        <link media="(device-width: 768px) and (orientation: portrait)" rel="apple-touch-startup-image" href="images/ios/apple-touch-startup-image-portrait.png" />
        <link media="(device-width: 768px) and (orientation: landscape)" rel="apple-touch-startup-image" href="images/ios/apple-touch-startup-image-landscape.png" />

        <title></title>

  </head>

    <body>

        <section id="map"></section>

        <!-- Start:Toolbar -->
        <aside class="toolbox-container">
            <div class="toolbox fullscreen-navigation">
                <nav class="toolbox-inner">
                    <ul class="nav">
                        <li><a href="#modalDetails" title="Learn more about the contents of this map" class="icon icon-about" data-toggle="modal">About</a></li>
                        <li><a href="#modalSearch" title="Find a location or specific information on this map" class="icon icon-search" data-toggle="modal">Search</a></li>
                        <li><a href="#layers" title="Toggle the layers of this map" class="icon icon-layers">Layers</a></li>
                        <li><a href="#legend" title="" class="icon icon-legend">Legend</a></li>
                        <li><a href="#modalBasemaps" title="" class="icon icon-about" data-toggle="modal">Base Maps</a></li>
                        <li><a href="#measure" title="" class="icon icon-about">Measure</a></li>
                        <li><a href="#modalExport" title="" class="icon icon-about" data-toggle="modal">Export</a></li>
                    </ul>
                </nav>
            </div>
        </aside>
        <!-- End:Toolbar -->

        <script type="text/javascript"> 
            var dojoConfig = {
              parseOnLoad: true,
              packages: [
                { name: 'esriTemplate', location: location.pathname.replace(/\/[^/]+$/, '') },
                { name: 'shackleton',   location: location.pathname.replace(/\/[^/]+$/, '') + 'js/shackleton', main: 'app' }
              ]
           };
        </script>
        <script src="//serverapi.arcgisonline.com/jsapi/arcgis/3.3"></script>
        <script src="js/bootstrap.js?<?php print date('U'); ?>"></script>

   </body>

</html>
