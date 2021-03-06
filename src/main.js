import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import './router/filter';
import ElementUI from 'element-ui';
import common from './common/common';
import store from './store/AppStore';
import VueWechatTitle from 'vue-wechat-title';
import 'element-ui/lib/theme-chalk/index.css';
import vueFilter from 'vue-filter';
import ol from 'openlayers';
import QuillEditor from 'vue-quill-editor';
import 'openlayers/css/ol.css';
import contentmenu from 'v-contextmenu';
import 'v-contextmenu/dist/index.css';
import './assets/styles/index.scss';


Vue.use(ol);
Vue.use(VueWechatTitle);
Vue.use(ElementUI);
Vue.use(QuillEditor);
Vue.use(common);
Vue.use(vueFilter);
Vue.use(contentmenu);

Vue.config.productionTip = false;

var app = new Vue({
  el: '#app',
  router,
  store,
  data (){
    return {
      loading: false
    }
  },
  render: h => h(App)
});

export { app };
