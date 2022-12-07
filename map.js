import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
//import obj from "./places.json" assert { type: "json" };


// Everything we need to use Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC2kO8IuTMNEYu67WuY8q_epq7XNNsqasE",
  authDomain: "mapproject-91415.firebaseapp.com",
  databaseURL: "https://mapproject-91415-default-rtdb.firebaseio.com",
  projectId: "mapproject-91415",
  storageBucket: "mapproject-91415.appspot.com",
  messagingSenderId: "735688509986",
  appId: "1:735688509986:web:f2b435ba769bd51bedd87b",
  measurementId: "G-BMQ4TWENLB",
};

// set up for database
const app = initializeApp(firebaseConfig);
const db = getDatabase();
// Write new data to the database
function writeUserData(placeName, address, lat, long) {
  const reference = ref(db, "places/church/" + address);
  set(reference, {
    latitude: lat,
    longitude: long,
  });
}

// getting everything that we need from esri to be used in the rest of the program
require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
], function (esriConfig, Map, MapView, Graphic, GraphicsLayer) {
  // all of the map function are right here
  esriConfig.apiKey =
    "AAPK407ede60b29e45b7a348f8c1cbe9227aK8drLAywgIBTY84Hu_LfGttO3pufW1J5L6hi6epxRcFXYQS0P-XntxLdMwmPiehl";

  const map = new Map({
    basemap: "arcgis-topographic", // Basemap layer service
  });
  // create the map, centering it on rexburg
  const view = new MapView({
    map: map,
    center: [-111.79547997378118, 43.81988334704777], // Longitude, latitude
    zoom: 14, // Zoom level
    container: "viewDiv", // Div element
  });
  // create a point for every datapoint in the database
  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);
  //design the marker used for the church buildings
  const churchSymbol = {
    color: [226, 119, 40],
    outline: {
      color: [255, 255, 255],
      width: 1,
    },
  };

  // loop through every value in the JSON file
  const churchRef = ref(db, 'places/church');
  onValue(churchRef, (snapshot) => {
    const data = snapshot.forEach((childSnapshot) => {
      const key = childSnapshot.key;
      const coords = childSnapshot.val();
      const point = {
        type: "point",
        longitude: coords.longitude,
        latitude: coords.latitude,
      };
      // add the coordinates and the graphic to the map
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: churchSymbol,
      });
      graphicsLayer.add(pointGraphic);
    });
  });

  // for reading out of the json file
  // for (let i = 0; i < obj.church.length; i++) {
  //   const point = {
  //     type: "point",
  //     longitude: obj.church[i].coords[1],
  //     latitude: obj.church[i].coords[0],
  //   };
  //   // add the coordinates and the graphic to the map
  //   const pointGraphic = new Graphic({
  //     geometry: point,
  //     symbol: churchSymbol,
  //   });
  //   graphicsLayer.add(pointGraphic);
  // }
});

// old function that works with JSON files
// // add the given coordinates and name to the map
// function newPlace() {
//   var address = document.getElementById("address").value;
//   var coords = [
//     document.getElementById("lat").value,
//     document.getElementById("long").value,
//   ];
//   let place = { address: address, coords: coords };
//   obj.church.push(place);
//   console.log("We did it!");
//   console.log(obj.church);
// }

// when the add button is pressed, get the data from the text boxes and write it to the cloud database
document
  .getElementById("placeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var lat = document.getElementById("lat").value;
    var long = document.getElementById("long").value;
    writeUserData(name, address, lat, long);
  });
