//targets the DIV where profile info will appear
const profileInfo = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const username = "lauramarkus";


//async function to fetch info from github profile
const getInfo = async function(){
    const request = await fetch (`https://api.github.com/users/${username}`);
    const data = await request.json();
    console.log(data);
    
    displayUserInfo(data);

};
getInfo();

const displayUserInfo = function (data){
    const avatar = data.avatar_url;
    const myname = data.name;
    const bio = data.bio;
    const location = data.location;
    const numRepos = data.public_repos;


    const infoDiv = document.createElement("div");
        infoDiv.classList.add("user-info");
        infoDiv.innerHTML= `
        <figure> 
            <img src=${avatar} alt="user avatar" /> </figure>
        <div>
            <p><strong>Name:</strong> ${myname}</p>
            <p><strong>Bio:</strong> ${bio}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Number of public repos:</strong> ${numRepos}</p>
        </div> 
        `;
        profileInfo.append(infoDiv);
};

//async function to fetch my github repos
const getRepos = async function (){
    const repoRequest = await fetch (`https://api.github.com/users/${username}/repos?direction"asc&per_page=100`);
    const repoData = await repoRequest.json();
    console.log(repoData);
};
getRepos(); 


    