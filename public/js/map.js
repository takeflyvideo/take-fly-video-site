document.addEventListener("DOMContentLoaded", function () {
  const map = L.map('map').setView([-22.9083, -43.1964], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const locations = [
    {
      name: "Ilha Grande",
      coords: [-23.1407, -44.1625],
      image: "assets/images/ilha-grande.jpg"
    },
    {
      name: "Sumaré - RJ",
      coords: [-22.9334, -43.2485],
      image: "assets/images/sumare.jpg"
    },
    {
      name: "Centro do Rio",
      coords: [-22.9068, -43.1729],
      image: "assets/images/central-do-brasil.jpg"
    }
  ];

  locations.forEach(loc => {
    const marker = L.marker(loc.coords).addTo(map);
    marker.bindPopup(`<strong>${loc.name}</strong>`);
    marker.on("mouseover", function () {
      document.getElementById("map-preview").innerHTML = `
        <h5>${loc.name}</h5>
        <img src="${loc.image}" class="img-fluid" style="max-width: 300px; border-radius: 8px;" />
      `;
    });
    marker.on("mouseout", function () {
      document.getElementById("map-preview").innerHTML = "";
    });
  });
});
