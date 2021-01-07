let team_mems_list_div = document.getElementById("mems_list");

const fetchTeamMembers = (teamName) => {
    axios.get(`http://127.0.0.1:8010/proxy/team/${teamName}`)
        .then(response => {
            let people = response.data;
            console.log(`GET list mems`, people);
            sessionStorage.setItem('allowed_names', JSON.stringify(people));
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