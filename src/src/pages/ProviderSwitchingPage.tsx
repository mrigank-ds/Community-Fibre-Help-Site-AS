
import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import ProductVerticalResults from '../components/ProductVerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import {ProviderCard} from '../components/cards/providerCard';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import FilterDisplayManager from '../components/FilterDisplayManager';
import Facets from '../components/Facets';
import FilterSearch from '../components/FilterSearch';
import { Divider } from '../components/StaticFilters';
import ViewFiltersButton from '../components/ViewFiltersButton';
import { useContext } from 'react';
import { PageView, PageViewContext } from '../context/PageViewContext';

const filterSearchFields = [{
  fieldApiName: 'name',
  entityType: 'location'
}, {
  fieldApiName: 'paymentOptions',
  entityType: 'location'
}, {
  fieldApiName: 'services',
  entityType: 'location'
}];

export default function ProviderSwitchingPage({ verticalKey }: {
  verticalKey: string
}) {
  const { pageView } = useContext(PageViewContext);
  usePageSetupEffect(verticalKey);

  return (
    <div className='flex'> 
      <FilterDisplayManager>
       
        
        <Facets
          searchOnChange={true}
          searchable={false}
          collapsible={true}
          defaultExpanded={true}/>
      </FilterDisplayManager>
      { (pageView === PageView.Desktop || pageView === PageView.FiltersHiddenMobile) &&
        <div className='flex-grow'>
          <DirectAnswer />
          <SpellCheck />
          <div className='flex'>
            <ResultsCount />
            {pageView === PageView.FiltersHiddenMobile && 
              <ViewFiltersButton />}
          </div>
          <AppliedFilters
            hiddenFields={['builtin.entityType']}
          />
  <AlternativeVerticals
      
        currentVerticalLabel='Provider Switcher'
        verticalsConfig={[
         
          { label: 'Help Articles', verticalKey: 'faqs'},
          { label: 'Blogs', verticalKey: 'blogs'},
          { label: 'Video', verticalKey:'videos'},
          { label: 'Location', verticalKey:'location'},
          { label: 'Products', verticalKey: 'products'},

          
        ]}
          />
          <ProductVerticalResults
            CardComponent={ProviderCard}
          />
          <LocationBias />
        </div>
      }
    </div>
  )
}

