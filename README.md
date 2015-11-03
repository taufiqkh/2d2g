# Tool for displaying 2d maps with the Google Maps API
This contains the initial results of my experiments with converting a 2d map for use with the google maps api. While the attempts were aborted, I've put them up for posterity and my own reference.

The map (not included) was converted with the following:
```
gdal_translate -of VRT -a_srs EPSG:4326 -gcp 0 0 -180 90 -gcp 1840 0 180 90 -gcp 1840 1240 180 -90 xanadu_map.png xanadu_map.vrt
gdal2tiles.py --profile=raster -z 2-6 xanadu_map
```

The html file has been modified to use map_tiles instead of xanadu_map, but the concept remains the same.

Proper documentation not yet prepared.
