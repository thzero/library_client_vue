import mitt from 'mitt';

import LibraryClientUtility from '@thzero/library_client/utility/index';

export default async ({ framework }) => {
	const EventBus = mitt();
	framework.prototype.$EventBus = EventBus;
	LibraryClientUtility.$EventBus = EventBus;
};
