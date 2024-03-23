const getApi = async (nameOfCity) => {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=3d04a3019ac744f0bde173915242203&q=${nameOfCity}`
        );
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // or handle the error in an appropriate way
    }
};

const getImportantInfo = (cityObj) => {
    const { temp_c, feelslike_c, wind_kph, uv } = cityObj.current;
    const condition = cityObj.current.condition.text;
    return {
        temp_c,
        feelslike_c,
        wind_kph,
        uv,
        condition,
    };
};

const resetFields = () => {
    conditionElement.textContent = "";
    tempElement.textContent = "Temp in C: ";
    feelslikeElement.textContent = "Feels Like in C: ";
    windElement.textContent = "wind speed: ";
    uvElement.textContent = "uv: ";
};

const showWeatherInfo = (obj) => {
    resetFields();

    conditionElement.textContent += obj.condition;
    containerElement.appendChild(conditionElement);

    tempElement.textContent += obj.temp_c;
    containerElement.appendChild(tempElement);

    feelslikeElement.textContent += obj.feelslike_c;
    containerElement.appendChild(feelslikeElement);

    windElement.textContent += obj.wind_kph;
    containerElement.appendChild(windElement);

    uvElement.textContent += obj.uv;
    containerElement.appendChild(uvElement);
};

const containerElement = document.querySelector(".container");
const searchBtn = document.querySelector("#search");
const userInput = document.querySelector("input");
const conditionElement = document.createElement("p");
const tempElement = document.createElement("p");
const feelslikeElement = document.createElement("p");
const windElement = document.createElement("p");
const uvElement = document.createElement("p");

searchBtn.addEventListener("click", async () => {
    const city = userInput.value;
    try {
        const cityData = await getApi(city);
        const cityInfoObj = getImportantInfo(cityData);
        showWeatherInfo(cityInfoObj);
    } catch (error) {
        console.error("Error:", error);
    }
});
