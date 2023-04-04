const API = {
    PLAYLISTS: "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/playlists/",
    ALBUMS: "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/albums",
    ARTISTS: "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/artists",
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
        artists: {
            title: 'Artistes les plus écoutés',
            items: [],
            detailRoute: '/artists'
        },
        songs: {
            title: 'Titres les plus écoutés',
            items: [],
            detailRoute: '/songs'
        }
    },

    async fetchMostPlayedSong() {
        try {
            const response = await fetch(`${API.SONGS}?page=1`);
            let songs = await response.json();
            songs = this.setMusicListImages(songs);
            return songs;
        } catch (error) {
            console.error(error);
        }
    },

    async fetchMostListenedArtist() {
        try {
            const response = await fetch(`${API.ARTISTS}?page=1`);
            const data = await response.json();
            const artists = [];

            for (const currentData of data) {
                artists.push({
                    ...currentData,
                    title: currentData.name,
                    image: ''
                });
            }

            return artists;
        } catch (error) {
            console.error(error);
        }
    },

    async fetchMostListenedAlbum() {
        try {
            const response = await fetch(`${API.ALBUMS}?page=1`);
            let albums = await response.json();
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

    async fetchArtist(id) {
        try {
            let albumId;
            const response = await fetch(`${API.ARTISTS}/${id}`);
            const data = await response.json();
            const promises = [];
            const artist = {
                ...data,
                albums: []
            };

            for (const currentData of data.albums) {
                albumId = currentData.split('/')[7];
                promises.push(this.fetchAlbum(albumId)
                    .then(album => {
                        artist.albums.push(album);
                    })
                );
            }

            await Promise.all(promises);

            return artist;
        } catch (error) {
            console.error(error);
        }
    },

    /**
     * 
     * @param {*} id 
     * @returns {Promise<*>}
     */
    async fetchAlbum(id) {
        try {
            const response = await fetch(`${API.ALBUMS}/${id}`);
            const data = await response.json();
            const album = {
                ...data,
                songs: []
            };
            
            this.setMusicListImages(data.songs).then(songs => {
                album.songs = songs;
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

    async fetchResearch(research) {
        try {
            const response = await fetch(`${API.SONGS}?page=&title=${research}`);
            let songs = await response.json();
            // songs = this.setMusicListImages(songs);
            return songs;
        } catch (error) {
            console.error(error);
        }
    },

    async initialize() {
        await Promise.all([
            this.fetchMostPlayedSong().then(result => {
                this.list.songs.items = result
            }),
            this.fetchMostListenedArtist().then(result => {
                this.list.artists.items = result
            }),
            this.fetchMostListenedAlbum().then(result => {
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

        return musicList;
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
    