const socket = io();

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("send loaction", { latitude, longitude });
    },
    (error) => {
      console.error("Error getting location:", error.message);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 1500,
    }
  );
}

const map = L.map("map").setView([0, 0], 10);

L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

const markers = {};

socket.on("recived-location", (data) => {
  const { id, latitude, longitude } = data;
  map.setView([latitude, longitude], 15);
  if (markers[id]) {
    markers[id].setLatLong([latitude, longitude]);
  } else {
    markers[id] = L.marker([latitude, longitude]).addTo(map);
  }
});

socket.on("user-disconnected",(id) => {
  if(markers[id]){
   map.removeLayer(markers[id]);
   delete markers[id];
  }
})