// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

const https = require('https');

//Function to print message to console
function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}
//Test function
function getProfile(username) {
    try {
        //Connect to API URL ('https://teamtreehouse.com/username.json')cons
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
        let body = '';
        //Read the data
        //response is in buffer form and toString needs to be called on data
        response.on('data', data =>{
            body += data.toString();
        });

        response.on('end', () => {
            //Parse the data
            const profile = JSON.parse(body);
            //Print the data
            printMessage(username, profile.badges.length, profile.points.JavaScript);    });
        });
        //check for error on https request (ex: misspelled url)
        request.on('error', error => console.error(`Problem with request: ${errror.message}`));
    } catch (error) {
        console.error(error.message);
    }
}

//use process to get object and slice out first 2 elements in array to get only relevant indices of the array returned
//just add username after calling app.js in terminal. will printMessage for each username
const users = process.argv.slice(2);
users.forEach(getProfile);

