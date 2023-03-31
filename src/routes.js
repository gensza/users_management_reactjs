import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// Menu
const Menu = React.lazy(() => import('./views/menu/list_menu'))
const ListRoles = React.lazy(() => import('./views/menu/list_roles'))
const MenuSetting = React.lazy(() => import('./views/menu/menu_setting'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', element: Dashboard, exact: true },
  { path: '/listMenu', element: Menu, exact: true },
  { path: '/listRoles', element: ListRoles, exact: true },
  { path: '/menuSetting', element: MenuSetting, exact: true },
]

export default routes
