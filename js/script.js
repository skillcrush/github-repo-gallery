const overview = document.querySelector(".overview"); //overview is where profile information will go
const username = "AnnieCat73";
const repoList = document.querySelector(".repo-list"); //ul to display the repo list
const repos = document.querySelector(".repos");//section where all repo info lives
const repoData = document.querySelector(".repo-data");//individual repo data appear


const getGitUserInfo = async function () {
  const gitUserInfo = await fetch (`https://api.github.com/users/${username}`);
  const data = await gitUserInfo.json();
  console.log(data);
  displayUserInfo(data);
};

getGitUserInfo();

const displayUserInfo = function (data) { //data points to json
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
  //console.log(repoData);
  repoInfo(repoData);
};

const repoInfo = function (repos) {
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
  //console.log(languageData);
  
  const languages = [];
  for(const language in languageData) {
    languages.push(language);
    //console.log(languages);
  }
  displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  repos.classList.add("hide");
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
