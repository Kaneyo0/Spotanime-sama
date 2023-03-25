const API = {
    PLAYLISTS: "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/playlists/",
    ALBUMS: "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/albums",
    SONGS: "https://mmi.unilim.fr/~morap01/L250/public/index.php/api/songs"
}

const store = {
    list: {
        playlist: {
            title: 'Mes playlist',
            items: [
                {
                    title: 'FEUR',
                    content: 'feur content'
                },
                {
                    title: 'FEUR',
                    content: 'feur content'
                },
                {
                    title: 'FEUR',
                    content: 'feur content'
                },
                {
                    title: 'FEUR',
                    content: 'feur content'
                }
            ]
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
            for (const song of songs) {
                const songId = song.youtube.split('/').pop();
                // url permettant de récupérer les miniatures des vidéos youtube à partir de l'id de la vidéo
                song.image = `https://img.youtube.com/vi/${songId}/0.jpg`
            }
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
    
    add (songId) {
        const playListstorage = JSON.parse(localStorage.getItem('playlist')) || [];
        if(!playListstorage.includes(songId)) {
            playListstorage.push(songId);
            localStorage.setItem('playlist', JSON.stringify(playListstorage))
        } 
    }
}

export default store;
    