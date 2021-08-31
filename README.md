![GitHub package.json version](https://img.shields.io/github/package-json/v/thzero/library_client_vue)
![David](https://img.shields.io/david/thzero/library_client_vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# library_client_vue

An opinionated library of common functionality to bootstrap a VueJs based SPA application.

<<<<<<< HEAD
[![NPM](https://nodei.co/npm/@thzero/library_common.png?compact=true)](https://npmjs.org/package/@thzero/library_client_vue)
=======
## Requirements

### Vue

In order to use this opinionated library successfully, it is advised to create a new Vue application using the vue-cli with the following options.

* babel
* router
* vuex
* eslint

## Installation

[![NPM](https://nodei.co/npm/@thzero/library_client_vue.png?compact=true)](https://npmjs.org/package/@thzero/library_client_vue)

### Dependencies

The following dependencies are required.

#### Dev

These dependencies must be installed as 'devDependencies'.

* @alienfast/i18next-loader
* @mdi/font
* babel-plugin-lodash
* material-design-icons-iconfont
* vuetify-loader
* vue-cli-plugin-vuetify

#### Vue

The following library contains the Vue components required by this module as needs to be installed as a submodule

```
git submodule add https://github.com/thzero/library_client_vue_vue "src\library_vue"
```

##### Refresh

To refresh this submodule, you can execute the following commands

```
git submodule init
git submodule update --remote
```

### CLI

It it advised to install the ![@thzero/library_cli](https://www.npmjs.com/package/@thzero/library_cli) command-line interface as a development dependency.

If using the CLI, here are two useful scripts for the package.json

```,
	"cli-id": "./node_modules/.bin/library-cli --generate",
	"cli-update": "./node_modules/.bin/library-cli --updateversion --pi"
```

## Configuration

### Application Configuration

* Setup the configuration files for the application
  * Create a 'config' folder under the 'src' folder.
  * For development, create a 'development.json' file in the config folder.
    * Note that this is ignored in the .gitignore
  * For production, create a 'production.json' file in the config folder.

The configuration file has the following basic format.

```
{
	"backend": [
    // Only needed if using backing APIs for your application
		{
			"key": "backend",
			"apiKey": "<apikey required by the server component>",
			"baseUrl": "<base url for the api of the server component>"
		}
	]
}
```

* For production, create a config\production.json

#### APIs

To use the backend APIs feature, install a REST communication dependency, i.e.

![@thzero/library_client_vue_service_rest_axios](https://www.npmjs.com/package/@thzero/library_client_vue_service_rest_axios).

### Development

* Copy the files in the '_config' folder to the root folder of the application.

  * .browserslistrc
  * .eslintrc
  * babel.config.js
  * vue.config.js

### Package.json

* Include the following after the version property in the 'package.json' for the application.

```
  "version_major": #,
  "version_minor": #,
  "version_patch": #,
  "version_date": "MM/DD/YYYY",
```

* Include the following at the end of the 'package.json' for the application.
```
  ,
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  }
```

## Application Setup

The following lists the various folders and files to create the basic opinionated Vue application using the @thzero/library_client_vue dependency.

### Constants

* Create a 'constants.js' file in the 'src' folder.
* Update the script with the following code.

```
const Constants = {
	InjectorKeys: {
	// TODO: Keys for injectable services
	// i.e. SERVICE_YOUR_SERVICE: 'YourService'
	}
};

export default Constants;

```

### Boot

The boot folder holds the boot scripts for application services and plugins.

* Create a 'boot' folder under the 'src' folder.
* Create a 'i18n.js' under the 'boot' folder .
* Update the script with the following code.

```
import VueBasei18n from '@/library_vue/boot/basei18n';

import resources from '@/locales';

export default class AppVueBasei18n extends VueBasei18n {
	_initMessages() {
		return resources;
	}
}

```

* Create a 'services.js' under the 'boot' folder.
* Update the script with the following code.

```
import versionService from '@/service/version';

// TODO:Constants for service imports

import BaseServices from '@/library_vue/boot/baseServices';

class Services extends BaseServices {
	_initialize() {
		// TODO: Define any custom services that you want to be injected.
		// The format of a function call to inject a service looks like:
		// this._inject(Constants.InjectorKeys.SERVICE_YOUR_SERVICE, new yourService());
		// 'yourService' is a defined constant from an import.
		// The keys are recommended to be kept in a Constants file.
	}

	_initialize() {
	}

	_initializeVersion() {
		return new versionService();
	}
}

export default Services;

```

* Create a 'validate.js' under the 'boot' folder.
* Update the script with the following code.

```
import BaseValidation from '@/library_vue/boot/baseValidation';

class Validation extends BaseValidation {
	_initialize(extend) {
		super._initialize(extend);

		// TODO: define any Joi validation extensions here.
	}
}

export default Validation;

```

### Services

The service folder holds javascript classes that are injected as services into the framework.

* Create a 'service' folder under the 'src' folder.
* Create a 'version.js' under the 'service' folder.
* Update the script with the following code.

```
const { version_major, version_minor, version_patch, version_date } = require('../../package.json');

import VersionService from '@thzero/library_client_vue/service/version';

class AppVersionService extends VersionService {
	async _version(correlationId) {
		return this._generate(correlationId, version_major, version_minor, version_patch, version_date);
	}
}

export default AppVersionService;

```

#### Custom Services

Custom services can be generated and stored anywehre with the 'src' folder, although it is recommended to store them in the 'src/service' folder.

A custom service is a class that has the following format.

```
import Service from '@thzero/library_client_vue/service';

class YourServiceNameService extends Service {
	constructor() {
		super();

		// TODO: Define any variables to hold injected services
	  // i.e. this._serviceYourService = null;
	}

	async init(injector) {
		await super.init(injector);

		// TODO: Inject any services into your component
		// i.e. this._serviceYourService = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_YOUR_SERVICE);
	}

	// TODO: define any class methods that the service exposes
}

export default YourServiceNameService;

```

### Locales

For internationalization and localization, the following needs to be setup.  The opinionated default is standard English.

* Create a 'locales' folder under the 'src' folder.
* Create an 'en' folder under the 'locales' folder.
* Create an 'index.json' file under the 'en' folder.
* Update the script with the following JSON.

```
{
	"admin": {
		"news": "News"
	},
	"buttons": {
		"cancel": "Cancel",
		"clear": "Clear",
		"collapseAll": "Collapse",
		"delete": "Delete",
		"edit": "Edit",
		"expandAll": "Expand",
		"ok": "Ok",
		"select": "Select"
	},
	"errors": {
		"adminNews": {
		  "article": {
			 "string": {
				"empty": "Article content is required."
			 }
		  }
		},
		"copyToClipboard": "Failed to copy to the clipboard.",
		"description": "Invalid value, must be of the following ! @ # $ % ^ & * ( ) _ - + = [ ] { } | : ; \" \\' < > , . ? a-z A-Z 0-9",
		"duplicateName": "There is already a {objectType} with the name of \\'{name}\\'.",
		"duplicateNumber": "There is already a {objectType} with the number of \\'{number}\\'.",
		"duplicateOrder": "There is already a {objectType} with order \\'{order}\\'.",
		"error": "An error occured, plesae try again.",
		"invalidPermissions": "You do not have permission to perform the requested action.",
		"invalidRequest": "Invalid request.",
		"notFound": "You have been led astray.",
		"objectChanged": "The \\'{objectType}\\' has changed, please refresh and try again.",
		"type": "Type is required."
	},
	"forms": {
		"id": "Id",
		"name": "Name",
		"news": {
		  "article": "Article",
		  "publishDate": "Publish Date",
		  "sticky": "Sticky"
		},
		"number": "Number",
		"sorting": {
		  "ascending": "Ascending",
		  "ascendingAbbr": "Asc",
		  "descending": "Descending",
		  "descendingAbbr": "Desc",
		  "name": "Sorting",
		  "nameShort": "Sort"
		},
		"title": "Title"
	},
	"home": {
		"welcome": "Hello {msg}!"
	},
	"messages": {
		"failed": "Action failed",
		"loading": "Loading...",
		"saved": "Saved successfully.",
		"success": "Action was successful"
	},
	"news": {
		"actions": "Actions",
		"article": "Article",
		"name": "Name",
		"new": "News",
		"noData": "No news available...",
		"publishDate": "Publish Date",
		"status": {
		  "active": "Active"
		},
		"statusName": "Status",
		"sticky": "Sticky"
	},
	"openSource": {
		"client": "Client",
		"name": "Name",
		"license": "License",
		"resource": "Resource",
		"server": "Server"
	},
	"questions": {
		"areYouSure": "Are you sure?"
	},
	"strings": {
		"add": "Add",
		"copyright": "Copyright",
		"copyToClipboard": "Copied to the clipboard!",
		"delete": "Delete",
		"edit": "Edit",
		"load": "Load",
		"new": "New",
		"no": "No",
		"save": "Save",
		"yes": "Yes"
	},
	"titles": {
		"about": "About",
		"application": "<your application name goes here>",
		"edit": "Edit",
		"editType": "Edit {type}",
		"home": "Home",
		"new": "New",
		"newType": "New {type}",
		"news": "News",
		"newsLatest": "Latest News",
		"openSource": "Open Source",
		"settings": "Settings",
		"support": "Support"
	},
	"users": {
		"actions": "Actions",
		"externalId": "External Id",
		"id": "Id",
		"name": "Name",
		"role": "Role",
		"roles": "Roles"
	},
	"version": {
		"majorMinorDate": "{major}.{minor}.{patch} {date}",
		"label": "Version"
	}
 }
```

See ![Vue l18n](https://kazupon.github.io/vue-i18n/) for documentation on

### Store.js

Setup the 'store/store.js' as follows:

```
import Vue from 'vue';
import VuexPersist from 'vuex-persist';

import LibraryConstants from '@thzero/library_client_vue/constants';

import BaseStore from '@/library_vue/store';

class AppStore extends BaseStore {
	_init() {
		return {
			modules: {
			},
			state: {
				version: null
			},
			actions: {
				async getVersion({ commit }, correlationId) {
					const service = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_VERSION);
					const version = await service.version(correlationId);
					this.$logger.debug('store', 'getVersion', 'version', version, correlationId);
					commit('setVersion', { correlationId : correlationId, version: version });
				},
				async initialize({ commit }, correlationId) {
          // TODO: Call any services that are required during initialization
				},
				async setSettings({ commit }, params) {
					commit('setSettings', params);
				}
			},
			getters: {
			},
			mutations: {
				setVersion(state, params) {
					this.$logger.debug('store', 'setVersion', 'version', params.version, params.correlationId);
					state.version = params.version;
				}
			},
			dispatcher: {
				async getVersion(correlationId) {
					await GlobalUtility.$store.dispatch('getVersion', correlationId);
				},
				async initialize(correlationId) {
					await GlobalUtility.$store.dispatch('initialize', correlationId);
				}
			}
		};
	}

	_initModules() {
    // Initialize any store modules
    // i.e. this._addModule('yourmodulename', yourmodule);
	}

	_initPluginPersist() {
		return new VuexPersist({
			storage: window.localStorage,
			reducer: state => ({
        // TODO: any reducers?
				version: state.version
			})
		});
	}
}

export default AppStore;

```

### App.vue

* Create a 'components' folder under 'src'.
* Create an 'App.vue' file in the 'components' folder.
* Setup the 'App.vue' as follows:

```
<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
import baseApp from '@/library_vue/components/baseApp';

export default {
	name: 'App',
	extends: baseApp,
	methods: {
		initialize(correlationId) {
			return [
				this.$store.dispatcher.root.initialize(correlationId),
        // TODO: any other initialization from the stores that needs to be done?
			];
		}
	}
};
</script>

<style scoped>
</style>

<style>
</style>

```

### Main.js

* Replace the code in the 'main.js' script with the following code.

```
import app from '@/components/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/library_vue/boot/plugins/vuetify';

import bootAsyncComputed from '@/library_vue/boot/asyncComputed';
import bootEventBus from '@/library_vue/boot/eventBus';
import booti18n from '@/boot/i18n';
import bootServices from '@/boot/services';
import bootValidate from '@/boot/validate';
import bootVueScrollTo from '@/library_vue/boot/scrollTo';
import bootWebComponents from '@/library_vue/boot/webComponents';

import start from '@/library_vue/boot/main';
start(app, router, store, vuetify, [ bootAsyncComputed, booti18n, bootEventBus, bootServices, bootValidate, bootVueScrollTo, bootWebComponents ]);

```

### Router.js

* Delete the 'router' folder.
* Add a 'router.js' file to the 'src' folder.
* Setup the 'router.js' as follows:

```
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
	scrollBehavior: () => ({ x: 0, y: 0 }),
	routes: [
		{
			path: '/',
			component: () => import('./view/Home.vue'),
		},
		{
			path: '/about',
			component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		},
		// {
		// 	path: '/openSource',
		// 	component: () => import(/* webpackChunkName: "group-openSource" */ '<define a opensource vue>')
		// },
		// {
		// 	path: '/support',
		// 	component: () => import(/* webpackChunkName: "group-support" */ '<define a support vue>')
		// },
		// {
		// 	path: '/notFound',
		// 	component: () => import(/* webpackChunkName: "group-notFound" */ '<define a notFound vue>')
		// },
		// {
		// 	path: '*',
		// 	component: () => import(/* webpackChunkName: "group-blank" */ '<define a blank vue>'),
		// 	meta: {
		// 		notFound: true
		// 	}
		// }
	]
});

// eslint-disable-next-line
router.beforeResolve((to, from, next) => {
	if (to.matched.some(record => record.meta.notFound)) {
		GlobalUtility.$navRouter.push('/notFound');
		return;
	}

	next();
});

export default router;
```

### Index.html

Replace the contents of the 'public/index.html' with the following code.

```
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0"/>

		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>

		<meta http-equiv="cache-control" content="max-age=0" />
		<meta http-equiv="cache-control" content="no-cache" />
		<meta http-equiv="expires" content="-1" />
		<meta http-equiv="pragma" content="no-cache" />

		<link rel="manifest" href="<%= BASE_URL %>manifest.json">
		<meta name="msapplication-TileColor" content="#ffffff">
		<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
		<meta name="theme-color" content="#ffffff">
		<link rel="shortcut icon" href="<%= BASE_URL %>icons/favicon.ico">
		<link rel="apple-touch-icon" sizes="57x57" href="<%= BASE_URL %>apple-icon-57x57.png">
		<link rel="apple-touch-icon" sizes="60x60" href="<%= BASE_URL %>apple-icon-60x60.png">
		<link rel="apple-touch-icon" sizes="72x72" href="<%= BASE_URL %>apple-icon-72x72.png">
		<link rel="apple-touch-icon" sizes="76x76" href="<%= BASE_URL %>apple-icon-76x76.png">
		<link rel="apple-touch-icon" sizes="114x114" href="<%= BASE_URL %>apple-icon-114x114.png">
		<link rel="apple-touch-icon" sizes="120x120" href="<%= BASE_URL %>apple-icon-120x120.png">
		<link rel="apple-touch-icon" sizes="144x144" href="<%= BASE_URL %>apple-icon-144x144.png">
		<link rel="apple-touch-icon" sizes="152x152" href="<%= BASE_URL %>apple-icon-152x152.png">
		<link rel="apple-touch-icon" sizes="180x180" href="<%= BASE_URL %>apple-icon-180x180.png">
		<link rel="shortcut icon" type="image/png" sizes="192x192"	href="<%= BASE_URL %>android-icon-192x192.png">
		<link rel="shortcut icon" type="image/png" sizes="32x32" href="<%= BASE_URL %>favicon-32x32.png">
		<link rel="shortcut icon" type="image/png" sizes="96x96" href="<%= BASE_URL %>favicon-96x96.png">
		<link rel="shortcut icon" type="image/png" sizes="16x16" href="<%= BASE_URL %>favicon-16x16.png">

		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900">
		<!-- <link rel='preload' href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900' as='style' onload="this.onload=null;this.rel='stylesheet'">
		<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"></noscript> -->
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/material-design-icons-iconfont@5.0.1/dist/material-design-icons.min.css">
		<!-- <link rel='preload' href='https://cdn.jsdelivr.net/npm/material-design-icons-iconfont@5.0.1/dist/material-design-icons.min.css' as='style' onload="this.onload=null;this.rel='stylesheet'">
		<noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/material-design-icons-iconfont@5.0.1/dist/material-design-icons.min.css"></noscript> -->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/4.9.95/css/materialdesignicons.min.css">
		<!-- <link rel='preload' href='https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/4.9.95/css/materialdesignicons.min.css' as='style' onload="this.onload=null;this.rel='stylesheet'">
		<noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/4.9.95/css/materialdesignicons.min.css"></noscript> -->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.min.css">
		<!-- <link rel='preload' href='https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.min.css' as='style' onload="this.onload=null;this.rel='stylesheet'">
		<noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.min.css"></noscript> -->
		<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.min.css"> -->
		<!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"> -->
		<title><name of your app goes here></title>
		<style>
.bg {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: black url( '/images/background.png') no-repeat center center;
	background-attachment: fixed;
}
		</style>
	</head>
	<body class="bg">
		<noscript>
			<strong>We're sorry but test doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
		</noscript>
		<div id="app"></div>
		<!-- built files will be auto injected -->
	</body>
</html>

```
>>>>>>> b9bc64f0a9c29206af7d6bd735a02113e52f0341
