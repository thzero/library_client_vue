import AsyncComputed from 'vue-async-computed';

export default async ({
	framework
}) => {
	framework.use(AsyncComputed);
};
