var currentUser = {};
$(document).ready(function() {
    getUser();
    getBooks();
});

function getBooks() {
    fetch('v2/books')
        .then(function(response) {
            response.json()
                .then(function(json) {
                    for (let i = 0; i < json.length; i++) {
                        let listItem = document.createElement("div");
                        listItem.setAttribute('class', 'col-sm-4 col-md-6 col-lg-4');

                        let { id, title, cover, author, genre, price } = json[i];
                        listItem.innerHTML =
                            `<div class="card mb-4">
                  <div style = "width: 50em; height: 20em; " >
                    <a class="text-dark" href="pages/book.html?id=${id}">
                        <img class="card-header" src="${cover}" alt="Card image cap" style="max-width: 100%;max-height: 100%;" />
                    </a>
                  </div>
                  <div class="card-body">
                   <small class="text-primary"> ${genre}</small>
                   <p class="card-title"><a class="text-dark" href="pages/book.html?id=${id}">${title}</a></p>
                   <p class="card-subtitle"><small class="font-italic">${author.name}</small></p>

                   <div class="card-footer">
                       <div class="row text-center">
                           <div class="col-xs-6">
                            <small class="text-muted">$ ${price.value} ${price.currency}</small>
                           </div>
                           <div class="col-xs-6">
                            <a class="pull-right btn btn-primary btn-sm ml-3" href="cart.html">
                                <i class="fa fa-shopping-cart"></i> Cart
                            </a>
                           </div>

                       </div>
                       </div>
                  </div>
                </div>`;

                        $("#books-list").append(listItem);
                    }
                });
        });
}

$(document).on("click", "#logout", function(e) {
    e.preventDefault();
    fetch('v2/users/logoutUser')
        .then(function(response) {
            response.json()
                .then(function(data) {
                    var user = data;
                    if (user.loggedin == false) {
                        window.location = "/index.html";
                    }
                });
        });
});

function getUser() {
    fetch('v2/users/loggedInUser')
        .then(function(response) {
            // if(response.status=)
            response.json()
                .then(function(data) {
                    var user = data[0];
                    currentUser = user;
                    if (user != undefined) {
                        $('#login').empty();
                        $('#loggedIn').empty();
                        $('#loggedIn').append('<a class="btn btn-default btn-sm ml-3" id="loggedIn">' + user.name + '</a>');
                        $('#logout').append('<a class="btn btn-default btn-sm ml-3" id="logout"><i class="fa fa-sign-in"></i> Sign out</a>');
                    } else{
                        $('#logout').empty();
                    }
                });
        });

}
function getLoggedInUser(){
    return currentUser;
}
