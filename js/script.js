const followingContainer = document.querySelector(".following");
const discoverContainer = document.querySelector(".discover");
const repoContainer = document.querySelector(".repo-list");
const repoListOwner = document.querySelector(".repo-list-owner");
const backButton = document.querySelector(".back");
const filterInput = document.querySelector(".filter-repos");

const gitIt = async function () {
  const getFollowing = await fetch("https://api.github.com/users/redrambles/following");
  const data = await getFollowing.json();
  displayUsers(data);
};

const displayUsers = function (usersArray) {
  for (const user of usersArray) {
    const userDiv = document.createElement("div");
    userDiv.classList.add("following-user");
    userDiv.innerHTML = `
            <h2 class="repo-owner">${user.login}</h2>
            <figure>
                <img src="${user.avatar_url}" alt="User avatar" />
            </figure>
        `;
    followingContainer.append(userDiv);
  }
};

gitIt();

// Click on a user to know more
followingContainer.addEventListener("click", function (e) {
  if (e.target.matches("h2.repo-owner")) {
    const username = e.target.innerText;
    fetchUserRepos(username);
    followingContainer.classList.add("hide");
    discoverContainer.classList.remove("hide");
    filterInput.classList.remove("hide");
  }
});

const fetchUserRepos = async function (username) {
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await fetchRepos.json();
  displayRepos(repos);
  backButton.classList.remove("hide");
};

const displayRepos = function (repos) {
  repoContainer.innerHTML = "";
  repoListOwner.innerHTML = "";

  // Grab info about the GitHub user to display on left hand side of list
  const userInfo = document.createElement("div");
  const username = repos[0].owner.login;
  const avatar = repos[0].owner.avatar_url;
  userInfo.innerHTML = `
    <div class="user-info">
    <h3>${username}'s repos</h3>
    <figure>
        <img src=${avatar} alt="user avatar"/>
    </figure>
    </div>
  `;
  repoListOwner.append(userInfo);

  for (const repo of repos) {
    const repoItem = document.createElement("div");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `
        <h3>${repo.name}</h3>
        <div class="extra-info">
            <p>Main language: ${repo.language}</p>
            <p class="description">Description: ${repo.description}</p>
            <a class="visit" href=${repo.html_url} target="_blank">Visit Repo </a>
        </div>
    `;
    repoContainer.append(repoItem);
  }
};

backButton.addEventListener("click", function () {
  followingContainer.classList.remove("hide");
  discoverContainer.classList.add("hide");
  backButton.classList.add("hide");
  filterInput.classList.add("hide");
  filterInput.value = "";
});

// Dynamic search
filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  const repos = document.querySelectorAll(".repo");

  for (const repo of repos) {
    if (!repo.innerText.toLowerCase().includes(searchText.toLowerCase())) {
      repo.classList.add("hide");
    } else {
      repo.classList.remove("hide");
    }
  }
});

// !!! Unauthenticated clients can make 60 requests per hour !!! To get more requests per hour, we'll need to authenticate. In fact, doing anything interesting with the GitHub API requires authentication. Learn more about how to do that here

// Creating a token is very simple - See my new token as example
