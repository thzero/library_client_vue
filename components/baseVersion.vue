<script>
import { computed } from 'vue';

import base from './base';

export default {
	name: 'BaseVersion',
	extends: base,
	props: {
		value: {
			type: Object,
			default: null
		}
	},
	data () {
		return {};
	},
	computed: {
		innerVersion() {
			return this.value;
		}
	}
};
</script>
