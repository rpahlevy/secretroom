// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "jquery"
import "jquery_ujs"
import "popper"
import "bootstrap"

// import * as bootstrap from "bootstrap"

window.enterRoom = function() {
  localStorage['username'] = $("#username").val();
  localStorage['usercolor'] = $("#usercolor").val();
  setUserData(localStorage['username'], localStorage['usercolor']);
}

window.exitRoom = function() {
  localStorage.removeItem('username');
  localStorage.removeItem('usercolor');
  $("#username").val("");
  $("#usercolor").val(getRandomColor());
  $("#form-room").hide();
  $("#form-enter").show();
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
})