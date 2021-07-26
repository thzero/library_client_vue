<script>
import GlobalUtility from '@thzero/library_client/utility/global';

import baseList from '../baseList';

import VMarkdown from '@/library_vue_vuetify/components/markup/VMarkdown';

export default {
	name: 'BaseAdminNewsListing',
	components: {
		VMarkdown
	},
	extends: baseList,
	computed: {
		news() {
			const news = GlobalUtility.$store.state.adminNews.news;
			return news ? news.slice(0) : [];
		}
	},
	async mounted() {
		await GlobalUtility.$store.dispatcher.adminNews.searchNews(this.correlationId(), {});
	},
	methods: {
		defaultItem() {
			return null;
		},
		async dialogDeletePreCompleteOkDelete(correlationId, dispatcher, id) {
			return await dispatcher.adminNews.deleteAdminNews(correlationId, id);
		},
		initializeHeaders() {
			return [
				{ text: GlobalUtility.$trans.t('news.name'), align: 'left', value: 'title', },
				{ text: GlobalUtility.$trans.t('news.gameSystem'), align: 'left', value: 'gameSystemId' },
				{ text: GlobalUtility.$trans.t('news.article'), align: 'left', sortable: false, value: 'article' },
				{ text: GlobalUtility.$trans.t('news.sticky'), align: 'left', value: 'sticky' },
				{ text: GlobalUtility.$trans.t('news.requiresAuth'), align: 'left', value: 'requiresAuth' },
				{ text: GlobalUtility.$trans.t('news.publishDate'), align: 'left', value: 'timestamp' },
				{ text: GlobalUtility.$trans.t('news.statusName'), align: 'left', value: 'status' },
				{ text: GlobalUtility.$trans.t('news.actions'), align: 'right', value: 'action', sortable: false }
			];
		}
	}
};
</script>
