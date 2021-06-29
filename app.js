// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

//require https module
const https = require('https');
//require http module for status codes
const http = require('http');

//Print Error Messages function
function printError(error) {
    console.error(error.message);
}

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
            if (response.statusCode === 200) {
            let body = '';
            //Read the data
            //response is in buffer form and toString needs to be called on data
            response.on('data', data =>{
                body += data.toString();
            });

            response.on('end', () => {
                try{
                    //Parse the data
                    const profile = JSON.parse(body);
                    //Print the data
                    printMessage(username, profile.badges.length, profile.points.JavaScript);   
                } catch (error) {
                    printError(error);
                }
                });
            } else {
                //use http object to get human readable definition of server status code
                const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }
        });
        //check for error on https request (ex: misspelled url)
        request.on('error', printError);
    } catch (error) {
        printError(error);
    }
}

//use process to get object and slice out first 2 elements in array to get only relevant indices of the array returned
//just add username after calling app.js in terminal. will printMessage for each username
const users = process.argv.slice(2);
users.forEach(getProfile);

