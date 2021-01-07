 // TODO: session null
 let allowed_names = JSON.parse(sessionStorage.getItem('allowed_names')); 
 
 function autoAdmit() {
    let spans = document.getElementsByTagName('span');
    Array.from(spans).forEach(element => {
        if (element.innerHTML == "Admit") {
            let name_div = document.getElementsByClassName('W0LGoe');
            if(allowed_names.indexOf(name_div[0].innerHTML) >= 0) {
                element.click()
            } else {
                clickDeny();
            }
            
        }
    });
}

function clickDeny() {
    let spans = document.getElementsByTagName('span');
    Array.from(spans).forEach(element => {
        if (element.innerHTML == "Deny entry") {
            element.click()
        }
    });
}

setInterval(autoAdmit, 4000)