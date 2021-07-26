<script>
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import base from './base';

export default {
	name: 'BaseAuth',
	extends: base,
	data: () => ({
		allowRememberMe: false,
		authenticated: false,
		disabled: false,
		isLoggedIn: false,
		rememberMe: false,
		features: null
	}),
	computed: {
		display() {
			return !this.isLoggedIn;
		}
	},
	async beforeCreate() {
		this.features = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_FEATURES);
		this.allowRememberMe = this.features && this.features.features ? this.features.features.RememberMe : false;
		this.auth = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_AUTH);
		this.authenticated = await this.auth.isAuthenticated;
		if (this.authenticated)
			GlobalUtility.$navRouter.push('/');
	},
	async mounted() {
		await this.auth.signInCompleted();
		GlobalUtility.$EventBus.on('auth', isLoggedIn => {
			this.logger.debug('BaseAuth', 'mounted', 'isLoggedIn', isLoggedIn, this.correlationId());
			this.isLoggedIn = isLoggedIn;
			this.disabled = isLoggedIn;
		});
	},
	methods: {
		async signInGoogle() {
			this.disabled = true;
			await this.auth.signIn(this.correlationId());
		}
	}
};
</script>

