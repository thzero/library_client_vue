import VueI18n from 'vue-i18n';
import messages from '@/i18n';

export default async ({ Vue, app }) => {
	Vue.use(VueI18n);

	// Set i18n instance on app
	const i18n = new VueI18n({
		locale: 'en-us',
		fallbackLocale: 'en',
		messages,
		silentTranslationWarn: true
	});
	app.i18n = i18n;
	Vue.prototype.$trans = i18n;
	GlobalUtility.$trans = il8n;
};
