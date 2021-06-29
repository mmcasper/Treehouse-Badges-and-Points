// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

const https = require('https');
//const username = 'meghancasper';

//Function to print message to console
function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}
//Test function
//printMessage('meghancasper', 100, 200000);
function getProfile(username) {

    //Connect to API URL ('https://teamtreehouse.com/username.json')cons
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
    //use console.dir to get object properties on https request.
    //console.dir(repsonse);
    //console.log(response.statusCode);
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
        printMessage(username, profile.badges.length, profile.points.JavaScript);
        //console.dir(profile);
    });
});
}

//getProfile('chalkers');
//getProfile('meghancasper');
//condense repetitive code into forEach loop
//const users = ['chalkers', 'meghancasper'];

//use process to get object and slice out first 2 elements in array to get only relevant indices of the array returned
//just add username after calling app.js in terminal. will printMessage for each username
const users = process.argv.slice(2);
users.forEach(getProfile);

