require(["esri/config","esri/Map", "esri/views/MapView"], function (esriConfig, Map, MapView) {
    esriConfig.apiKey = "AAPK407ede60b29e45b7a348f8c1cbe9227aK8drLAywgIBTY84Hu_LfGttO3pufW1J5L6hi6epxRcFXYQS0P-XntxLdMwmPiehl";
    const map = new Map({
        basemap: "arcgis-topographic"
    });

    const view = new MapView({
        map: map,
        center: [-118.805, 34.027],
        zoom: 13,
        container: "viewDiv"
    });
});

//AAPK407ede60b29e45b7a348f8c1cbe9227aK8drLAywgIBTY84Hu_LfGttO3pufW1J5L6hi6epxRcFXYQS0P-XntxLdMwmPiehl