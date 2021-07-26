<script>
import GlobalUtility from '@thzero/library_client/utility/global';

import TabSupport from './support/tab';

import base from './base';

export default {
	name: 'BaseAdmin',
	extends: base,
	data: () => ({
		drawer: false,
		tabSupport: new TabSupport()
	}),
	async created() {
		this.initializeTabs();
	},
	async mounted() {
		const self = this;
		GlobalUtility.$EventBus.on('toggle-drawer', () => {
			self.drawer = !self.drawer;
		});
	},
	methods: {
		clickTab(value) {
			this.tabSupport.changeTab(value);
		},
		initializeTabs() {
		}
	}
};
</script>