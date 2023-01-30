import { StandardCard } from '../components/cards/StandardCard';
import { ProductsCard } from '../components/cards/ProductsCard';

import { FaqCard } from '../components/cards/FaqCard';
import { VerticalConfig } from '../components/UniversalResults';

import LocationSection from '../sections/LocationSection';
import StandardSection from '../sections/StandardSection';
import { LocationCard } from '../components/cards/LocationCard';
import { VideoCard } from '../components/cards/VideoCard';
import {ProviderCard} from '../components/cards/providerCard';



export type UniversalResultsConfig = Record<string, VerticalConfig>;

export const universalResultsConfig: UniversalResultsConfig = {

  products: {
     label: 'products',
     viewAllButton: true,
     cardConfig: {
       CardComponent: ProductsCard,
       showOrdinal: false
     }
   },
  
  faqs: {
    label: 'Help Articles',
    viewAllButton: true,
    cardConfig: {
      CardComponent: FaqCard,
      showOrdinal: false
    }
  },
   videos: {
     //SectionComponent: StandardSection,
     label: 'Videos',
     viewAllButton: true,
     cardConfig: {
       CardComponent: VideoCard,
       showOrdinal: false
     }
   },
  locations: {
    label: 'Location',
    SectionComponent: LocationSection,
    //viewMapButton: true,
    viewAllButton: true,
    cardConfig: {
      CardComponent: LocationCard,
      showOrdinal: false,
    },
  },
  provider_switching_: {
    label: 'Provider Switching',
    //SectionComponent: LocationSection,
    //viewMapButton: true,
    viewAllButton: true,
    cardConfig: {
      CardComponent: ProviderCard,
      showOrdinal: false,
    },
  },
}
