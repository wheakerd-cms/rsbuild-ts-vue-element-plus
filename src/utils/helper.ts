const getAppName = (mode: 'host' | 'web') => {
	const getHostName = (): string => {
		const regularExpression: RegExp = /^(.*?)\..*/;
		return window.location.hostname.replace(regularExpression, '$1');
	};

	const getWebName = (): string => {
		const regularExpression: RegExp = /.*?:\/\/[^\/]*\/([^\/]+)(\/.*)?/;
		return window.location.href.replace(regularExpression, '$1');
	};

	return mode === 'host' ? getHostName() : getWebName();
};

export {
	getAppName,
};