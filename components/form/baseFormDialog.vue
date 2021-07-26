
<script>
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
	methods: {
		async reset() {
			await this.$refs.dlg.reset();
		}
	}
};
</script>
