var onAuthorize = function() {
  updateLoggedIn();
  $("#output").empty();
    
  Trello.members.get("me", function(member){
    $("#fullName").text(member.fullName);
    $("#avatar").attr("src", 'https://trello-avatars.s3.amazonaws.com/' + member.avatarHash + '/30.png');
    var $boards = $("<ul class='board-list'>")
      .text("Loading Boards...")
      .appendTo("#output");
    Trello.get("members/me/boards", function(boards) {
      $boards.empty();
      $.each(boards, function(ix, board) {
        if(board.closed === false) {
          var html = '';
          console.log(board);
          html += "<li class='board'>";
          if(board.prefs.backgroundImage === null) {
            html += "<div class='board-content'>";
          } else {
            html += "<div class='board-content' style='background-image: url(" + board.prefs.backgroundImage + ")'>";
          }
          html += board.name;
          html += "</div>";
          html += "</li>";
          $boards.append(html);
          Trello.get('boards/' + board.id + '/cards', function(cards) {
            console.log(cards);
          });
        }
      });
    });
  });
};
  
var updateLoggedIn = function() {
  var isLoggedIn = Trello.authorized();
  $("#loggedout").toggle(!isLoggedIn);
  $("#loggedin").toggle(isLoggedIn);        
};
                        
Trello.authorize({
  interactive: false,
  success: onAuthorize
});

// Pop up para autenticação.
$("#connectLink").click(function(){
  Trello.authorize({
    type: "popup",
    success: onAuthorize
  })
});
var logout = function() {
  Trello.deauthorize();
  updateLoggedIn();
};

// Logout
$("#disconnect").click(logout);