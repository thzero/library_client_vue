<script>
import { computed } from 'vue';

import GlobalUtility from '@/thzero/library_client/utility/global';

import base from './base';

export default {
	name: 'BaseLoadingOverlay',
	extends: base,
	props: {
		message: {
			type: String,
			default: null
		},
		signal: {
			type: Boolean,
			default: false
		},
		timeout: {
			type: Number,
			default: null
		}
	},
	setup (props) {
		const displayMessage = computed(() => {
			return !String.isNullOrEmpty(props.message) ? props.message : GlobalUtility.$trans.t('messages.loading');
		});

		return Object.assign(base.setup(props), {
			displayMessage
		});
	}
};
</script>
