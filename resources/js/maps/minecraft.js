const leaflet = require('leaflet');

export function toLatLng(x, z, map) {
    return leaflet.latLng(pixelsToMeters(-z, map), pixelsToMeters(x, map));
}

export function toPoint(latlng, map) {
    return leaflet.point(metersToPixels(latlng.lng, map), metersToPixels(-latlng.lat, map));
}

export function pixelsToMeters(num, map) {
    return num * map.options.scale;
}

export function metersToPixels(num, map) {
    return num / map.options.scale;
}