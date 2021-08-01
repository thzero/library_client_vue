import mitt from 'mitt';

import GlobalUtility from '@thzero/library_client/utility/global';

export default async ({ framework }) => {
	const EventBus = mitt();
	framework.prototype.$EventBus = EventBus;
	GlobalUtility.$EventBus = EventBus;
};
