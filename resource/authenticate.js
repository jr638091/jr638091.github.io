window.open("https://github.com/settings/tokens", "_blank");

function save_token() {
    token = $( "#github_token" ).val();
    console.log(token)
    if (token != ""){
        console.log("saved")
        localStorage.setItem("GITHUB_PAT", token);
    }
}