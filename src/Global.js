import io from 'socket.io-client';

export const Global = {};

export const socket = io.connect('https://jackpordi.com:443', { secure: true, reconnect: true, rejectUnauthorized: false });
