<script>
import GlobalUtility from '@thzero/library_client/utility/global';

import base from './base';

export default {
	name: 'BaseApp',
	extends: base,
	async created() {
		GlobalUtility.$EventBus.on('auth-refresh', async (user) => {
			const correlationId = this.correlationId();
			this.logger.debug('BaseApp', 'created', 'auth-refresh', user, correlationId);
			let items = await this.initialize(correlationId);
			if (!items)
				return;
			await Promise.all(items);
		});
	},
	async mounted() {
		(async () => {
			const correlationId = this.correlationId();
			let items = await this.initialize(correlationId);
			if (!items)
				return;
			await Promise.all(items);
			// await Promise.all([
			// 	GlobalUtility.$store.dispatcher.root.initialize(correlationId),
			// 	GlobalUtility.$store.dispatcher.characters.initializeCharacters(correlationId)
			// ])
		})().catch(err => {
			// eslint-disable-next-line
			console.error(err);
		});
	},
	methods: {
		async initialize() {
			return null;
		}
	}
};
</script>

