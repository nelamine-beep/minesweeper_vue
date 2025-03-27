import { createRouter, createWebHistory } from 'vue-router';
import Settings from '../components/Settings.vue';
import Game from '../components/GameBoard.vue';
import Leaderboard from '../components/LeaderBoard.vue';
import NotFound from '../components/NotFound.vue'

const routes = [
  { path: '/', redirect: '/settings' },
  { path: '/settings', component: Settings },
  { path: '/game', component: Game },
  { path: '/leaderboard', component: Leaderboard },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory('/minesweeper_vue/'),
  routes,
});

export default router;