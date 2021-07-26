import Vue from 'vue';

import mitt from 'mitt';

import GlobalUtility from '@thzero/library_client/utility/global';

export default async () => {
	const EventBus = mitt();
	Vue.prototype.$EventBus = EventBus;
	GlobalUtility.$EventBus = EventBus;
};
