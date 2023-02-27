import UniversalSearchPage from '../pages/UniversalSearchPage';
import FAQsPage from '../pages/FAQsPage';
import { universalResultsConfig } from './universalResultsConfig';
import LocationsPage from '../pages/LocationsPage';
import ProductPage from '../pages/ProductPage';
import ProviderSwitchingPage from '../pages/ProviderSwitchingPage'
import VideoPages from '../pages/VideoPages';
import { getUserLocation } from '../utils/search-operations';




/**
 * This defines the pasth and page used for showing a vertical on front-end.
 */
export const verticalLimit = 18

export const routeConfig = [
  {
    path: '/',
    exact: true,
    page: <UniversalSearchPage universalResultsConfig={universalResultsConfig} />
  },
  {
    path: '/help_articles',
    page: <FAQsPage verticalKey='help_articles' limit={verticalLimit} />
  },
  {
    path: '/locations',
    page: <LocationsPage verticalKey="locations" />
  },



  {
    path: '/product',
    page: <ProductPage verticalKey='product' />
  },
  {
    path: '/provider_switching',
    page: <ProviderSwitchingPage verticalKey='provider_switching'/>
  },
  {
    path: '/video',
    page: <VideoPages verticalKey='video' />

  }

];