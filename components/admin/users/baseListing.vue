<script>
import GlobalUtility from '@thzero/library_client/utility/global';

import baseList from '../baseList';

export default {
	name: 'BaseAdminUsersListing',
	extends: baseList,
	computed: {
		users() {
			const users = GlobalUtility.$store.state.adminUsers.users;
			return users ? users.slice(0) : [];
		}
	},
	async mounted() {
		await GlobalUtility.$store.dispatcher.adminUsers.searchAdminUsers(this.correlationId(), {});
	},
	methods: {
		defaultItem() {
		},
		async dialogDeletePreCompleteOkDelete(correlationId, dispatcher, id) {
			return await dispatcher.adminUsers.deleteAdminUser(correlationId, id);
		},
		initializeHeaders() {
			return [
				{ text: GlobalUtility.$trans.t('users.name'), align: 'left', value: 'external.name', },
				{ text: GlobalUtility.$trans.t('users.id'), align: 'left', value: 'external.id', },
				{ text: GlobalUtility.$trans.t('users.externalId'), align: 'left', value: 'external.externalId', },
				{ text: GlobalUtility.$trans.t('users.roles'), align: 'left', value: 'roles' },
				{ text: GlobalUtility.$trans.t('users.actions'), align: 'right', value: 'action', sortable: false }
			];
		}
	}
};
</script>
