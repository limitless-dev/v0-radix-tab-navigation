import { Link, useMatchRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Routes } from '@/routes';

// In your component
const { t } = useTranslation();
const matchRoute = useMatchRoute();

const navItems = [
  {
    link: () => (
      <Link 
        to={Routes.ENTITY_HOME} 
        params={{ entityId }}
      >
        {t('navbar.home')}
      </Link>
    ),
    isActive: !!matchRoute({ to: Routes.ENTITY_HOME, params: { entityId } })
  },
  {
    link: () => (
      <Link 
        to={Routes.ENTITY_MANAGE_PROFILE} 
        params={{ entityId }}
      >
        {t('navbar.entityManage')}
      </Link>
    ),
    isActive: !!matchRoute({ 
      to: Routes.ENTITY_MANAGE, 
      params: { entityId },
      fuzzy: true 
    })
  },
  {
    link: () => (
      <Link 
        to={Routes.ENTITY_USERS} 
        params={{ entityId }}
      >
        {t('navbar.users')}
      </Link>
    ),
    isActive: !!matchRoute({ 
      to: Routes.ENTITY_USERS, 
      params: { entityId },
      fuzzy: true 
    })
  }
];




////
import { useMatchRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Routes } from '@/routes';
import { createNavItems } from './create-nav-items';

const { t } = useTranslation();
const matchRoute = useMatchRoute();

const navItems = createNavItems(
  [
    { 
      to: Routes.ENTITY_HOME, 
      label: 'navbar.home' 
    },
    { 
      to: Routes.ENTITY_MANAGE_PROFILE, 
      label: 'navbar.entityManage',
      matchRoute: Routes.ENTITY_MANAGE,
      fuzzy: true 
    },
    { 
      to: Routes.ENTITY_USERS, 
      label: 'navbar.users',
      fuzzy: true 
    }
  ],
  { entityId },
  t,
  matchRoute
);

// Done
<YourComponent navItems={navItems} />



