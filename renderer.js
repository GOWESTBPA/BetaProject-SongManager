// Song Manager - Add and Delete Song functionality

const fs = require('fs');
const path = require('path');

document.addEventListener('DOMContentLoaded', () => {
    const addSongBtn = document.getElementById('add-song-btn');
    const deleteSongBtn = document.getElementById('delete-song-btn');
    
    const songsFilePath = path.join(__dirname, 'songs.json');

    // Load songs from songs.json
    function loadSongs() {
        try {
            const data = fs.readFileSync(songsFilePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading songs:', error);
            return [];
        }
    }

    // Save songs to songs.json
    function saveSongs(songs) {
        try {
            fs.writeFileSync(songsFilePath, JSON.stringify(songs, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error('Error saving songs:', error);
            return false;
        }
    }

    // Add Song button handler
    addSongBtn.addEventListener('click', () => {
        const title = prompt('Enter song title:');
        if (!title || title.trim() === '') {
            alert('Song title is required!');
            return;
        }

        const artist = prompt('Enter artist name:');
        if (!artist || artist.trim() === '') {
            alert('Artist name is required!');
            return;
        }

        const songs = loadSongs();
        songs.push({ title: title.trim(), artist: artist.trim() });
        
        if (saveSongs(songs)) {
            alert(`Song "${title}" by ${artist} added successfully!`);
        } else {
            alert('Failed to add song. Please try again.');
        }
    });

    // Delete Song button handler
    deleteSongBtn.addEventListener('click', () => {
        const songs = loadSongs();
        
        if (songs.length === 0) {
            alert('No songs available to delete!');
            return;
        }

        // Create a list of songs for user to choose from
        let songList = 'Available songs:\n\n';
        songs.forEach((song, index) => {
            songList += `${index + 1}. "${song.title}" by ${song.artist}\n`;
        });

        const title = prompt(songList + '\nEnter the title of the song to delete:');
        if (!title || title.trim() === '') {
            return; // User cancelled or entered empty string
        }

        const index = songs.findIndex(song => song.title.toLowerCase() === title.trim().toLowerCase());
        
        if (index !== -1) {
            const deletedSong = songs.splice(index, 1)[0];
            if (saveSongs(songs)) {
                alert(`Song "${deletedSong.title}" by ${deletedSong.artist} deleted successfully!`);
            } else {
                alert('Failed to delete song. Please try again.');
            }
        } else {
            alert(`Song "${title}" not found!`);
        }
    });
});