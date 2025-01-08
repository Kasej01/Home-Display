# Home Web Display Setup
#### This display includes the use of two API's to recieve daily news coverage as well as
## Requirements:
1. Display
    - Whether you use a mini display from a raspberry pi, a TV, or an Amazon Fire Tablet (our choice), you just need something to display the page.
2. Computer capable of accessing the internet
    - This can be a microcontroller like the ESP32 (with wifi), Raspberry Pi, as long as it has the capability of access to an internet browser
3. 3 Accounts are needed for this
    1. A Netlify Account (this will be used for publishing the website)
    2. A OpenWeatherMap Account (used to call their API and get weather data)
    3. A NewsApi Account (used to call their API and get News data)
5. WiFi (I figured this was a given)


## Step 1: Download/Clone this github page
1. First, click on the ![Code button from GitHub](/images/Code-Button.png "Code button from Github") button
2. Within the code button, click the Copy to Clipboard button, as shown below
    - ![Download to Zip](/images/Download-Zip.png "Download to Zip Button")
3. Find the zip file, right click, and extract it

## Step 2: Get your API Keys

### OpenWeatherMap Setup
1. First, create an account with [OpenWeatherMap](https://home.openweathermap.org/users/sign_up)
2. Once your account is created, click on your profile in the top right, and then click ApiKeys in the dropdown
3. You should already have one, but if you dont, give it a name and click the Generate button, then copy that key and store it somewhere for use later

### TheNewsAPI Setup
1. Create an account with [TheNewsAPI](https://www.thenewsapi.com/register)
2. Once your account is created, click the dasboard button in the top corner, then copy your API Token and store it somewhere again

## Step 3: Setting environment Variables
1. Go back to where you extracted the GitHub files, and within the GOES-EAST-GEOCOLOR folder click on the config.json file.
2. Update the City, State, and Country to reflect your own
    - Make sure to use shortcodes, so instead of United States it would be US, only the city needs the entire name
    - If you are outside the us, leave state blank


## Step 4: Netlify
1. First, create an account with [Netlify](https://app.netlify.com/signup)