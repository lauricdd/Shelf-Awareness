var currentUser ;
$(document).ready(function() {
  getUser();
  getBooks();
  getBestSellers();
  getFavoriteBooks();
});

function getBooks() {
  fetch('v2/books')
    .then(function(response) {
      response.json()
        .then(function(json) {
          for (let i = 0; i < json.length; i++) {

            let {
              id,
              cover,
            } = json[i];

            if (i <= 4) {
                $("#books-list").append(`<a href="pages/book.html?id=${id}"><img src="${cover}" class="img-thumbnail cover-thumbnail m-4" alt="cover"></a>`);
            }

          }
        });
    });
}

function getFavoriteBooks(){
    fetch('v2/books/favorite')
       .then(function(response) {
          response.json()
       .then(function(json) {
         for (let i = 0; i < json.length; i++) {
           let {
               id,
               cover,
           } = json[i];
           $("#favorite-readings-home").append(`<a href="pages/book.html?id=${id}"><img src="${cover}" class="img-thumbnail cover-thumbnail m-4" alt="cover"></a>`);
         }
       });
    });
}
function getBestSellers(){
    fetch('v2/books/bestSellers')
      .then(function(response) {
         response.json()
      .then(function(json) {
        for (let i = 0; i < json.length; i++) {
          let {
               id,
               cover,
          } = json[i];
          $("#best-sellers-home").append(`<a href="pages/book.html?id=${id}"><img src="${cover}" class="img-thumbnail cover-thumbnail m-4" alt="cover"></a>`);
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
          // alert(data.status);
          if(data.error=="no active user"){
            // toastr.warning("You are not logged in");
          } else{
            var user = data[0];
            currentUser = user;
            if (user != undefined) {
              $('#login').empty();
              $('#loggedIn').empty();
              $('#register').empty();
              $('#loggedIn').append('<a class="btn btn-default btn-sm ml-3" id="loggedIn">' + user.name + '</a>');
              $('#logout').append('<a class="btn btn-default btn-sm ml-3" id="logout"><i class="fa fa-sign-in"></i> Sign out</a>');
            $('#cartDiv').empty();
            $('#cartDiv').append(`  <a class="btn btn-primary btn-sm ml-3" href="pages/cart.html">
                  <i class="fa fa-shopping-cart"></i> Cart
                </a>`);

            } else {
              $('#logout').empty();
            }
          }

        })
        .catch(err => {
          // toastr.error("You are not logged in");
        });

    }).catch(err => {
      // toastr.error("You are not logged in");
    });
}

function getLoggedInUser() {

  return currentUser;
}
