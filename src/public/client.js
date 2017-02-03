$(function() {
    var socket = io();
    var username;
    var messages = $('#messages');
    var getUsername = function(name) {
        if (name != null && name != '') {
            username = name;
        } else {
            username = 'Anonymous';
        }
    };
    // you joined the room
    messages.append($('<li class="middle">').text('You joined the room.'));
    // prompt for username
    getUsername(prompt('Please enter your name.'));
    // send username
    socket.emit('new user', username);
    // send message on submit
    $('form').submit(function() {
        var msg = $('#m').val();
        socket.emit('chat message', msg);
        messages.append($('<li class="right">').text(msg));
        $('#m').val('');
        return false;
    });
    // listen for a new user
    socket.on('new user', function(name) {
        messages.append($('<li class="middle">').text(name + ' joined the room.'));
    })
    // listen for messages
    socket.on('chat message', function(msg) {
        messages.append($('<li class="left">').text(msg));
    });
    // listen for user left
    socket.on('user left', function(name) {
        messages.append($('<li class="middle">').text(name + ' left the room.'));
    });
});
