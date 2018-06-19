import io from 'socket.io-client';

export const Global = {};

export const socket = io.connect('https://jackpordi.com:443', { secure: true, reconnect: true, rejectUnauthorized: false });
socket.on('disconnect', function (reason) {
  console.log('disconnect bc' + reason);
  // socket.emit('authentication', { username: '2@test.com', password: 'dylan' });
});
