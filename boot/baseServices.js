import LibraryClientUtility from '@thzero/library_client/utility/index';

import AdminBaseServices from '@thzero/library_client/boot/adminBaseServices';

import eventService from '../service/event';
import routerService from '../service/router';
import storeService from '../service/store';
import translateService from '../service/translate';

class VueBaseServices extends AdminBaseServices {
	_initializeInjector(framework, injector) {
		framework.prototype.$injector = injector;
		LibraryClientUtility.$injector = injector;
	}

	_initializeEvent(injector) {
		return new eventService(injector);
	}

	_initializeRouter(injector) {
		return new routerService(injector);
	}

	_initializeStore(injector) {
		return new storeService(injector);
	}

	_initializeTranslate(injector) {
		return new translateService(injector);
	}
}

export default VueBaseServices;
