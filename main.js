'use strict';

async function showAvatar() {

  // read our JSON
  let response = await fetch('./user.json');
  let user = await response.json();

  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();
  
  let reposResponse = await fetch(githubUser.repos_url);
  let repos = await reposResponse.json();

  repos.forEach(repo => {
    document.body.appendChild(createLink(repo.name, repo.html_url));
    document.body.appendChild(document.createElement('br'));
  })

  return githubUser;
}

function createLink(name, url) {
  let a = document.createElement('a');
  a.innerHTML = name;
  a.href = url;
  return a;
}

showAvatar();