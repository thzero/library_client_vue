import GlobalUtility from '@thzero/library_client/utility/global';

import RouterService from '@thzero/library_client/service/router';

class VueRouterService extends RouterService {
	// eslint-disable-next-line
	route(path, options) {
		GlobalUtility.$navRouter.push(path);
	}
}

export default VueRouterService;
