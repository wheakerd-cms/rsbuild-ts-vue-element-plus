export const defineRoutes: { [key: string]: any }[] = [
	{
		path: '/dashboard',
		name: 'dashboard',
		redirect: '/dashboard/analysis',
		component: `#`,
		meta: {
			name: '首页',
		},
		children: [
			{
				path: 'analysis',
				name: 'dashboard-analysis',
				component: `app/admin/views/dashboard/analysis/index`,
				meta: {
					name: '分析页',
				},
			},
		],
	}, {
		path: '/permissions',
		name: 'permissions',
		redirect: '/permissions/menu',
		component: `#`,
		meta: {
			name: '权限管理',
		},
		children: [
			{
				path: 'menu',
				name: 'permissions-menu',
				component: `app/admin/views/permissions/menu/index`,
				meta: {
					name: '菜单管理',
					permissions: [
						'add', 'edit', 'detail', 'delete',
					],
				},
			},
		],
	},
];