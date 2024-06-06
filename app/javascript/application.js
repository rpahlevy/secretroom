// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "jquery"
import "jquery_ujs"
import "popper"
import "bootstrap"
import "channels"

// import * as bootstrap from "bootstrap"

window.enterRoom = function() {
  var agreed = confirm("IMPORTANT! This is anonymous chat that only broadcasted once. No data is saved in our server.");
  if (agreed) {
    localStorage['username'] = $("#username").val();
    localStorage['usercolor'] = $("#usercolor").val();
    setUserData(localStorage['username'], localStorage['usercolor']);
  }
}

window.exitRoom = function() {
  localStorage.removeItem('username');
  localStorage.removeItem('usercolor');
  $("#username").val("");
  $("#usercolor").val(getRandomColor());
  $("#form-room").hide();
  $("#form-enter").show();
}

window.sendMessage = function() {
  var message = $("#message").val();
  if (!message) {
    alert("Message cannot be empty!");
    return;
  }

  window.chat_app.send_message({
    message: message,
    username: window.username,
    usercolor: window.usercolor
  })

  $("#message").val("");
  $("#message").focus();
}

window.appendThread = function(data) {
  var template = null
  if (data.username == window.username && data.usercolor == window.usercolor) {
    template = `
      <div #self>
        <div class="d-flex justify-content-end">
          <p class="small mb-1">
            ${data.username}
          </p>
        </div>
        <div class="d-flex flex-row justify-content-end mb-3 pt-1">
          <div>
            <p class="small p-2 me-3 rounded-3 bg-light">
              ${data.message}
            </p>
          </div>
          <div class="rounded" style="width: 36px; height: 36px; background-color: ${data.usercolor}"></div>
        </div>
      </div>`;
  } else {
    template = `
      <div #others>
        <div class="d-flex justify-content-start">
          <p class="small mb-1">
            ${data.username}
          </p>
        </div>
        <div class="d-flex flex-row justify-content-start mb-3 pt-1">
          <div class="rounded" style="width: 36px; height: 36px; background-color: ${data.usercolor}"></div>
          <div>
            <p class="small p-2 ms-3 rounded-3 bg-light">
              ${data.message}
            </p>
          </div>
        </div>
      </div>`;
  }
  $("#thread").append(template);
  $("#thread").stop().animate({ scrollTop: $("#thread")[0].scrollHeight}, 500);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setUserData(username, usercolor) {
  window.username = username;
  window.usercolor = usercolor;
  $(".username").text(username);
  $(".usercolor").val(usercolor);
  $("#form-enter").hide();
  $("#form-room").show();
}

$(function() {
  var username = localStorage['username'];
  var usercolor = localStorage['usercolor'];
  if (username && usercolor) {
    setUserData(username, usercolor);
  } else {
    $("#usercolor").val(getRandomColor());
  }

  // listen to enter
  $(document).on('keypress',function(e) {
    if(e.which == 13) {
      var activeId = $(document.activeElement).attr('id')
      switch (activeId) {
        case "username":
          window.enterRoom();
          break;

        case "message":
          window.sendMessage();
          break;
      
        default:
          break;
      }
    }
});
})
