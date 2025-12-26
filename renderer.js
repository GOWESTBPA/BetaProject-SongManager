const fs = require('fs');

// Load songs from songs.json and display them
fs.readFile('songs.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error loading songs:', err);
    return;
  }

  const songs = JSON.parse(data);
  const songList = document.getElementById('song-list');
  songs.forEach(song => {
    const li = document.createElement('li');
    li.textContent = `${song.title} by ${song.artist}`;
    songList.appendChild(li);
  });
});