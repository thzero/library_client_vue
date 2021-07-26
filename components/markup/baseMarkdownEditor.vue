<script>
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import base from '@/library_vue/components/base';

export default {
	name: 'baseMarkdownEditor',
	extends: base,
	props: {
		value: {
			type: String,
			default: ''
		},
		vid: {
			type: String,
			default: ''
		}
	},
	data: () => ({
		innerValue: '',
		watch: null
	}),
	computed: {
		preview() {
			const correlationId = this.correlationId();
			return this._serviceMarkup.trimResults(correlationId, this._serviceMarkup.render(correlationId, this.innerValue ? this.innerValue : ''));
		}
	},
	watch: {
		// eslint-disable-next-line
		value(newValue, preValue) {
			this.initValue(newValue);
		}
	},
	created() {
		this._serviceMarkup = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);
	},
	mounted() {
			this.initValue(this.value);
	},
	methods: {
		initValue(value) {
			this.innerValue = value;
			if (this.watch)
				return;

			this.watch = this.$watch('innerValue', async (newVal) => {
				this.$emit('input', newVal);
			});
		}
	}
};
</script>
