<script>
import base from './base';

export default {
	name: 'BaseOpenSource',
	extends: base,
	data: () => ({
		height: '800px',
		dependencies: [ {
				category: 'client',
				dependencies: [ ]
			},
			{
				category: 'server',
				dependencies: [ ]
			}
		]
	}),
	computed: {
		dependenciesClient() {
			return this.initializeDependenciesClient();
		},
		dependenciesServer() {
			return this.initializeDependenciesServer();
		}
	},
	created() {
		let dependencies = this.dependencies.find(l => l.category === 'client');
		dependencies.dependencies = this.initializeDependenciesClient();
		dependencies = this.dependencies.find(l => l.category === 'server');
		dependencies.dependencies = this.initializeDependenciesServer();
	},
	mounted() {
		this.onResize();
	},
	methods: {
		initializeDependenciesClient() {
			return [];
		},
		initializeDependenciesServer() {
			return [];
		},
		key(index, prefix, secondary) {
			return prefix + '' + index + '' + secondary;
		},
		onResize() {
			let temp = window.innerHeight - 200;
			if (temp < 200)
				temp = 200;
			this.height = temp;
		}
	}
};
</script>
