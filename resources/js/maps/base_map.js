/**
 * Before you edit these, read the documentation on how these files are compiled:
 * https://docs.phpvms.net/developers/building-assets
 *
 * Edits here don't take place until you compile these assets and then upload them.
 * Available providers: https://leaflet-extras.github.io/leaflet-providers/preview/
 */

const leaflet = require('leaflet');

function setScale(map, zoom) {
  let scale = (1 / Math.pow(2, zoom));
  // store this on map for ellipse
  map.options.scale = scale;
}

export default (_opts) => {
  const url = "https://files.minersonline.uk/tiles/m_cmp1/tiles/minecraft_overworld/{z}/{x}_{y}.png";
  const zoom = {
    def: 3,
    max: 5,
    extra: 7
  };

  const opts = Object.assign({
    render_elem: 'map',
    center: [0, 0], // Minecraft world centre (adjust as needed)
    zoom: zoom.def,        // Initial zoom level
    maxZoom: zoom.max + zoom.extra,    // Adjust based on your SquareMap configuration
    layers: [],
    set_marker: false,
    leafletOptions: {},
  }, _opts);

  const leafletOptions = Object.assign({
    center: opts.center,
    zoom: opts.zoom,
    scrollWheelZoom: false,
    noWrap: true,
    providers: {},
    crs: leaflet.CRS.Simple, // Set CRS to simple for grid-based maps
  }, opts.leafletOptions);

  // Replace the provider configuration with SquareMap tiles
  leafletOptions.providers = {
    customMinecraftMap: {
      url: url,
      options: {
        minNativeZoom: 0,
        maxNativeZoom: zoom.max + zoom.extra,
        tileSize: 512,
        attribution: 'Copyright &copy; 2017 - 2025 Samland Government & Miners Online',
      },
    },
  };

  const map = leaflet.map(opts.render_elem, leafletOptions);
  setScale(map, zoom.max);

  // Add the custom tile layer
  for (const key in leafletOptions.providers) {
    const provider = leafletOptions.providers[key];
    leaflet.tileLayer(provider.url, provider.options).addTo(map);
  }

  return map;
};
