// Assume songs.json is already loaded as 'songsData'
// UI elements and interactions for deleting a song

document.addEventListener('DOMContentLoaded', () => {
    const songList = document.getElementById('song-list'); // Assume an element displays songs

    // Function to render the song list dynamically
    function renderSongs(songs) {
        songList.innerHTML = '';
        songs.forEach((song, index) => {
            const songItem = document.createElement('li');
            songItem.textContent = `${song.title} - ${song.artist}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteSong(index));

            songItem.appendChild(deleteButton);
            songList.appendChild(songItem);
        });
    }

    // Delete song logic
    function deleteSong(index) {
        // Remove song from UI and songs' data
        const removedSong = songsData.songs.splice(index, 1);

        if (removedSong) {
            // Update songs.json file dynamically
            saveSongsData();
        }
    }

    // Save updated song data to songs.json
    function saveSongsData() {
        const fs = require('fs'); // Node.js file system
        const path = require('path');
        const filePath = path.join(__dirname, 'BetaProject/data/songs.json');

        fs.writeFileSync(filePath, JSON.stringify(songsData, null, 2), 'utf8');
        renderSongs(songsData.songs); // Re-render UI with updated list
    }

    // Initial render of songs
    renderSongs(songsData.songs);
});