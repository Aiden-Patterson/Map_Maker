import obj from "./places.json" assert { type: "json" };
// getting everything that we need from esri to be used in the rest of the program
require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
], function (esriConfig, Map, MapView, Graphic, GraphicsLayer) {
  esriConfig.apiKey =
    "AAPK407ede60b29e45b7a348f8c1cbe9227aK8drLAywgIBTY84Hu_LfGttO3pufW1J5L6hi6epxRcFXYQS0P-XntxLdMwmPiehl";

  const map = new Map({
    basemap: "arcgis-topographic", // Basemap layer service
  });

  const view = new MapView({
    map: map,
    center: [-111.79547997378118, 43.81988334704777], // Longitude, latitude
    zoom: 14, // Zoom level
    container: "viewDiv", // Div element
  });

  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);
  // loop through every value in the JSON file
  for (let i = 0; i < obj.church.length; i++) {
    const point = {
      type: "point",
      longitude: obj.church[i].coords[1],
      latitude: obj.church[i].coords[0],
    };
    const simpleMarkerSymbol = {
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255],
        width: 1,
      },
    };

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: simpleMarkerSymbol,
    });
    graphicsLayer.add(pointGraphic);
  }
});

function newPlace() {
  var address = document.getElementById("address").value;
  var coords = [document.getElementById("lat").value, document.getElementById("long").value];
  let place = { address: address, coords: coords };
  obj.church.push(place);
  console.log(obj.church);
}

//document.getElementById("placeForm").addEventListener("submit", function (event) {
    //event.preventDefault();
    //newPlace(event.target);
  //});

  //submit.onclick = function(){
 //   var address = document.getElementById("address").value;
  //  var coords = [document.getElementById("lat").value, document.getElementById("long").value];
  //  let place = { address: address, coords: coords };
  //  obj.church.push(place);
 // }
  document.querySelector('#submit').addEventListener("click", newPlace())