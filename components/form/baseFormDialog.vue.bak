
<script>
import useVuelidate from '@vuelidate/core';

import base from '../base';

export default {
	name: 'BaseFormDialog',
	extends: base,
	props: {
		signal: {
			type: Boolean,
			default: false
		}
	},
	setup (props) {
		return Object.assign(base.setup(props), {
			validation: useVuelidate()
		});
	},
	methods: {
		async reset() {
			await this.$refs.dlg.reset();
		}
	}
};
</script>
