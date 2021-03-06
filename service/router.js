import Vue from 'vue';

import RouterService from '@thzero/library_client/service/router';

class VueRouterService extends RouterService {
	// eslint-disable-next-line
	route(path, options) {
		Vue.prototype.$navRouter.push(path);
	}
}

export default VueRouterService;
