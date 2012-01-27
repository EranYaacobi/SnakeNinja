var socket = io.connect();
  socket.on('test', function (data) {
      alert(data);
      socket.emit('test-c', { my: 'data' });
  });

socket.on('test-c', function (data)
{
    alert(data)
});