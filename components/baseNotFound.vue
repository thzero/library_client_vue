<script>
import GlobalUtility from '@thzero/library_client/utility/global';

import base from './base';

export default {
	name: 'BaseNotFound',
	extends: base,
	computed: {
		imageWidth() {
			const width = (window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth);
			if (width > 512)
				return '512px';

			return width *.75 + 'px';
		}
	},
	methods: {
		clickHome() {
			GlobalUtility.$navRouter.push('/');
		}
	}
};
</script>
