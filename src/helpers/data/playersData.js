import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPlayersByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allPlayerObjects = result.data;
      const players = [];
      if (allPlayerObjects !== null) {
        Object.keys(allPlayerObjects).forEach((playerId) => {
          const newPlayer = allPlayerObjects[playerId];
          newPlayer.id = playerId;
          players.push(newPlayer);
        });
      }
      resolve(players);
    })
    .catch((err) => reject(err));
});

const deletePlayer = (playerId) => axios.delete(`${baseUrl}/players/${playerId}.json`);

const savePlayer = (newPlayer) => axios.post(`${baseUrl}/players.json`, newPlayer);

const updatePlayer = (playerId, updatedPlayer) => axios.put(`${baseUrl}/players/${playerId}.json`, updatedPlayer);

export default {
  getPlayersByUid,
  deletePlayer,
  savePlayer,
  updatePlayer,
};
