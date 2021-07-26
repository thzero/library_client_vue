<script>
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import base from '@/library_vue/components/base';

export default {
	name: 'baseMarkdown',
	extends: base,
	props: {
		value: {
			type: String,
			default: ''
		}
	},
	computed: {
		display() {
			const correlationId = this.correlationId();
			return this._serviceMarkup.trimResults(correlationId, this._serviceMarkup.render(correlationId, this.value));
		}
	},
	created() {
		this._serviceMarkup = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);
	}
};
</script>
