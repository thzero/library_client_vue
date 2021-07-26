import GlobalUtility from '@thzero/library_client/utility/global';

import Service from '@thzero/library_client/service/index';

class VuexStoreService extends Service {
	get dispatcher() {
		return GlobalUtility.$store.dispatcher;
	}

	get getters() {
		return GlobalUtility.$store.getters;
	}

	get state() {
		return GlobalUtility.$store.state;
	}
}

export default VuexStoreService;
