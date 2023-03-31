import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilAppsSettings, cilDrop, cilPencil, cilSpeedometer } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Management Menu',
  },
  {
    component: CNavItem,
    name: 'List Menu',
    to: '/listMenu',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'List Roles',
    to: '/listRoles',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Menu Setting',
    to: '/menuSetting',
    icon: <CIcon icon={cilAppsSettings} customClassName="nav-icon" />,
  },
]

export default _nav
