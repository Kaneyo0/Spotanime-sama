const API = {
    PLAYLISTS: "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/playlists/",
    ALBUMS: "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/albums",
    SONGS: "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/songs"
}

const store = {
    list: {
        playlist: {
            title: 'Mes playlist',
            items: []
        },
        albums: {
            title: 'Album en tendance',
            items: [],
            detailRoute: '/albums'
        },
        songs: {
            title: 'Titres les plus écoutés',
            items: [],
            detailRoute: '/songs'
        }
    },

    async fetchMostPlayedSong() {
        try {
            const response = await fetch(`${API.SONGS}/?page=1`);
            const songs = await response.json();
            this.setMusicListImages(songs);
            return songs;
        } catch (error) {
            console.error(error);
        }
    },

    async fetchMostAlbumListen() {
        try {
            const response = await fetch(`${API.ALBUMS}?page=1`);
            let albums = await response.json();
            for(let album of albums) {
                const detailResponse = await fetch(`${API.ALBUMS}/${album.id}`);
                album = await detailResponse.json();
            }
            return albums;
        } catch (error) {
            console.error(error);
        }
    },

    async fetchPlaylists() {
        // TODO : stocker l'id des playlists dans le localstorage et les récupérer à partir de l'id
        for(const idPlaylist of localStorage.getItem('playlists')) {
            this.playlists.push(
                await fetchPlaylist(idPlaylist)
            )
        }
    },

    async fetchSong(id) {
        try {
            let response = await fetch(`${API.SONGS}/${id}`);
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    },

    async fetchAlbum(id) {
        try {
            let album;
            await fetch(`${API.ALBUMS}/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    this.setMusicListImages(data.songs);
                    album = data;
                });
            return album;
        } catch (error) {
            console.error(error);
        }
    },

    async fetchPlaylist(id) {
        try {
            let response = await fetch(`${API.PLAYLISTS}/${id}`);
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    },

    async initialize() {
        await Promise.all([
            this.fetchMostPlayedSong().then(result => {
                this.list.songs.items = result
            }),
            this.fetchMostAlbumListen().then(result => {
                this.list.albums.items = result
            })
        ]);
    },

    async setMusicListImages(musicList) {
        for (const song of musicList) {
            const songId = song.youtube.split('/').pop();
            // url permettant de récupérer les miniatures des vidéos youtube à partir de l'id de la vidéo
            song.image = `https://img.youtube.com/vi/${songId}/0.jpg`;
        }
    },
    
    add (songId) {
        const playListstorage = JSON.parse(localStorage.getItem('playlist')) || [];
        if(!playListstorage.includes(songId)) {
            playListstorage.push(songId);
            localStorage.setItem('playlist', JSON.stringify(playListstorage))
        } 
    }
}

export default store;
    