import { createApp, defineAsyncComponent } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import router from './router.js';
import store from './store/index.js';
import App from './App.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
// import BaseDialog from './components/ui/BaseDialog.vue';

const BaseDialog = defineAsyncComponent(() => import('./components/ui/BaseDialog.vue'));

const app = createApp(App)
library.add(faQuoteRight,  faGithub, faLinkedin);
app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app');
