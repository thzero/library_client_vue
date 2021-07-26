<script>
import base from './base';

export default {
	name: 'BaseConfirmationDialog',
	extends: base,
	props: {
		completeOk: {
			type: Function,
			default: null
		},
		message: {
			type: String,
			default: null
		},
		nonRecoverable: {
			type: Boolean,
			default: false
		},
		preCompleteOk: {
			type: Function,
			default: null
		},
		signal: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		return Object.assign(base.setup(props), {
		});
	},
	data: () => ({
		dialogSignal: false,
		internalItem: null
	}),
	watch: {
		// Handles external model changes.
		signal(value) {
			this.dialogSignal = value;
		}
	},
	methods: {
		dialogCancel() {
			this.dialogSignal = false;
			this.$emit('cancel');
		},
		handleError(response, correlationId) {
		},
		async dialogOk() {
			const correlationId = this.correlationId();
			if (this.preCompleteOk) {
				const response = await this.preCompleteOk(correlationId);
				this.logger.debug('ConfirmationDialog', 'dialogOk', 'response', response, correlationId);
				if (!response || !response.success) {
					this.handleError(response, correlationId);
					return;
				}
			}

			this.dialogSignal = false;
			this.$emit('ok');
			if (this.completeOk)
				this.completeOk();
		}
	}
};
</script>
