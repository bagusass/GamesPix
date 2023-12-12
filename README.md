# GamesPix

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) ![Website](https://img.shields.io/website?url=https%3A%2F%2Fgamesite.bistondroid.repl.co&up_message=online&down_message=offline&logo=googlechrome&label=demo%20website)

![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![image](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)



## Description

GamesPix is a robust and user-friendly web application designed to provide gaming enthusiasts with a vast collection of online games across various genres. The application is built with a focus on user experience, offering a seamless and intuitive interface that allows users to navigate and explore games with ease.

The application fetches data from the GamePix API, a comprehensive source of game data, and presents it in a responsive grid layout. The grid layout adapts to different screen sizes, ensuring a consistent user experience across various devices.

The application also features a "Most Played Today" section, highlighting the games that are trending and most played for the day. This feature allows users to stay updated with popular games and trends in the gaming community.

In addition to the game list, the application includes a search functionality that allows users to find games based on their preferences. The search functionality is designed to be fast and responsive, providing users with instant results as they type their queries.

The application is built with HTML, CSS, and JavaScript, following best practices for web development. It is designed to be lightweight and fast, ensuring a smooth and enjoyable user experience.

## Project Structure

- `index.html`: This is the main HTML file for the web application. It includes links to the CSS and JavaScript files, and it contains the main structure of the web page.

- `main.js`: This is the main JavaScript file for the web application. It handles fetching data from the API, paginating the results, and rendering the games on the page. It also handles user interactions like clicking on a game or navigating to a different page.

- `styles.css`: This file contains all the CSS styles for the web application. It includes styles for the layout of the page, the game cards, and the pagination controls.

- `privacy-policy.html`: This file contains the privacy policy for the web application. It is loaded and displayed when the user clicks on the "Privacy Policy" link.

## Configuration

To use your own GamePix API ID, you need to replace the `sid` constant in the `main.js` file with your own API ID. Here's how you can do it:

1. Open the `main.js` file in your text editor.
2. Find the following line at the top of the file:

    ```javascript
    const sid = 'YOUR_API_ID'; // api id gamepix
    ```

3. Replace `'YOUR_API_ID'` with your own GamePix API ID. For example, if your API ID is `'YT22'`, the line should look like this:

    ```javascript
    const sid = 'YT22'; // api id gamepix
    ```

4. Save the `main.js` file.

Now, the application will use your GamePix API ID to fetch data from the GamePix API.

## How to Run

To run this project, follow these steps:

1. Clone the repository to your local machine.
2. Open the `index.html` file in a web browser.

## Demo

<a href="https://gamesite.bistondroid.repl.co/"><img src="https://img.shields.io/badge/Google_chrome-4285F4?style=for-the-badge&logo=Google-chrome&logoColor=white&label=demo&link=https%3A%2F%2Fcheck-my-ip--bistondroid.repl.co"/>
</a>

![Imgur](https://i.imgur.com/UOfTQ5F.jpg)

## Authors

 <a href="https://github.com/bagusass">
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white&label=bagusass&link=https%3A%2F%2Fgithub.com%2Fbagusass"/>
 </a>
