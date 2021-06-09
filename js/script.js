const username = "caitlinpmarshall";
//profile information
const overview = document.querySelector(".overview");
//area to display repos
const repoListElement = document.querySelector(".repo-list");


//async to fetch GitHub API data
const fetchUser = async function(){
    const response = await fetch(`https://api.github.com/users/${username}`);
    const userData = await response.json();
    console.log(userData);
    showUserData(userData);
};

fetchUser();


const showUserData = function(userData){
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info")
    //userInfo.innerHTML = "<p>Is this even working?</p>";
    //document.body.appendChild(userInfo);
    const avatar = userData.avatar_url;
    const name = userData.name;
    const bio = userData.bio;
    const location = userData.location;
    const repos = userData.public_repos;
    userInfo.innerHTML = `
        <figure>
            <img alt="user avatar" src=${avatar} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Bio:</strong> ${bio}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Number of public repos:</strong> ${repos}</p>
        </div> 
    `;
    overview.append(userInfo);
};

const fetchRepos = async function (){
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoList = await response.json();
    //console.log(repoList);
    displayRepoInfo(repoList);
    
};

const displayRepoInfo = function (repoList){ //not sure about this parameter
    for (const repo of repoList) { // or this const
        const li = document.createElement("li");
        li.classList.add("repo");
        const repoName = repo.name;
        li.innerHTML = `<h3>${repoName}</h3>`;
        repoListElement.append(li);
    }
};

fetchRepos();