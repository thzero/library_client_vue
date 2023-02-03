import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryClientVueUtility from '../../utility/index';

import Response from '@thzero/library_common/response';

const store = {
	state: {
		authCompleted: false,
		claims: null,
		isLoggedIn: false,
		token: null,
		tokenResult: null,
		user: null
	},
	actions: {
		// eslint-disable-next-line
		async getUserFavorites(correlationId) {
			const service = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_USER);
			const response = await service.fetchFavoritesByGamerId(correlationId, this.state.user.user);
			this.$logger.debug('store.user', 'getUserFavorites', 'response', response);
			return response;
		},
		async refreshUserSettings({ commit }, correlationId) {
			const service = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_USER);
			const response = await service.refreshSettings(correlationId, this.state.user.user);
			this.$logger.debug('store.user', 'refreshUserSettings', 'response', response);
			if (Response.hasSucceeded(response) && response.results)
				commit('setUserSettings', { correlationId: correlationId, user: response.results });
			return response;
		},
		async resetUser({ commit }, correlationId) {
			commit('resetUser', correlationId);
		},
		async setUserAuthCompleted({ commit }, params) {
			commit('setUserAuthCompleted', params);
		},
		async setUserClaims({ commit }, params) {
			commit('setUserClaims', params);
		},
		async setUserLoggedIn({ commit }, params) {
			commit('setUserLoggedIn', params);
		},
		async setUserSettings({ commit }, params) {
			const service = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_USER);
			params.settings = LibraryClientVueUtility.settings().mergeUser(params.correlationId, params.settings);
			const response = await service.updateSettings(params.correlationId, this.state.user.user, params.settings);
			this.$logger.debug('store.user', 'setUserSettings', 'response', response);
			if (Response.hasSucceeded(response) && response.results)
				commit('setUserSettings', { correlationId: params.correlationId, user: response.results });
			return response;
		},
		async setUserTokenResult({ commit }, params) {
			commit('setUserTokenResult', params);
		},
		async setUser({ commit }, params) {
			commit('setUser', params);
		}
	},
	mutations: {
		// eslint-disable-next-line
		resetUser(state, correlationId) {
			state.claims = null;
			state.isLoggedIn = false;
			state.token = null;
			state.tokenResult = null;
			state.user = null;
		},
		setUserAuthCompleted(state, params) {
			state.authCompleted = params.authCompleted;
		},
		setUserClaims(state, params) {
			state.claims = params.claims;
		},
		setUserLoggedIn(state, params) {
			state.isLoggedIn = params.isLoggedIn;
		},
		setUserSettings(state, params) {
			params.user.settings = LibraryClientVueUtility.settings().mergeUser(params.correlationId, params.user.settings);
			state.user = params.user;
		},
		setUserTokenResult(state, params) {
			state.tokenResult = params.tokenResult;
			state.token = params.tokenResult ? params.tokenResult.token : null;
		},
		setUser(state, params) {
			if (params.user)
				params.user.settings = LibraryClientVueUtility.settings().mergeUser(params.correlationId, params.user.settings);
			state.user = params.user;
		}
	},
	dispatcher: {
		async getUserFavorites(correlationId) {
			return await LibraryClientUtility.$store.dispatch('getUserFavorites', correlationId);
		},
		async refreshUserSettings(correlationId) {
			await LibraryClientUtility.$store.dispatch('refreshUserSettings', correlationId);
		},
		async resetUser(correlationId) {
			await LibraryClientUtility.$store.dispatch('resetUser', correlationId);
		},
		async setAuthCompleted(correlationId, authCompleted) {
			await LibraryClientUtility.$store.dispatch('setUserAuthCompleted', { correlationId: correlationId, authCompleted: authCompleted });
		},
		async setClaims(correlationId, claims) {
			await LibraryClientUtility.$store.dispatch('setUserClaims', { correlationId: correlationId, authCompleted: claims });
		},
		async setLoggedIn(correlationId, isLoggedIn) {
			await LibraryClientUtility.$store.dispatch('setUserLoggedIn', { correlationId: correlationId, isLoggedIn: isLoggedIn });
		},
		async setUserSettings(correlationId, settings) {
			return await LibraryClientUtility.$store.dispatch('setUserSettings', { correlationId: correlationId, settings: settings });
		},
		async setTokenResult(correlationId, tokenResult) {
			await LibraryClientUtility.$store.dispatch('setUserTokenResult', { correlationId: correlationId, tokenResult: tokenResult });
		},
		async setUser(correlationId, user) {
			await LibraryClientUtility.$store.dispatch('setUser', { correlationId: correlationId, user: user });
		}
	}
};

export default store;
