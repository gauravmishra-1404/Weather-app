// Section: Click on Input/ Submit Form
// Section: FetchData -> Responsible for fetching Data and extracting relevant fields from API
// Section: UpdatePage
// Section: Add success/error message

// Select ALL the DOM elements I will need in my app
const temperatureField = document.querySelector("#t");
const cityField = document.querySelector(".time_location p");
const dateField = document.querySelector(".time_location span");
const emojiField = document.querySelector(".weather_condition img");
const weatherField = document.querySelector(".weather_condition span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector(".cityField");
const aqi = document.querySelector("#a");


async function fetchData(targetCity) {
    // Making the API Request

    try {

        const url = `https://api.weatherapi.com/v1/forecast.json?key=2b709e62d6d14efe9c223559241304&q=${targetCity}&days=7&aqi=yes&alerts=no`

        const response = await fetch(url)
        console.log(response)

        const responseBody = await response.json()
        
        const currentTemp = responseBody.current.temp_c
        const currentCondition = responseBody.current.condition.text
        const locationName = responseBody.location.name
        const localTimeAndDate = responseBody.location.localtime
        const currentConditionEmoji = responseBody.current.condition.icon
        const air = responseBody.current.air_quality.co;
        // Split localTime into date and time
        const localDate = localTimeAndDate.split(" ")[0]
        const localTime = localTimeAndDate.split(" ")[1]

        const localDateJS = (new Date(localDate)).toLocaleDateString('en-us', {weekday:'long', year: 'numeric',
        month: 'long',
        day: 'numeric',})

        console.log(localDate, localTime, localDateJS)

        // console.log({
        //     currentTemp,
        //     currentCondition,
        //     currentConditionEmoji,
        //     locationName,
        //     localTime
        // })
        // Update the UI
        updateUI(currentTemp, air, locationName, `${localTime} ${localDateJS}`, currentConditionEmoji, currentCondition)
    } catch (error) {
        console.log(error)
    }

}

// Event listener to my submit button
form.addEventListener('keypress', handleSearch)

// Get the value from the searchField and call FetchData
function handleSearch(e) {
    // This is done to prevent the default
    // Behavior of submitting a form i.e refreshing the page
    if(e.key=='Enter'){
        //e.preventDefault()
        const cityName = form.value
        fetchData(cityName)
    }
    
}

function updateUI(temp, air,locationName, time, emoji, conditionName) {
    temperatureField.innerText = temp
    aqi.innerText = air; 
    cityField.innerText = locationName
    emojiField.src = emoji
    weatherField.innerText = conditionName
    dateField.innerText = time
}

fetchData("Jabalpur");
