var allowed_peeps;

function clickDeny() {
    let spans = document.getElementsByTagName('span');
    Array.from(spans).forEach(element => {
        if (element.innerHTML == "Deny entry") {
            element.click()
        }
    });
}

chrome.storage.local.get('allowed_names', function(result) {
    allowed_peeps = JSON.parse(result.allowed_names)
  });

var timesRun = 0;
var interval = setInterval(function(){
    timesRun += 1;
    if(timesRun === 4){
        clearInterval(interval);
    }
    chrome.storage.local.get('allowed_names', function(result) {
        allowed_peeps = JSON.parse(result.allowed_names)
      });
    console.log('allowed people are -- '+allowed_peeps)
    let spans = document.getElementsByTagName('span');
    console.log("Auto admit")
    Array.from(spans).forEach(element => {
        if (element.innerHTML == "Admit") {
            let name_div = document.getElementsByClassName('W0LGoe');
            if(allowed_peeps.indexOf(name_div[0].innerHTML) >= 0) {
                element.click()
            } else {
                clickDeny();
            }
            
        }
    });
}, 4000); 