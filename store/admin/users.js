import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

const store = {
	state: {
		users: null
	},
	actions: {
		async deleteAdminUser({ commit }, params) {
			const service = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_ADMIN_USERS);
			const response = await service.delete(params.correlationId, params.id);
			this.$logger.debug('store.admin.users', 'deleteAdminUser', 'response', response);
			if (Response.hasSucceeded(response)) {
				commit('deleteAdminUser', { correlationId: params.correlationId, id: params.id });
				LibraryClientUtility.$store.dispatcher.users.delete(params.correlationId, params.id);
			}
			return response;
		},
		async searchAdminUsers({ commit }, params) {
			const service = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_ADMIN_USERS);
			const response = await service.search(params.correlationId, params.params);
			this.$logger.debug('store.admin.users', 'searchAdminUsers', 'response', response);
			commit('setAdminUsersListing', { correlationId: params.correlationId, list: response.success && response.results ? response.results.data : null });
		},
		async updateAdminUser({ commit }, params) {
			const service = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_ADMIN_USERS);
			const response = await service.update(params.correlationId, params.item);
			this.$logger.debug('store.admin.users', 'updateAdminUser', 'response', response);
			if (Response.hasSucceeded(response))
				commit('setAdminUsers', { correlationId: params.correlationId, item: response.results });
			return response;
		}
	},
	mutations: {
		deleteAdminUser(state, params) {
			return LibraryCommonUtility.deleteArrayById(state.users, params.id);
		},
		setAdminUsers(state, params) {
			this.$logger.debug('store.admin.users', 'setAdminUsers', 'items.a', params.item, params.correlationId);
			this.$logger.debug('store.admin.users', 'setAdminUsers', 'items.b', state.users, params.correlationId);
			state.users = LibraryCommonUtility.updateArrayByObject(state.users, params.item, true);
			this.$logger.debug('store.admin.users', 'setAdminUsers', 'items.c', state.users, params.correlationId);
		},
		setAdminUsersListing(state, params) {
			this.$logger.debug('store.admin.users', 'setAdminUsersListing', 'list.a', params.list, params.correlationId);
			this.$logger.debug('store.admin.users', 'setAdminUsersListing', 'list.b', state.users, params.correlationId);
			state.users = params.list;
			this.$logger.debug('store.admin.users', 'setAdminUsersListing', 'list.c', state.users, params.correlationId);
		}
	},
	dispatcher: {
		async deleteAdminUser(correlationId, id) {
			return await LibraryClientUtility.$store.dispatch('deleteAdminUser', { correlationId: correlationId, id: id });
		},
		async searchAdminUsers(correlationId, params) {
			await LibraryClientUtility.$store.dispatch('searchAdminUsers', { correlationId: correlationId, params: params });
		},
		async updateAdminUser(correlationId, item) {
			return await LibraryClientUtility.$store.dispatch('updateAdminUser', { correlationId: correlationId, item: item });
		}
	}
};

export default store;
