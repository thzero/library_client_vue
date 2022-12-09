import Vue from 'vue';
import Vuex from 'vuex';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import adminNews from './admin/news';
import adminUsers from './admin/users';

import news from './news';
import user from './user';

class BaseStore {
	async execute() {
		Vue.use(Vuex);

		this.store = this._init();

		// enable strict mode (adds overhead!) for dev mode only
		this.store.strict = process.env.DEV;

		const pluginPersist = this._initPluginPersist();
		if (pluginPersist)
			this.store.plugins = [pluginPersist.plugin];

		this.actionDispatcher = {};
		this.actionDispatcher['root'] = this.store.dispatcher;
		delete this.store.dispatcher;

		this._init();

		this._addModule('adminNews', adminNews);
		this._addModule('adminUsers', adminUsers);
		this._addModule('news', news);
		this._addModule('user', user);
		this._initModules();

		const vuexStore = new Vuex.Store(this.store);
		vuexStore.dispatcher = this.actionDispatcher;

		return vuexStore;
	}

	_addModule(name, module) {
		this.actionDispatcher[name] = module.dispatcher;
		delete module.dispatcher;
		this.store.modules[name] = module;
	}

	_init() {
		throw new NotImplementedError();
	}

	_initModules() {
		throw new NotImplementedError();
	}

	_initPluginPersist() {
		return null;
	}
}

export default BaseStore;