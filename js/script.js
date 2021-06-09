const overview = document.querySelector(".overview"); 
const username = "AnnieCat73";
const repoList = document.querySelector(".repo-list"); 
const allReposContainer = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backToRepoBtn = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");


const getGitUserInfo = async function () {
  const gitUserInfo = await fetch (`https://api.github.com/users/${username}`);
  const data = await gitUserInfo.json();
  displayUserInfo(data);
};

getGitUserInfo();

const displayUserInfo = function (data) { 
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
  <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>
  `;
  overview.append(div);   
  getGitRepos();     
};

const getGitRepos = async function () {
  const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await fetchRepos.json();
  repoInfo(repoData);
};

const repoInfo = function (repos) {
  filterInput.classList.remove("hide");
  for(const repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
  }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

const getRepoInfo = async function (repoName) {
  const fetchInfo  = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchInfo.json();
  console.log(repoInfo);

  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  
  
  const languages = [];
  for(const language in languageData) {
    languages.push(language);
  }
  displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
  backToRepoBtn.classList.remove("hide");
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  allReposContainer.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoData.append(div);
};

backToRepoBtn.addEventListener("click", function () {
  allReposContainer.classList.remove("hide");
  repoData.classList.add("hide");
  backToRepoBtn.classList.add("hide");
});


filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const searchTextLowercase = searchText.toLowerCase();

  for (const repo of repos) {
    const textLowercase = repo.innerText.toLowerCase();
    if (textLowercase.includes(searchTextLowercase)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});


