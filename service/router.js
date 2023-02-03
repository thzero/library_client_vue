import LibraryClientUtility from '@thzero/library_client/utility/index';

import RouterService from '@thzero/library_client/service/router';

class VueRouterService extends RouterService {
	// eslint-disable-next-line
	route(path, options) {
		LibraryClientUtility.$navRouter.push(path);
	}
}

export default VueRouterService;
