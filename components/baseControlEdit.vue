<script>
import baseEdit from './baseEdit';

export default {
	name: 'BaseEditControl',
	extends: baseEdit,
	props: {
		vid: {
			type: String,
			default: ''
		}
	},
	data: () => ({
		innerValue: null,
		watch: null
	}),
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
