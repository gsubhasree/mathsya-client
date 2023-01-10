import React from 'react';

import { GeneralPageContainer } from '../containers/GeneralPageContainer';
import { AuthPageContainer } from '../containers/AuthPageContainer';
import { LandingPageContainer } from '../containers/LandingPageContainer';

import { Homepage } from '../components/Home';
import { App } from '../components/Geofence';
import GlobalfencePage from '../components/Globalfence';
import { CreateProduct } from '../components/Product/CreateProduct';
import { DisplayProducts } from '../components/Product/DisplayProducts';
import { ShowProduct } from '../components/Product/ShowProduct';

import { getAllOwnedProducts, getAllProductsInAuction, getAllProductsInHistory } from '../utils/requests';
import ClimatePage from '../components/Climate';
import PredictFishPage from '../components/PredictFish';

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
    url: '/create-new-product',
    component: <GeneralPageContainer child={<CreateProduct />} />,
    name: 'CreateProductPageContainer',
    label: 'create-new-product'
  },
  {
    url: '/products-owned',
    component: <GeneralPageContainer child={<DisplayProducts name="products-owned" fetchRequest={getAllOwnedProducts} />} />,
    name: 'ProductsOwnedPageContainer',
    label: 'products-owned'
  },
  {
    url: '/historical-products',
    component: <GeneralPageContainer child={<DisplayProducts name="historical-products" fetchRequest={getAllProductsInHistory} />} />,
    name: 'HistoricalProductsPageContainer',
    label: 'historical-products'
  },
  {
    url: '/products-in-auction',
    component: <GeneralPageContainer child={<DisplayProducts name="products-in-auction" fetchRequest={getAllProductsInAuction} />} />,
    name: 'ProductsInAuctionPageContainer',
    label: 'products-in-auction'
  },
  {
    url: '/show-product/:id',
    component: <GeneralPageContainer child={<ShowProduct />} />,
    name: 'ShowProductPageContainer',
    label: 'show-product'
  }, {
    url: '/climate',
    component: <GeneralPageContainer child={<ClimatePage />} />,
    name: 'ClimateContainer',
    label: 'climate'
  },
  {
    url: '/predictFish',
    component: <GeneralPageContainer child={<PredictFishPage />} />,
    name: 'PredictFishContainer',
    label: 'predictFish'
  }
];
