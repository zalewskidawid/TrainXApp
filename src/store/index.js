import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index.js';
import requestsModule from './modules/requests/index.js';
import authModule from './modules/auth/index.js';
import plansModule from './modules/plans/index';
import userModule from './modules/profile/index';

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authModule,
    plans: plansModule,
    profile: userModule
  }
});

export default store;