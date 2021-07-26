<script>
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

export default {
	name: 'Base',
	data: () => ({
		logger: null,
		utility: null,
		serverErrors: []
	}),
	async created() {
		this.logger = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_LOGGER);
	},
	methods: {
		correlationId() {
			return LibraryUtility.generateId();
		},
		clone(value) {
			return LibraryUtility.cloneDeep(value);
		},
		error(clazz, method, message, err, code, errors, correlationId) {
			return Response.error(clazz, method, message, err, code, errors, correlationId);
		},
		getDateHuman(date) {
			return LibraryUtility.getDateHuman(date);
		},
		noBreakingSpaces() {
			return '\xa0';
		},
		notImplementedError() {
			throw new NotImplementedError();
		},
		observerIsNull(value){
			return !value || Object.keys(value).length === 0;
		},
		success(correlationId) {
			return Response.success(correlationId);
		}
	}
};
</script>
