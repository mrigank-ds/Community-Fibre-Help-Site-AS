import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import ProductVerticalResults from '../components/ProductVerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import { ProductsCard } from '../components/cards/ProductsCard';
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

export default function ProductPage({ verticalKey }: {
  verticalKey: string
}) {
  const { pageView } = useContext(PageViewContext);
  usePageSetupEffect(verticalKey);

  return (
    <div className='flex'> 
      <FilterDisplayManager>
        {/* <FilterSearch
          label='Filter Search'
          sectioned={true}
          searchFields={filterSearchFields}/> */}
        <Divider />
        {/* <Facets
          searchOnChange={true}
          searchable={true}
          collapsible={true}
          defaultExpanded={true}/> */}
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
      
        currentVerticalLabel='products'
        verticalsConfig={[
         
          { label: 'Help Articles', verticalKey: 'faqs'},
          { label: 'Blogs', verticalKey: 'blogs'},
          { label: 'Video', verticalKey:'videos'},
          { label: 'Location', verticalKey:'location'},
          { label: 'Provider Switching', verticalKey:'provider_switching_'},

        ]}
          />
          <ProductVerticalResults
            CardComponent={ProductsCard}
          />
          <LocationBias />
        </div>
      }
    </div>
  )
}

