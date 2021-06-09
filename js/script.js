const username = "caitlinpmarshall";
//profile information
const overview = document.querySelector(".overview");
//area to display repos
const repoListElement = document.querySelector(".repo-list");
//section for all repos
const allReposElement = document.querySelector(".repos");
//section for individual repo data; initally hidden
const repoDataElement = document.querySelector(".repo-data");


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
    const repos = await response.json();
    //console.log(repos);
    displayRepoInfo(repos);
    
};

const displayRepoInfo = function (repos){ //not sure about this parameter
    for (const repo of repos) { // or this const
        const li = document.createElement("li");
        li.classList.add("repo");
        const repoTitle = repo.name; //was repoName, but changed to distinguish from repoName required below
        li.innerHTML = `<h3>${repoTitle}</h3>`; 
        repoListElement.append(li);
    }
};

fetchRepos();

const repoList = repoListElement.addEventListener("click", function(e){ //can you name an event listener?
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText; //shouldn't reuse variable names
        fetchRepoData(repoName);
    }

});

const fetchRepoData = async function (repoName){ //why can we call for this? it's only defined inside that if statement.  So...probably this function will also get called inside the if statement?
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoData = await response.json();
    console.log(repoData);
    //fetch the repo's languages
    //const languages = repoName.languages_url
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages_url`);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

};