console.log(
  "Client side JavaScript file is loaded so you can check it at the console ! "
);

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const errorMessage = document.getElementById("errorMessage");
const weatherInfo = document.getElementById("weatherInfo");

const getAddress = (address) => {
  fetch(`http://localhost:8080/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        errorMessage.textContent = data.error;
        weatherInfo.textContent = "";
      } else {
        errorMessage.textContent = "";
        weatherInfo.textContent = `Location: ${data.location}. \n Forcast: It is currently  ${data.forcast} in ${data.location} today`;
        console.log(data.location);
        console.log(data.forcast);
      }
    });
  });
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); // preventing the default behaviour of the form...
  const location = searchInput.value;
  getAddress(location);
  console.log(location);
  searchInput.value = "";
});
