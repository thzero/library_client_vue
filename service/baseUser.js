import LibraryConstants from '@thzero/library_client/constants';

import BaseUserService from '@thzero/library_client/service/baseUser';

class VueBaseUserService extends BaseUserService {
	constructor() {
		super();

		this._serviceStore = null;
	}

	async init(injector) {
		await super.init(injector);

		this._serviceStore = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
	}

	async resetUser(correlationId) {
		await this._serviceStore.dispatcher.user.resetUser(correlationId);
	}

	async setAuthCompleted(correlationId) {
		await this._serviceStore.dispatcher.user.setAuthCompleted(correlationId, true);
	}

	async setClaims(correlationId, claims) {
		await this._serviceStore.dispatcher.user.setClaims(correlationId, claims);
	}

	async setLoggedIn(correlationId, value) {
		await this._serviceStore.dispatcher.user.setLoggedIn(correlationId, value);
	}
	
	async setTokenResult(correlationId, tokenResult) {
		await this._serviceStore.dispatcher.user.setTokenResult(correlationId, tokenResult);
	}

	async setUser(correlationId, user) {
		await this._serviceStore.dispatcher.user.setUser(correlationId, user);
	}

	get token() {
		return this._serviceStore.state.user.token;
	}
}

export default VueBaseUserService;
