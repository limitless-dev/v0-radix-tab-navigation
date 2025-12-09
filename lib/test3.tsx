// src/hooks/use-page-title.tsx
import { useMatchRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Routes } from '@/routes';

interface TitleConfig {
  route: string;
  translationKey: string;
  fuzzy?: boolean;
}

export function usePageTitle() {
  const { t } = useTranslation();
  const matchRoute = useMatchRoute();

  const titleConfigs: TitleConfig[] = [
    // Order matters: check specific routes before parent routes
    { route: Routes.INDIVIDUAL_PROFILE, translationKey: 'navbar.individual.profile' },
    { route: Routes.INDIVIDUAL, translationKey: 'navbar.individual.home' },
    { route: Routes.ENTITY_MANAGE, translationKey: 'navbar.entity.manageEntity', fuzzy: true },
    { route: Routes.ENTITY_HOME, translationKey: 'navbar.entity.home' },
  ];

  for (const { route, translationKey, fuzzy = false } of titleConfigs) {
    if (matchRoute({ to: route, fuzzy })) {
      return t(translationKey);
    }
  }

  return t('navbar.default'); // Fallback
}

const pageTitle = usePageTitle();

<PageHeader title={pageTitle} />

