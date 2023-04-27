import io from "socket.io-client";
import React from 'react';
import store from '../store';
import lobbySlice from "../lobbySlice";

// export const socket = io.connect('https://sloticon.onrender.com');
export const socket = io.connect('https://bingobangos-probable-parakeet-rj6wpvp69wrcppvq-3000.preview.app.github.dev');
export const SocketContext = React.createContext();

socket.on('connect', () => {

  socket.emit('login', {
    key: localStorage.getItem('key'),
  });
  const waitForLoginTimeout = setTimeout(() => {
    // propably invalid key in localStorage
    localStorage.removeItem('key');

    socket.emit('login', {
      key: localStorage.getItem('key'),
    });
  }, 5000);

  socket.on('login', (data) => {
    clearTimeout(waitForLoginTimeout);

    if (data.status === 'logged-in') {
      localStorage.setItem('key', data.key);

      store.dispatch(lobbySlice.actions.updateLoginState({
        status: data.status,
        username: data.username,
      }));
      store.dispatch(lobbySlice.actions.updateBalance(data.balance));
    }
  });
});

socket.on('disconnect', () => {
  store.dispatch(lobbySlice.actions.updateLoginState('logged-out'));
  store.dispatch(lobbySlice.actions.updateBalance(0));
});
