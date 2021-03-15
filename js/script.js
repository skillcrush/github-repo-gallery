const intro = document.querySelector(".intro");
const repoList = document.querySelector(".repo-list");
const backButton = document.querySelector(".back");
const filterInput = document.querySelector(".filter-repos");
const getReposButton = document.querySelector(".get-repos");
const ghUsername = "redrambles";

const gitUserInfo = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${ghUsername}`);
  const data = await userInfo.json();
  console.log(data);
  displayUserInfo(data);
};

gitUserInfo();

const displayUserInfo = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
    <p>${data.name}</p>
    <p>${data.bio}</p>
    <p>${data.location}</p>
    <p>Number of public repos: ${data.public_repos}</p>
    <figure>
      <img class="user-avatar" alt="user avatar" src=${data.avatar_url} />
    </figure>
  `;
  intro.append(div);
  getReposButton.classList.remove("hide");
};

const gitRepos = async function (ghUsername) {
  const fetchRepos = await fetch(`https://api.github.com/users/${ghUsername}/repos`);
  console.log(`fetchRepos = ${fetchRepos}`);
  const repoData = await fetchRepos.json();
  displayRepos(repoData);
};

getReposButton.addEventListener("click", function () {
  gitRepos(ghUsername);
});

const displayRepos = function (repos) {
  // Grab info about the GitHub user to display on left hand side of list
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.innerText = "something";
    // repoList.append(repoItem);
    console.log(repo);
  }

  // for (const repo of repos) {
  //   const repoItem = document.createElement("div");
  //   repoItem.classList.add("repo");
  //   repoItem.innerHTML = `
  //       <h3>${repo.name}</h3>
  //       <div class="extra-info">
  //           <p>Main language: ${repo.language}</p>
  //           <p class="description">Description: ${repo.description}</p>
  //           <a class="visit" href=${repo.html_url} target="_blank">Visit Repo </a>
  //       </div>
  //   `;
  //   repoContainer.append(repoItem);
  // }
};

// // Click on a user to know more
// followingContainer.addEventListener("click", function (e) {
//   if (e.target.matches("h2.repo-owner")) {
//     const username = e.target.innerText;
//     fetchUserRepos(username);
//     followingContainer.classList.add("hide");
//     discoverContainer.classList.remove("hide");
//     filterInput.classList.remove("hide");
//   }
// });

// backButton.addEventListener("click", function () {
//   followingContainer.classList.remove("hide");
//   discoverContainer.classList.add("hide");
//   backButton.classList.add("hide");
//   filterInput.classList.add("hide");
//   filterInput.value = "";
// });

// // Dynamic search
// filterInput.addEventListener("input", function (e) {
//   const searchText = e.target.value;
//   const repos = document.querySelectorAll(".repo");

//   for (const repo of repos) {
//     if (!repo.innerText.toLowerCase().includes(searchText.toLowerCase())) {
//       repo.classList.add("hide");
//     } else {
//       repo.classList.remove("hide");
//     }
//   }
// });

// !!! Unauthenticated clients can make 60 requests per hour !!! To get more requests per hour, we'll need to authenticate. In fact, doing anything interesting with the GitHub API requires authentication. Learn more about how to do that here

// Creating a token is very simple - See my new token as example
