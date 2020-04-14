const url = "https://api.github.com/users";
let username ="";


window.onload = function(){
    getUsers(username);

    $("button").click(function(){
        $("table").hide();
        name = $("input").val();
        username= "/" + name;  
        console.log(username);
        getUsers(username);
    });
  
}

function getUsers(username){
    let request = new XMLHttpRequest();
    request.open('GET', url+username);
    request.responseType = 'json';
    request.send();

    request.onload = function(){
        let users = request.response;
        showUsers(users);
    }
}

function showUsers(users){
    let user ="";

    if(users.length === undefined){
        console.log(users);
        user = {
            avatar: users.avatar_url,
            id: users.id,
            login: users.login,
            url: users.html_url,
            bio: users.bio
        }
        
        createDetail(user);
    }
    else {
        
        for(let i = 0; i < users.length; i++){
    
           user = {
               avatar: users[i].avatar_url,
               id: users[i].id,
               login: users[i].login,
               url: users[i].html_url
           }
           createTableElement(user);
       }
    }
    
}

function createTableElement(user){
    $("#user_table").append("<tr>");
    
    let object_keys = Object.keys(user);
    for(let i=0; i< object_keys.length; i++){
        let currentKey = object_keys[i];
        if(currentKey === "avatar"){
            let img = "<img src=" + user[currentKey] + " alt='avatar' width=60/>";
            $("#user_table").append("<td>" + img + "</td>");
        }
        else if(currentKey === "url"){
            let a = "<a href=" + user[currentKey] + " target='_blank'>" + user[currentKey] + "</a>";
            $("#user_table").append("<td>" + a + "</td>");
        }
        else{
            $("#user_table").append("<td>" + user[currentKey] + "</td>");
        }
    }

    $("#user_table").append("</tr>");
}

function createDetail(user){

    let details = $(".details");

    let userDetail = 
    `
        <table class="table">
            <thead>
                <tr>
                    <th><strong>Avatar</strong></th>
                    <th><strong>ID</strong></th>
                    <th><strong>Login</strong></th>
                    <th><strong>URL</strong></th>
                    <th><strong>BIO</strong></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th><img src="${user.avatar}" alt='avatar' width=60/></th>
                    <th>${user.id}</th>
                    <th>${user.login}</th>
                    <th>${user.url}</th>
                    <th>${user.bio ? user.bio : "-"}</th>
                </tr>
            </tbody>
        </table>
    `;

    details.append(userDetail);

    

}