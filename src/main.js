import {
	createSSRApp
} from 'vue';
import store from './store'
import App from "./App.vue";
// import './vant/index.js'
// import vant from 'vant'
// import { DateTimePicker,Button  } from './vant/index.js'
export function createApp() {
	const app = createSSRApp(App);
	app.use(store)
	// app.use(DateTimePicker);
	// app.use(Button);
	return {
		app
	};
}