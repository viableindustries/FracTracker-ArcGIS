<!DOCTYPE html>

<html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="description" content="" />
        
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="translucent black" />
        <meta name="cache-control" content="no-store" />
        
        <!--[if lt IE 9]>
          <script src="js/lib/html5.js"></script>
        <![endif]-->

        <link rel="stylesheet" href="css/global.css" />
	    <link rel="stylesheet" href="http://serverapi.arcgisonline.com/jsapi/arcgis/3.4/js/dojo/dijit/themes/claro/claro.css">
        <link rel="stylesheet" href="http://serverapi.arcgisonline.com/jsapi/arcgis/3.3/js/esri/css/esri.css" />
       
        <link rel="shortcut icon" href="images/icon-frac-72x72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="images/icon-frac-72x72.png" />
        <link rel="apple-touch-icon-precomposed" href="images/icon-frac-72x72.png" />
        <link href="images/startup-iPad-Portrait.png" media="(device-width: 768px) and (orientation: portrait)" rel="apple-touch-startup-image">
        <link href="images/startup-iPad-Landscape.png" media="(device-width: 768px) and (orientation: landscape)" rel="apple-touch-startup-image">

        <title>FracMapper by FracTracker Alliance</title>
        
  </head>

    <body>

        <div id="progress" class="progress progress-success progress-striped active">
          <div class="bar" style="width: 100%;">Loading map layers ...</div>
        </div>

        <a id="logo" class="logo element-invisible" href="http://maps.fractracker.org/" target="_blank">FracTracker</a>

        <section id="map"></section>

        <!-- Start:Embedded Toolbar -->
        <aside id="fullscreen" class="toolbox-container element-invisible">
            <div class="toolbox fullscreen-navigation">
                <nav class="toolbox-inner">
                    <ul>
                        <li><a id="fullscreen-mode" href="" role="button" title="View this map using your full screen" target="_blank"><i class="icon icon-white icon-fullscreen"></i> <span>Fullscreen</span></a></li>
                    </ul>
                </nav>
            </div>
        </aside>
        <!-- End:Embedded Toolbar -->

        <!-- Start:Toolbar -->
        <aside id="toolbox" class="toolbox-container element-invisible">
            <div class="toolbox fullscreen-navigation">
                <nav class="toolbox-inner">
                    <ul>
                        <li><a href="#details" role="button" title="Learn more about the contents of this map" data-toggle="modal" data-target="#details" data-dynamic="true"><i class="icon icon-about"></i> <span>About</span></a></li>
                        <li><a href="#search" title="Find a location or specific information on this map" data-toggle="modal"><i class="icon icon-search"></i> <span>Search</span></a></li>
                        <li><a href="#layers" title="Show/Hide the Map Layers" class="toolbox-toggle" data-target="#layers"><i class="icon icon-layers"></i> <span>Layers</span></a></li>
                        <li><a href="#legend" title="Show/Hide the Legend" class="toolbox-toggle" data-target="#legend"><i class="icon icon-legend"></i> <span>Legend</span></a></li>
                        <li><a href="#basemaps" title="" data-toggle="modal" data-target="#basemaps" data-dynamic="true"><i class="icon icon-basemap"></i> <span>Base Maps</span></a></li>
                        <li><a href="#measurement" title="Show/Hide the Drawing Tools" class="toolbox-toggle" data-target="#measurement"><i class="icon icon-measure"></i> <span>Measure</span></a></li>
                        <li><a href="#notes" title="Show/Hide the Notes Editor" class="toolbox-toggle" data-target="#notes"><i class="icon icon-note"></i> <span>Notes</span></a></li>
                        <li><a href="#export" data-dynamic="true" data-toggle="modal"><i class="icon icon-export"></i> <span>Export</span></a></li>
                    </ul>
                </nav>
            </div>
        </aside>
        <!-- End:Toolbar -->

        <!-- Start:Time Slider -->
        <aside id="timeslider" class="toolbox-container element-invisible">
            <div class="toolbox">
                <div class="toolbox-inner">
                    <div id="timeslider-content"></div>
                </div>
            </div>
        </aside>
        <!-- End:Time Slider -->

        <!-- Start:Legend -->
        <aside id="legend" class="toolbox-container draggable element-invisbile">
            <div class="toolbox">
                <div class="toolbox-inner">
                    <a href="#legend" class="toolbox-toggle close-toolbox" data-target="#legend">×</a>
                    <h3>Legend</h3>
                    <div id="legend-content"></div>
                </div>
            </div>
        </aside>
        <!-- End:Toolbar -->

        <!-- Start:Layers -->
        <aside id="layers" class="toolbox-container draggable element-invisbile">
            <div class="toolbox">
                <div class="toolbox-inner">
                    <a href="#layers" class="toolbox-toggle close-toolbox" data-target="#layers">×</a>
                    <h3>Layer</h3>
                    <div id="layers-content"></div>
                </div>
            </div>
        </aside>
        <!-- End:Layers -->
          
        <!-- Start:Measurement Tools -->
        <aside id="measurement" class="toolbox-container draggable element-invisbile">
            <div class="toolbox">
                <div class="toolbox-inner">
                    <a href="#measurement" class="toolbox-toggle close-toolbox" data-target="#measurement">×</a>
                    <h3>Measurement</h3>
                    <div id="measurement-content"></div>
                </div>
            </div>
        </aside>
        <!-- End:Measurement Tools -->

        <!-- Start:Notes -->
        <aside id="notes" class="toolbox-container draggable element-invisbile">
            <div class="toolbox">
                <div class="toolbox-inner">
                    <a href="#notes" class="toolbox-toggle close-toolbox" data-target="#notes">×</a>
                    <h3>Notes</h3>
                    <div id="editorDiv"></div>
                </div>
            </div>
        </aside>
        <!-- End:Notes -->

        <!-- Start: Search Modal -->
        <div class="modal hide" id="search">
            <div class="modal-header">
                <button class="close" data-dismiss="modal">×</button>
                <h4>Find an address</h4>
            </div>
            <div class="modal-body">
              <form id="search-location" class="form-horizontal search" method="POST">
                  <div class="control-group">
                      <label class="control-label" for="search-type">Search for</label>
                      <div class="controls">
                          <select id="search-type">
                            <option value="address">an address</option>
                          </select>
                      </div>
                  </div>
                  <div class="control-group">
                      <label class="control-label" for="search-address-test">like</label>
                      <div class="controls">
                          <div id="search-address-test"></div>
                      </div>
                  </div>
                  <div class="control-group">
                      <div class="controls">
                          <p id="address-description">or find my <a data-dismiss="modal" href="#event_findMe" title="Find my current location" class="event_findMe" id="geolocationBegin">current location</a></p>
                      </div>
                  </div>
              </form>
            </div>
        </div>
        <!-- End: Search Modal -->

        <!-- Start: Basemaps Modal -->
        <div class="modal hide" id="basemaps">
          <div class="modal-header">
            <button class="close" data-dismiss="modal">×</button>
            <h4>Change the base map</h4>
          </div>
          <div class="modal-body">

              <div id="basemap-changed" class="alert alert-success element-invisible">
                You are now using the <strong><em class="title"></em></strong> base map.
              </div>
          
              <div class="control-group">
                <div class="controls">
                  <div id="basemaps-gallery"></div>
                </div>
              </div>

          </div>
        </div>
        <!-- End: Basemaps Modal -->

        <!-- Start: Details/About Modal -->
        <div class="modal hide" id="details">
          <div class="modal-header">
            <button class="close" data-dismiss="modal">×</button>
            <h4>About this map</h4>
          </div>

          <div class="modal-body">
            <h3 id="details-title"></h3>
            <div id="details-snippet"></div>
            <div id="details-description"></div>
            <div id="details-usage"></div>
            <div id="details-credit"></div>
            <div id="details-tags"></div>
          </div>
        </div>
        <!-- End: Details/About Modal -->

        <!-- Start: Map Export Modal -->
        <div class="modal hide" id="export">
          <div class="modal-header">
            <button class="close" data-dismiss="modal">×</button>
            <h4>Export this map</h4>
          </div>

          <div class="modal-body">
            <h5>Embed this map</h5>
            <form class="form-horizontal" id="embed-code">
              <div class="control-group">
                <label class="control-label" for="embed-code-iframe">Embed Code</label>
                <div class="controls">
                  <textarea id="embed-code-iframe" class="input-xlarge"></textarea>
                  <p class="help-block"><small>Click to select the code, copy the code, &amp; then paste.<br />The code will change based your choices below.</small></p>
                </div>
              </div>

              <div class="control-group">
                <label class="control-label" for="embed-width">Custom size</label>
                <div class="controls">
                  <input type="text" class="input-small" id="embed-width" placeholder="width" /> x <input type="text" class="input-small" id="embed-height" placeholder="height" />
                </div>
              </div>
            </form>
            
            <hr />
            
            <h5>Save as a PDF</h5>
            <div class="row-fluid print-initial">               
                <div class="span8">
                    <p>Create a PDF version of your map with it's attribution information, legend, scale bar, and map features.</p>
                </div>
                <div class="span4">
                    <div id="print-initialize">
                    </div>
                </div>
            </div>
            <div class="row-fluid print-processing element-invisible">               
                <div class="span12">
                    <div id="print-indicator" class="progress progress-striped active">
                        <div class="bar" style="width: 100%;">Preparing your PDF...</div>
                    </div>
                    <p class="center">
                        <small>You can safely close this window while we create your PDF.</small>
                    </p>
                </div>
            </div>
            <div class="row-fluid print-complete element-invisible">
                <div class="span7">
                    <p>We have created a PDF version of the map for you and it's ready to download.</p>
                </div>               
                <div class="span5">
                    <a href="#download" title="Download your PDF" target="_blank" class="btn btn-success"><i class="icon-white icon-circle-arrow-down"></i> Download your PDF</a>
                </div>
            </div>
            
          </div>
        </div>
        <!-- End: Map Export Modal -->

        <script type="text/javascript"> 
            var dojoConfig = {
                    parseOnLoad: true,
                    packages: [
                      { name: 'esriTemplate', location: location.pathname.replace(/\/[^/]+$/, '') },
                      { name: 'shackleton',   location: location.pathname.replace(/\/[^/]+$/, '') + 'js/shackleton', main: 'app' }
                    ]
                };
        </script>
        <script src="//serverapi.arcgisonline.com/jsapi/arcgis/3.3/"></script>
        <script src="js/lib/jquery-1.7.2.min.js"></script>
        <script src="js/lib/jquery.draggable.min.js"></script>
        <script src="js/lib/jquery.url.js"></script>
        <script src="js/lib/bootstrap.min.js"></script>
        <script src="js/init.js"></script>
    
   </body>

</html>
