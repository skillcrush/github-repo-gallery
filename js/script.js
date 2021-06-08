const overview = document.querySelector(".overview"); //overview is where profile information will go
const username = "AnnieCat73";
const repoList = document.querySelector(".repo-list"); //ul to display the repo list


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
  console.log(repoData);
  repoInfo(repoData);
}

const repoInfo = function (repos) {
  for(const repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
  }
};

