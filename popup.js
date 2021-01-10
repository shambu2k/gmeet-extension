let teams_list_div = document.getElementById("teams_list");

function populatePopup(teamName) {
    let team_div =  document.createElement("div");
    team_div.className = "itemforlist";

    let team_name_p = document.createElement("p");
    let team_name_p_node = document.createTextNode(teamName);
    team_name_p.appendChild(team_name_p_node);

    let team_select_button = document.createElement("a");
    team_select_button.className = "btn";
    team_select_button.id = teamName;
    team_select_button.href = "/team_members.html"
    team_select_button.appendChild(document.createTextNode("select"));

    function closurFunc(team_name_bro) {
        team_select_button.addEventListener("click", function() {
            sessionStorage.setItem('selected_team', team_name_bro)
        })
    }
    
    closurFunc(teamName);

    team_div.appendChild(team_name_p);
    team_div.appendChild(team_select_button);

    return team_div;
}

const fetchTeams = () => {
    axios.get('http://127.0.0.1:8010/proxy/allteams')
        .then(response => {
            let teams = response.data;
            console.log(`GET list teams`, teams);
            teams.forEach(element => {
                teams_list_div.appendChild(populatePopup(element));
            });
        })
        .catch(error => console.error(error));
};

fetchTeams();
