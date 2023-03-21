<script>
    import CardList from './components/CardList.vue';
    import Header from './components/Header.vue';

    export default {
        name: "App",
        data() {
            return {
                mostPlayedSongs: [],
                mostAlbums: [],
                playlists: []
            }
        },
        components: {
            CardList,
            Header
        },  
        methods: {
            async fetchMostPlayedSong() {
                try {
                    const response = await fetch("https://mmi.unilim.fr/~morap01/L250/public/index.php/api/songs?page=1");
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
                    const response = await fetch("https://mmi.unilim.fr/~morap01/L250/public/index.php/api/albums?page=1");
                    let albums = await response.json();
                    for(let album of albums) {
                        const detailResponse = await fetch(`https://mmi.unilim.fr/~morap01/L250/public/index.php/api/albums/${album.id}`);
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
                    let response = await fetch(`https://mmi.unilim.fr/~morap01/L250/public/index.php/api/playlists/${id}`);
                    return await response.json();
                } catch (error) {
                    console.error(error);
                }
            }
        },
        async created() {
            await Promise.all([
                this.fetchMostPlayedSong().then(result => {
                    this.mostPlayedSongs = result
                }),
                this.fetchMostAlbumListen().then(result => {
                    this.mostAlbums = result
                })
            ]);
        },
    }
</script>

<template>
    <Header></Header>
    <main class="container">
        <CardList :title="'Mes playlist'" :cards="[
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
            ]"/>
        <CardList :title="'Album en tendance'" :cards="mostAlbums"/>
        <CardList :title="'Titres les plus écoutés'" :cards="mostPlayedSongs"/>
    </main>
</template>