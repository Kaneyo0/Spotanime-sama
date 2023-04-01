import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../layouts/Home.vue')
        },
        {
            path: '/albums/:id',
            name: 'album details',
            component: () => import('../layouts/Details.vue')
        },
        {
            path: '/artists/:id',
            name: 'artist details',
            component: () => import('../layouts/Details.vue')
        },
        {
            path: '/songs/:id',
            name: 'song details',
            component: () => import('../layouts/Details.vue')
        }
    ]
});

export default router;
