import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

const store = {
	state: {
		latest: null
	},
	actions: {
		async deleteNews({ commit }, params) {
			commit('deleteNews', params);
		},
		async getLatestNews({ commit }, correlationId) {
			const service = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_NEWS);
			const response = await service.latest(correlationId);
			this.$logger.debug('store.news', 'getLatestNews', 'response', response);
			commit('setLatestNews', { correlationId: correlationId, latest: response.success && response.results ? response.results.data : null });
		}
	},
	mutations: {
		deleteNews(state, params) {
			LibraryCommonUtility.deleteArrayById(state.latest, params.id);
		},
		setLatestNews(state, params) {
			this.$logger.debug('store.news', 'setLatest', 'item.a', params.latest, params.correlationId);
			this.$logger.debug('store.news', 'setLatest', 'item.b', state.latest, params.correlationId);
			state.latest = params.latest;
			this.$logger.debug('store.news', 'setLatest', 'item.c', state.latest, params.correlationId);
		}
	},
	dispatcher: {
		async delete(correlationId, id) {
			await LibraryClientUtility.$store.dispatch('deleteNews', { correlationId: correlationId, id: id });
		},
		async getLatest(correlationId) {
			await LibraryClientUtility.$store.dispatch('getLatestNews', correlationId);
		}
	}
};

export default store;
