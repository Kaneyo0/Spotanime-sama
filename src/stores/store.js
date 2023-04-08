const API = {
    PLAYLISTS: "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/playlists",
    ALBUMS: "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/albums",
    ARTISTS: "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/artists",
    SONGS: "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/songs"
}

const store = {
    clickedSong: Object,
    showPlaylistForm: false,
    playlistIRI: '/~morap01/L250/public/index.php/api/songs',
    list: {
        playlist: {
            title: 'Mes playlist',
            items: [],
            detailRoute: '/playlists'
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

    async initialize() {
        await Promise.all([
            this.fetchMostPlayedSong().then(result => {
                this.list.songs.items = result;
            }),
            this.fetchMostListenedArtist().then(result => {
                this.list.artists.items = result;
            }),
            this.fetchMostListenedAlbum().then(result => {
                this.list.albums.items = result;
            }),
            this.fetchPlaylists().then(result => {
                this.list.playlist.items = result || []
            })
        ]);
    },

    async fetchMostPlayedSong(title = "") {
        try {
            let request = `${API.SONGS}?page=1`;
            if (title) request = `${API.SONGS}?page=1&title=${title}`;
            const response = await fetch(request);
            let songs = await response.json();
            songs = this.setMusicListImages(songs);
            return songs;
        } catch (error) {
            console.error(error);
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
    
    async fetchMostListenedArtist(name = "") {
        try {
            let request = `${API.ARTISTS}?page=1`;
            if (name) request = `${API.ARTISTS}?page=1&title=${name}`;
            const response = await fetch(request);
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
    
    async fetchMostListenedAlbum(title = "") {
        try {
            let request = `${API.ALBUMS}?page=1`;
            if (title) request = `${API.ALBUMS}?page=1&title=${title}`;
            const response = await fetch(request);
            let albums = await response.json();
            return albums;
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
 
    
    async fetchPlaylists() {
        const listId = JSON.parse(localStorage.getItem('playlistsId')) || [];
        const playlists = [];
        for(const id of listId) {
            playlists.push(await this.fetchPlaylist(id))
        }
        return playlists
    },
    
    async fetchPlaylist(playlistId) {
        try {
            let response = await fetch(`${API.PLAYLISTS}/${playlistId}`);
            const { name: title, songs, id} = await response.json()
            
            return { id, title, songs};
        } catch (error) {
            console.error(error);
        }
    },

    async insertPlaylist(playlistData) {
        const response = await fetch(`${API.PLAYLISTS}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(playlistData)
        });
        const { id } = await response.json();
        return id;
    },

    async patchPlaylist(playlistData) {
        await fetch(`${API.PLAYLISTS}/${playlistData.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(playlistData)
        });
    },
    
    async fetchResearch(research) {
        try {
            const searchResult = {
                songs: [],
                albums: [],
                artists: []
            };
            
            await Promise.all([
                this.fetchMostPlayedSong(research).then(result => {
                    searchResult.songs = result;
                }),
                this.fetchMostListenedAlbum(research).then(result => {
                    searchResult.albums = result;
                }),
                this.fetchMostListenedArtist(research).then(result => {
                    searchResult.artists = result;
                })
            ]);
            
            return searchResult;
        } catch (error) {
            console.error(error);
        }
    },
    
    async setMusicListImages(musicList) {
        for (const song of musicList) {
            const songId = song.youtube.split('/').pop();
            // url permettant de récupérer les miniatures des vidéos youtube à partir de l'id de la vidéo
            song.image = `https://img.youtube.com/vi/${songId}/0.jpg`;
        }
        
        return musicList;
    },
    
    showForm() {
        if(!this.showPlaylistForm) {
            this.showPlaylistForm = true;
            document.querySelector('.container__lists')?.classList.add('blur');
        }
    },

    hideForm () {
        this.showPlaylistForm = false;
        document.querySelector('.container__lists')?.classList.remove('blur');
    }
}

export default store;
