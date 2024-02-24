// alert("1");
let lat;
let lon;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    Alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  fetchLocation(lat, lon);
}

getLocation();
function fetchLocation(lat, lon) {
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=285385f6d5c140909605d2cb1f3e457c`
  )
    .then((resp) => resp.json())
    .then((result) => {
      let data = "";
      let dataContainer = document.querySelector(".data-container");
      data = `<p>Name Of Time Zone: ${result.results[0].timezone.name}</p>
        <div class="span1">
          <p><b>Lat:</b> ${lat}</p>
          <p><b>Long:</b> ${lon}</p>
        </div>
        <p><b>Offset STD:</b> ${result.results[0].timezone.offset_STD}</p>
        <p><b>Offset STD Seconds: </b>${result.results[0].timezone.offset_STD_seconds}</p>
        <p><b>Offset DST: </b>${result.results[0].timezone.offset_DST}</p>
        <p><b>Offset DST Seconds:</b> ${result.results[0].timezone.offset_DST_seconds}</p>
        <p><b>Country: </b>${result.results[0].country}</p>
        <p><b>Postcode:</b> ${result.results[0].postcode}</p>
        <p><b>City: </b>${result.results[0].city}</p>`;
      dataContainer.innerHTML = data;
    });
}

addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const address = document.getElementById("address").value;

  if (address.trim() == "") {
    document.getElementById("error").innerText = "Please Enter an Address!";
  } else {
    document.getElementById("error").innerText = "";

    fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=285385f6d5c140909605d2cb1f3e457c`
    )
      .then((resp) => resp.json())
      .then((geocodingResult) => {
        console.log("geoaddress result", geocodingResult);
        console.log(geocodingResult.features[0].properties.lat);
        const dataContainer2 = document.createElement("div");
        dataContainer2.classList.add("data-container2");
        document.body.appendChild(dataContainer2);
        Data = "";
        // let dataContainer2 = document.querySelector(".data-container2");

        Data = `<p>Name Of Time Zone: ${geocodingResult.features[0].properties.timezone.name}</p>
            <div class="span1">
              <p><b>Lat:</b> ${geocodingResult.features[0].properties.lat}</p>
              <p><b>Long:</b> ${geocodingResult.features[0].properties.lon}</p>
            </div>
            <p><b>Offset STD:</b> ${geocodingResult.features[0].properties.timezone.offset_STD}</p>
            <p><b>Offset STD Seconds: </b>${geocodingResult.features[0].properties.timezone.offset_STD_seconds}</p>
            <p><b>Offset DST: </b>${geocodingResult.features[0].properties.timezone.offset_DST}</p>
            <p><b>Offset DST Seconds:</b> ${geocodingResult.features[0].properties.timezone.offset_DST_seconds}</p>
            <p><b>Country: </b>${geocodingResult.features[0].properties.country}</p>
            <p><b>Postcode:</b> ${geocodingResult.features[0].properties.postcode}</p>
            <p><b>City: </b>${geocodingResult.features[0].properties.city}</p>`;
        dataContainer2.innerHTML = Data;
      });
    document.getElementById("address").value = "";
  }
});