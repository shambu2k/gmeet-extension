let team_mems_list_div = document.getElementById("mems_list");

// This code is temporary, to auto admit people
function injectTheScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(tabs[0].url.slice(0,24) === "https://meet.google.com/") chrome.tabs.executeScript(tabs[0].id, {file: "content.js"});
    });
}

const fetchTeamMembers = (teamName) => {
    axios.get(`http://127.0.0.1:8010/proxy/team/${teamName}`)
        .then(response => {
            let people = response.data;
            console.log(`GET list members`, people);

            chrome.storage.local.set({'allowed_names': JSON.stringify(people)}, function() {
                console.log('Value is set to ' + JSON.stringify(people));
                injectTheScript();
              });

            people.forEach(element => {
                team_mems_list_div.appendChild(populatePopup(element));
            });
        })
        .catch(error => console.error(error));
}

function populatePopup(personName) {
    let people_name_p = document.createElement("p");
    let people_name_p_node = document.createTextNode(personName);
    people_name_p.appendChild(people_name_p_node);

    return people_name_p;
}

fetchTeamMembers(sessionStorage.getItem('selected_team'));



