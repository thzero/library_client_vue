import LibraryClientUtility from '@thzero/library_client/utility/index';

import Service from '@thzero/library_client/service/index';

class VuexStoreService extends Service {
	get dispatcher() {
		return LibraryClientUtility.$store.dispatcher;
	}

	get getters() {
		return LibraryClientUtility.$store.getters;
	}

	get state() {
		return LibraryClientUtility.$store.state;
	}
}

export default VuexStoreService;