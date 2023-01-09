import UniversalSearchPage from '../pages/UniversalSearchPage';
import FAQsPage from '../pages/FAQsPage';
import { universalResultsConfig } from './universalResultsConfig';
import LocationsPage from '../pages/LocationsPage'; 
import ProductPage from '../pages/ProductPage';
import ProviderSwitchingPage from '../pages/ProviderSwitchingPage'
import VideoPages from '../pages/VideoPages';



/**
 * This defines the pasth and page used for showing a vertical on front-end.
 */
export const routeConfig = [
  {
    path: '/',
    exact: true,
    page: <UniversalSearchPage universalResultsConfig={universalResultsConfig} />
  },
  {
    path: '/faqs',
    page: <FAQsPage verticalKey='faqs'/>
  },
  {
    path: '/locations',
    page: <LocationsPage verticalKey="locations" />
  },



  {
    path: '/products',
    page: <ProductPage verticalKey='products' />
  },
 {
    path: '/provider_switching_',
    page: <ProviderSwitchingPage verticalKey='provider_switching_' />
  },
  {
    path: '/videos',
    page: <VideoPages verticalKey='videos' />
  }
];