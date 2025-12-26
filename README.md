# BetaProject-SongManager

A simple Node.js module for managing songs in the BetaProject repository.

## Overview

This module provides core functionality to add and delete songs by directly interacting with the BetaProject repository's `songs.json` file.

## Features

- **Add Songs**: Add new songs with title and artist information
- **Delete Songs**: Remove existing songs by title
- **Read Songs**: Retrieve the current list of songs

## Usage

```javascript
const { addSong, deleteSong, readSongs } = require('./index.js');

// Add a new song
addSong('My Song', 'My Artist');

// Delete a song by title
deleteSong('My Song');

// Read all songs
const songs = readSongs();
console.log(songs);
```

## File Structure

The module interacts with the BetaProject repository's songs.json file located at:
```
../BetaProject/data/songs.json
```

You can override this path by setting the `BETAPROJECT_SONGS_PATH` environment variable:
```bash
export BETAPROJECT_SONGS_PATH=/path/to/your/BetaProject/data/songs.json
```

## Requirements

- Node.js
- BetaProject repository should be in the parent directory with the structure: `BetaProject/data/songs.json`
