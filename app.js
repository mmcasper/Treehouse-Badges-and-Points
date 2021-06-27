// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

//Function to print message to console
function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} in JavaScript`;
    console.log(message);
}
//Connect to API URL ('https://teamtreehouse.com/username.json')
//Read the data
//Parse the data
//Print the data
