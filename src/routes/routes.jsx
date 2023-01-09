import React from 'react';

import { GeneralPageContainer } from '../containers/GeneralPageContainer';
import { AuthPageContainer } from '../containers/AuthPageContainer';
import { LandingPageContainer } from '../containers/LandingPageContainer';

import { Homepage } from '../components/Home';
import { App } from '../components/Geofence';
import GlobalfencePage from '../components/Globalfence';
import ClimatePage from '../components/Climate';

export const publicRoutes = [
  {
    url: '/auth',
    component: <AuthPageContainer />,
    name: 'AuthPageContainer'
  },
  {
    url: '/',
    component: <LandingPageContainer />,
    name: 'LandingPageContainer'
  }
];

export const privateRoutes = [
  {
    url: '/home',
    component: <GeneralPageContainer child={<Homepage />} />,
    name: 'HomePageContainer',
    label: 'home'
  },
  {
    url: '/geofence',
    component: <GeneralPageContainer child={<App />} />,
    name: 'GeofenceContainer',
    label: 'geofence'
  },
  {
    url: '/globalfence',
    component: <GeneralPageContainer child={<GlobalfencePage />} />,
    name: 'GlobalfenceContainer',
    label: 'globalfence'
  },
  {
    url: '/climate',
    component: <GeneralPageContainer child={<ClimatePage />} />,
    name: 'ClimateContainer',
    label: 'climate'
  }
];
