const username = "caitlinpmarshall";
//profile information
const overview = document.querySelector(".overview");

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


