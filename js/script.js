const overview = document.querySelector(".overview"); //overview is where profile information will go
const username = "AnnieCat73";

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
};

