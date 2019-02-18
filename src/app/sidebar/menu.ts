export const menus = [
    {
        title: 'Dashboard',
        icon: 'dashboard-icon',
        url: '/dashboard',
        children: [],
    },
    {
        title: 'Customer',
        icon: 'crm-icon',
        url: '/customer/all-customers',
        children: [],
    },
    {
        title: 'Packages',
        icon: 'package-icon',
        url: null,
        children: [],
    },
    {
        title: 'Team & Users',
        icon: 'teams-icon',
        url: '/',
        children: [
            {
                title: 'Manage Teams',
                url: '/',
            },
            {
                title: 'Manage Employees',
                url: '/',
            }
        ],
    },
    {
        title: 'Billing',
        icon: 'billing-icon',
        url: '/',
        children: [
            {
                title: 'Billing',
                url: '/',
            },
        ],
    },
    {
        title: 'Reports',
        icon: 'report-icon',
        url: '/',
        children: [],
    },
];
