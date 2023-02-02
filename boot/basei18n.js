import VueI18n from 'vue-i18n';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import Basei18n from '@thzero/library_client/boot/basei18n';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

class VueBasei18n extends Basei18n {
	// eslint-disable-next-line
	async execute(framework, app, router, store) {
		framework.use(VueI18n);

		// Set i18n instance on app
		const i18n = new VueI18n({
			locale: 'en-us',
			fallbackLocale: 'en',
			messages: this._initMessages(), //messages,
			silentTranslationWarn: true
		});
		app.i18n = i18n;
		framework.prototype.$trans = i18n;
		LibraryClientUtility.i18n = i18n;
		LibraryClientUtility.$trans = i18n;
	}

	_initMessages() {
		throw new NotImplementedError();
	}
}

export default VueBasei18n;
