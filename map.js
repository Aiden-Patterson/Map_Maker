require(["esri/config","esri/Map", "esri/views/MapView"], function (esriConfig,Map, MapView) {

    esriConfig.apiKey = "AAPK407ede60b29e45b7a348f8c1cbe9227aK8drLAywgIBTY84Hu_LfGttO3pufW1J5L6hi6epxRcFXYQS0P-XntxLdMwmPiehl";

    const map = new Map({
      basemap: "arcgis-topographic" // Basemap layer service
    });

    const view = new MapView({
      map: map,
      center: [-111.823,43.830], // Longitude, latitude
      zoom: 13, // Zoom level
      container: "viewDiv" // Div element
    });

  });

//AAPK407ede60b29e45b7a348f8c1cbe9227aK8drLAywgIBTY84Hu_LfGttO3pufW1J5L6hi6epxRcFXYQS0P-XntxLdMwmPiehl