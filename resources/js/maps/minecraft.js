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

export function translateGeoJSON(geojson, map) {
    if (!geojson || !geojson.features) {
        throw new Error("Invalid GeoJSON object");
    }

    // Iterate over each feature and translate its coordinates
    geojson.features.forEach(feature => {
        if (feature.geometry && feature.geometry.coordinates) {
            // Assuming coordinates are in the form [x, z] for points
            if (feature.geometry.type === "Point") {
                const [x, z] = feature.geometry.coordinates;
                feature.geometry.coordinates = toLatLng(x, z, map);
            }
            // Handle other geometry types (LineString, Polygon, etc.) if necessary
            else if (feature.geometry.type === "LineString" || feature.geometry.type === "Polygon") {
                feature.geometry.coordinates = feature.geometry.coordinates.map(coord => {
                    const [x, z] = coord;
                    return toLatLng(x, z, map);
                });
            }
        }
    });

    return geojson;
}