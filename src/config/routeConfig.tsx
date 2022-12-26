import UniversalSearchPage from '../pages/UniversalSearchPage';
import FAQsPage from '../pages/FAQsPage';
import { universalResultsConfig } from './universalResultsConfig';
import HelpArticlePage from '../pages/HelpArticlePage';




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
    path: '/help_articles',
    page: <HelpArticlePage verticalKey='help_articles'/>
  }
];