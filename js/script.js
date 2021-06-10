const username = "caitlinpmarshall";
//profile information
const overview = document.querySelector(".overview");
//area to display repos
const repoListElement = document.querySelector(".repo-list");
//section for all repos
const allReposElement = document.querySelector(".repos");
//section for individual repo data; initally hidden
const repoDataElement = document.querySelector(".repo-data");
//button to return to full repo gallery
const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");



//async to fetch GitHub API data
const fetchUser = async function(){
    const response = await fetch(`https://api.github.com/users/${username}`);
    const userData = await response.json();
    //console.log(userData);
    showUserData(userData);
};

fetchUser();

//display basic data about the featured GitHub user
const showUserData = function(userData){
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info")
    //userInfo.innerHTML = "<p>Is this even working?</p>";
    //document.body.appendChild(userInfo);
    const avatar = userData.avatar_url;
    const name = userData.name;
    const bio = userData.bio;
    const location = userData.location;
    const publicRepos = userData.public_repos;
    userInfo.innerHTML = `
        <figure>
            <img alt="user avatar" src=${avatar} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Bio:</strong> ${bio}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Number of public repos:</strong> ${publicRepos}</p>
        </div> 
    `;
    overview.append(userInfo);
};

//fetch all repos of this user, sorted by most recently updated
const fetchRepos = async function (){
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const allRepos = await response.json();
    //console.log(repos);
    displayReposList(allRepos);
    
};

//display the fetched repos
const displayReposList = function (repos){ //not sure about this parameter
    filterInput.classList.remove("hide");
    for (const repo of repos) { // or this const
        const li = document.createElement("li");
        li.classList.add("repo");
        const repoTitle = repo.name; //was repoName, but changed to distinguish from repoName required below
        li.innerHTML = `<h3>${repoTitle}</h3>`; 
        repoListElement.append(li);
    }
};

fetchRepos();

//listen for click on a single repo's name
const repoList = repoListElement.addEventListener("click", function(e){ //can you name an event listener? Apparently yes.
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText; //shouldn't reuse variable names
        fetchSingleRepoData(repoName);
    }

});

//grab data for the clicked-on single repo
const fetchSingleRepoData = async function (repoName){ //why can we call for this parameter? it's only defined inside that if statement.  So...probably this function will also get called inside the if statement? Update: Yep, that's what happened.
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await response.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
    for (let language in languageData) {
        languages.push(language);
    }
    console.log(languages);
    displaySingleRepoInfo(repoInfo, languages);
};

//display some stats about the selected repo
const displaySingleRepoInfo = function (repoName, languages){
    repoDataElement.innerHTML = "";
    const singleRepoDiv = document.createElement("div"); 
    const name = repoName.name;
    const description = repoName.description;
    const defaultBranch = repoName.default_branch;
    const htmlUrl = repoName.html_url;
    singleRepoDiv.innerHTML = `
        <h3>Name: ${name}</h3>
        <p>Description: ${description}</p>
        <p>Default Branch: ${defaultBranch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${htmlUrl}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoDataElement.append(singleRepoDiv);
    repoDataElement.classList.remove("hide");
    allReposElement.classList.add("hide");
    viewReposButton.classList.remove("hide");
};

//button to leave single repo stats and return to full list of repos
viewReposButton.addEventListener("click", function(){
    repoDataElement.classList.add("hide");
    allReposElement.classList.remove("hide");
    viewReposButton.classList.add("hide");
});

//search box to filter repos by name
filterInput.addEventListener("input", function(e){
    const searchText = e.target.value;
    const lowerSearchText = searchText.toLowerCase();
    const repos = document.querySelectorAll(".repo");
    //console.log(repos);
    //console.log(lowerSearchText);
    for (const repo of repos) {
        let lowerRepoName = repo.innerText.toLowerCase();
        if (lowerRepoName.includes(lowerSearchText)) { 
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }  
    }
});

//to do: add functionality to filter by language
