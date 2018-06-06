import io from 'socket.io-client';

const Global = {};
module.exports = Global;

export const socket = io.connect('https://jackpordi.com:443', { secure: true, reconnect: true, rejectUnauthorized: false });
