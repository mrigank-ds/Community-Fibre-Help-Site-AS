import { FaqCard } from '../components/cards/FaqCards';
import { VerticalConfig } from '../components/UniversalResults';
import { HelpArticlesCard } from '../components/cards/HelpArticlesCard';




export type UniversalResultsConfig = Record<string, VerticalConfig>;
/**
 * This is for the verticals you see in Front-end.
 */
export const universalResultsConfig: UniversalResultsConfig = {
  help_articles: {
    label: 'Help Articles',
    viewAllButton: true,
    cardConfig: {
      CardComponent: HelpArticlesCard,
    }
  },
  faqs: {
    label: 'FAQs',
    viewAllButton: true,
    cardConfig: {
      CardComponent: FaqCard,
    }
  }

}