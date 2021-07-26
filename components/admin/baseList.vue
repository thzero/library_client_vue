<script>
import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';

import baseEdit from '../baseEdit';
import VConfirmationDialog from '@/library_vue_vuetify/components/VConfirmationDialog';

import DialogSupport from '@/library_vue/components/support/dialog';

export default {
	name: 'BaseAdminList',
	components: {
		VConfirmationDialog
	},
	extends: baseEdit,
	data: () => ({
		dialogDeleteSignal: new DialogSupport(),
		dialogDeleteItemId: null,
		dialogEditSignal: new DialogSupport(),
		dialogEditItemTitle: '',
		headers: [],
		lookups: []
	}),
	created() {
		this.headers = this.initializeHeaders();

		this.initializeServices();
	},
	methods: {
		defaultItem() {
			this.notImplementedError();
		},
		async dialogDeleteCancel() {
			this.dialogDeleteSignal.cancel();
			this.dialogDeleteItemId = null;
		},
		async dialogDeleteOk() {
			this.dialogDeleteSignal.ok();
			this.dialogDeleteItemId = null;
		},
		async dialogDeleteOpen(item) {
			this.dialogDeleteItemId = item.id;
			this.dialogDeleteSignal.open();
		},
		async dialogDeletePreCompleteOk() {
			return await this.dialogDeletePreCompleteOkDelete(this.correlationId(), GlobalUtility.$store.dispatcher, this.dialogDeleteItemId);
		},
		// eslint-disable-next-line
		async dialogDeletePreCompleteOkDelete(dispatcher, id) {
			this.notImplementedError();
		},
		async dialogEditCancel() {
			this.dialogEditSignal.cancel();
		},
		async dialogEditOk() {
			this.dialogEditSignal.ok();
		},
		async dialogEditOpen(item, isNew) {
			const title = isNew ? 'titles.new' : 'titles.edit';
			this.dialogEditItemTitle = GlobalUtility.$trans.t(title);
			await this.$refs.editDialog.reset(this.correlationId(), this.clone(item ? item : LibraryUtility.instantiate(this.defaultItem())));
			this.dialogEditSignal.open();
		},
		getLookupName(lookups, id) {
			if (!id || !lookups)
				return '';

			const results = lookups.find(l => l.id == id);
			return results ? results.name : '';
		},
		initialize() {
		},
		initializeHeaders() {
			this.notImplementedError();
		},
		initializeServices() {
		}
	}
};
</script>
