<script>
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import Response from '@thzero/library_common/response';

import VConfirmationDialog from '@/library_vue_vuetify/components/VConfirmationDialog';
import VFormControl from '@/library_vue_vuetify/components/form/VFormControl';
import VTextFieldWithValidation from '@/library_vue_vuetify/components/form/VTextFieldWithValidation';

export default {
	name: 'BaseSettings',
	components: {
		VConfirmationDialog,
		VFormControl,
		VTextFieldWithValidation
	},
	extends: VFormControl,
	data: () => ({
		fab: false,
		requestReset: 0,
		serviceUsers: null,
		snackbar: false,
		timeout: 2000
	}),
	computed: {
		hasPicture() {
			return (this.user != null && this.user.external.picture != null && this.user.external.picture !== '');
		},
		name() {
			return (this.user != null && this.user.external.name != null ? this.user.external.name : '');
		},
		picture() {
			return (this.user != null && this.user.external.picture != null ? this.user.external.picture : null);
		},
		user() {
			return GlobalUtility.$store.state.user.user;
		}
	},
	async created() {
		await this.reset(this.correlationId(), null);
		this.serviceUsers = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_USER);
	},
	async mount() {
		await this.reset(this.correlationId(), null);
	},
	methods: {
		async cancel() {
			await this.reset(this.correlationId());
		},
		async close() {
		},
		async ok() {
			this.snackbar = true;
			return true;
		},
		async open() {
			this.fieldType = null;
			this.name = '';
		},
		// eslint-disable-next-line
		async preCompleteI(correlationId, value) {
		},
		async preComplete(correlationId) {
			const responses = [];

			await this.preCompleteI(correlationId, responses);

			const response = Response.success(correlationId);
			for (let item of responses)
				response.success &= item.success;
			return response;
		},
		reset(correlationId) {
			let self = this;
			setTimeout(() => {
				self.resetI(correlationId);
			},
			150);
		},
		// eslint-disable-next-line
		resetI(correlationId) {
		}
	}
};
</script>
