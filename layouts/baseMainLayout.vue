<script>
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import baseLayout from './baseLayout';

import DialogSupport from '@/library_vue/components/support/dialog';

const auth = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_AUTH);

export default {
	name: 'BaseMainLayout',
	extends: baseLayout,
	data: () => ({
		closeOnContentClick: true,
		// drawer: false,
		displayMarkupValue: null,
		dialogSignOut: new DialogSupport()
	}),
	computed: {
		isAuthCompleted() {
			return GlobalUtility.$store.state.user && GlobalUtility.$store.state.user.authCompleted;
		},
		isLoggedIn() {
			return GlobalUtility.$store.state.user && GlobalUtility.$store.state.user.isLoggedIn;
		}
	},
	methods: {
		clickAbout() {
			GlobalUtility.$navRouter.push('/about');
		},
		clickOpenSource() {
			GlobalUtility.$navRouter.push('/openSource');
		},
		async clickSignIn() {
			GlobalUtility.$navRouter.push('/auth');
		},
		clickSupport() {
			GlobalUtility.$navRouter.push('/support');
		},
		async dialogSignOutOk() {
			this.dialogSignOut.ok();
			await auth.signOut(this.correlationId());
		},
		toggleDrawer() {
			// this.drawer = !this.drawer
			GlobalUtility.$EventBus.emit('toggle-drawer');
		}
	}
};
</script>