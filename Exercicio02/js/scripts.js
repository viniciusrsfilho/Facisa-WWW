const url = "https://covid19-brazil-api.now.sh/api/report/v1";

window.onload = function(){
    getStates();
}

function getStates(){
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.send();

    request.onload = function(){
        let states = request.response;
        showStates(states);
        
    }
}


function showStates({data:states}){  //{data:[{state},...]}

    let state = "";
    for(let i = 0; i < states.length; i++) {
        state = {
            state: states[i].state,
            cases: states[i].cases,
            deaths: states[i].deaths
        }
        createTableElement(state); 
    }
}


function createTableElement(state){
    $("#state_table").append("<tr>");
    
    let chaves = Object.keys(state);
    for (let i = 0; i < chaves.length; i++) {
        let chave = chaves[i];
        $("#state_table").append("<td>" + state[chave] + "</td>");
    }

    $("#state_table").append("</tr>");
}