import {defineAsyncComponent} from "vue";
import {createRouter, createWebHistory} from 'vue-router';

import CoachesList from './pages/coaches/CoachesList.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js';
import PlansList from "@/pages/plans/PlansList";
import createPlan from "@/pages/plans/CreatePlan";
import PlanDetails from "@/pages/plans/PlanDetails";
import HomePage from "@/pages/homePage/HomePage";

const CoachDetail = defineAsyncComponent(() => import('./pages/coaches/CoachDetail.vue'));
const ContactCoach = defineAsyncComponent(() => import('./pages/requests/ContactCoach.vue'));
const RequestsReceived = defineAsyncComponent(() => import('./pages/requests/RequestsReceived.vue'));
const UserAuth = defineAsyncComponent(() => import('./pages/auth/UserAuth.vue'));
const userProfile = defineAsyncComponent(() => import ('./pages/profile/userProfile.vue'))


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: HomePage},
        {path: '/coaches', component: CoachesList},
        {
            path: '/coaches/:id',
            component: CoachDetail,
            props: true,
            children: [
                {
                    path: 'contact', component: ContactCoach, meta: {requiresAuth: true}
                } // /coaches/c1/contact
            ]
        },
        {path: '/requests', component: RequestsReceived, meta: {requiresAuth: true}},
        {path: '/auth', component: UserAuth, meta: {requiresUnauth: true}},
        {path: '/plans', component: PlansList},
        {path: '/plans/:id',component: PlanDetails, props: true},
        {path: '/plans/createPlan', component: createPlan, meta: {requiresAuth: true}},
        {path: '/myProfile', component: userProfile, meta: {requiresAuth: true}},
        {path: '/:notFound(.*)', component: NotFound}
    ]
});

router.beforeEach(function (to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/coaches');
    } else {
        next();
    }
});

export default router;
