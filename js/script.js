//targets the DIV where profile info will appear
const profileInfo = document.querySelector(".overview");

const username = "lauramarkus";

//async function to fetch info from github profile
const getInfo = async function(){
    const request = await fetch (`https://api.github.com/users/${username}`);
    const data = await request.json();
    console.log(data);
};
getInfo();


