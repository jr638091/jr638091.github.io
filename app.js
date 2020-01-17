// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {
    
    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;          

    // Run GitHub API function, passing in the GitHub username
    requestUserRepos(gitHubUsername);

})


function requestUserRepos(username){
    
    // Create new XMLHttpRequest object
    // const xhr = new XMLHttpRequest();
    
    // GitHub endpoint, dynamically passing in specified username
    const url = `https://github.com/login/oauth/authorize?client_id=${username}`;
   
    window.location.replace(url)

    // // Open a new connection, using a GET request via URL endpoint
    // // Providing 3 arguments (GET/POST, The URL, Async True/False)
    // xhr.open('GET', url, false);

    // // When request is received
    // // Process it here
    // xhr.send();
    


}
