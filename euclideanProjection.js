/**
 * EuclideanProjection
 *
 * Apply it with this:
 * myCustomMapType.prototype.projection = new EuclideanProjection();
 *
 * Modified from https://groups.google.com/forum/#!topic/google-maps-js-api-v3/UEIbpcTdMHs
 * Adapted to remove latitude distortion.
 */
function EuclideanProjection(scaleLat, scaleLng, offsetLat, offsetLng) {
        var EUCLIDEAN_RANGE = 256;
        this.pixelOrigin_ = new google.maps.Point(EUCLIDEAN_RANGE / 2, EUCLIDEAN_RANGE / 2);
        this.pixelsPerLonDegree_ = EUCLIDEAN_RANGE / 360;
        this.pixelsPerLonRadian_ = EUCLIDEAN_RANGE / (2 * Math.PI);
        this.scaleLat = scaleLat;        // Height - multiplication scale factor
        this.scaleLng = scaleLng;        // Width - multiplication scale factor
        this.offsetLat = offsetLat;      // Height - direct offset +/-
        this.offsetLng = offsetLng;      // Width - direct offset +/-
};

EuclideanProjection.prototype.fromLatLngToPoint = function(latLng, opt_point) {
        var point = opt_point || new google.maps.Point(0, 0);

        var origin = this.pixelOrigin_;
        point.x = (origin.x + (latLng.lng() + this.offsetLng ) * this.scaleLng * this.pixelsPerLonDegree_);
        // NOTE(appleton): Truncating to 0.9999 effectively limits latitude to
        // 89.189.  This is about a third of a tile past the edge of the world
        // tile.
        var unscaledY = Math.sin(latLng.lat() * Math.PI / 180)
        if (unscaledY > 0.9999) {
            unscaledY = 0.9999;
        } else if (unscaledY < -0.9999) {
            unscaledY = -0.9999;
        }
        var radiansY = Math.log((1 + unscaledY) / (1 - unscaledY));
        point.y = radiansY * this.scaleLat * this.pixelsPerLonRadian_;
        return point;
};

EuclideanProjection.prototype.fromPointToLatLng = function(point) {
        var me = this;

        var origin = me.pixelOrigin_;
        var lng = (((point.x - origin.x) / me.pixelsPerLonDegree_) / this.scaleLng) - this.offsetLng;
        var lat = ((-1 *( point.y - origin.y) / me.pixelsPerLonDegree_) / this.scaleLat) - this.offsetLat;
        return new google.maps.LatLng(lat , lng, true);
};