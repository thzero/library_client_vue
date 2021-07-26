<script>
import GlobalUtility from '@/thzero/library_client/utility/global';
import VueUtility from '../../utility/index';

import baseEdit from '../baseEdit';

import DialogSupport from '../support/dialog';

export default {
	name: 'BaseFormDialogControl',
	extends: baseEdit,
	props: {
		buttonCancel: {
			type: Boolean,
			default: true
		},
		buttonClear: {
			type: Boolean,
			default: true
		},
		buttonDelete: {
			type: Boolean,
			default: false
		},
		buttonOk: {
			type: Boolean,
			default: true
		},
		fullscreen: {
			type: Boolean,
			default: false
		},
		label: {
			type: String,
			default: ''
		},
		maxWidth: {
			type: String,
			default: '600px'
		},
		preCompleteDelete: {
			type: Function,
			default: null
		},
		preCompleteOk: {
			type: Function,
			default: null
		},
		resetDialog: {
			type: Function,
			default: null
		},
		scrollable: {
			type: Boolean,
			default: false
		},
		scrollableAutoResize: {
			type: Boolean,
			default: true
		},
		scrollableAutoResizeFactor: {
			type: Number,
			default: 0.5
		},
		scrollableHeight: {
			type: String,
			default: '500'
		},
		signal: {
			type: Boolean,
			default: false
		},
		validation: {
			type: Object,
			default: null
		},
		width: {
			type: String,
			default: '600px'
		}
	},
	data: () => ({
		dialogHeightI: 300,
		dialogDeleteConfirmSignal: new DialogSupport(),
		dialogSignal: false,
		disabled: false
	}),
	computed: {
		fullscreenInternal() {
			return VueUtility.fullscreen(this.$vuetify);
		},
		scrollableI() {
			return this.scrollable ? 'scrollable' : '';
		},
		scrollableHeightI() {
			return this.scrollableAutoResize ? 'height: ' + (!String.isNullOrEmpty(this.scrollableHeight) ? this.scrollableHeight : this.dialogHeightI) + 'px;' : '';
		}
	},
	watch: {
		// Handles external model changes.
		signal(value) {
			const correlationId = this.correlationId();
			this.$emit(value ? 'open' : 'close');
			this.logger.debug('FormDialog', 'signal', 'value', value, correlationId);
			this.dialogSignal = value;
			this.logger.debug('FormDialog', 'signal', 'dialogSignal', this.dialogSignal, correlationId);
		}
	},
	mounted() {
		this.onResize();
	},
	methods: {
		clear(correlationId) {
			this.serverErrors = [];
			this.logger.debug('FormDialog', 'clear', 'clear', null, correlationId);
			this.$nextTick(() => {
				// this.$refs.obs.reset(correlationId);
			});
			this.disabled = false;
		},
		handleCancel() {
			const correlationId = this.correlationId();
			this.serverErrors = [];
			this.dialogSignal = false;
			this.clear(correlationId);
			this.logger.debug('FormDialog', 'cancel', 'cancel', null, correlationId);
			this.$emit('cancel');
		},
		handleClear() {
			this.clear(this.correlationId());
		},
		async handleDelete() {
			this.serverErrors = [];
			this.dialogDeleteConfirmSignal.open(this.correlationId());
		},
		async handleDeleteConfirmOk() {
			this.serverErrors = [];

			const correlationId = this.correlationId();

			this.dialogDeleteConfirmSignal.ok();

			if (this.preCompleteDelete) {
				const response = await this.preCompleteDelete(correlationId);
				this.logger.debug('FormDialog', 'handleDeleteConfirmOk', 'response', response, correlationId);
				if (!response || !response.success) {
					// VueUtility.handleError(this.$refs.obs, this.serverErrors, response, correlationId);
					return;
				}
			}

			this.dialogSignal = false;
			this.logger.debug('FormDialog', 'handleDeleteConfirmOk', 'delete', null, correlationId);
			this.$emit('ok');
			this.clear(correlationId);
		},
		onResize() {
			const temp = window.innerHeight - 200;
			this.dialogHeightI = Math.ceil(temp * this.scrollableAutoResizeFactor);
		},
		async reset(correlationId, value) {
			await this.validation.$validate();
			const timer = setInterval(async () => {
				clearInterval(timer);
				const el = document.getElementsByClassName('v-card__text');
				if (el && el.length > 0)
					el[0].scrollTop = 0;
			}, 25);
			await this.resetDialog(correlationId, value);
		},
		// eslint-disable-next-line
		// async resetDialog(correlationId, value) {
		// },
		setErrors(errors) {
			// this.$refs.obs.setErrors(errors);
		},
		async submit() {
			this.serverErrors = [];

			const correlationId = this.correlationId();

			// const result = await this.$refs.obs.validate(correlationId);
			const result = await this.validation.$validate();
			this.logger.debug('FormDialog', 'submit', 'result', result, correlationId);
			if (!result)
				return;

			let response = { success: true, route: null };
			if (this.preCompleteOk) {
				response = await this.preCompleteOk(correlationId);
				this.logger.debug('FormDialog', 'submit', 'response', response, correlationId);
				if (!response || !response.success) {
					// VueUtility.handleError(this.$refs.obs, this.serverErrors, response, correlationId);
					return;
				}
			}

			this.dialogSignal = false;
			this.logger.debug('FormDialog', 'submit', 'ok', null, correlationId);
			this.$emit('ok');
			this.clear(correlationId);

			if (!String.isNullOrEmpty(response.route))
				GlobalUtility.$navRouter.push(response.route);
		}
	}
};
</script>
