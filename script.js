const getApi = async (nameOfCity) => {
    const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=3d04a3019ac744f0bde173915242203&q=${nameOfCity}`
    );
    const json = await response.json();
    console.log(json);
};



const searchBtn = document.querySelector("#search");
const userInput = document.querySelector("input");

searchBtn.addEventListener("click", () => {
    const city = userInput.value;
    getApi(city);
});
