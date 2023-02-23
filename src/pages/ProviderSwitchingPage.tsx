
import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters, { AppliedFiltersDisplay } from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import VerticalResults from '../components/VerticalResults';
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
import SearchBar from '../components/SearchBar';
import SampleVisualSearchBar from '../components/VisualAutocomplete/SampleVisualSearchBar';
import Navigation from '../components/Navigation';
import { SearchTypeEnum, useAnswersState } from '@yext/answers-headless-react';
import { universalResultsConfig } from '../config/universalResultsConfig';



const navLinks = [
  {
    to: '/',
    label: 'All'
  },
  ...Object.entries(universalResultsConfig).map(([verticalKey, config]) => ({
    to: verticalKey,
    label: config.label || verticalKey
  }))
]

export default function ProviderSwitchingPage({ verticalKey }: {
  verticalKey: string
}) {
  const { pageView } = useContext(PageViewContext);
  usePageSetupEffect(verticalKey);
  const isVertical = useAnswersState(s => s.meta.searchType) === SearchTypeEnum.Vertical;


  return (
    <>
     {isVertical
        ? <SearchBar
          placeholder= 'Provider Switching'
        />
        : <SampleVisualSearchBar />
      }
      <Navigation links={navLinks} />
      
    <div className='flex'> 
      <FilterDisplayManager>
       
      

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
         
          { label: 'Help Articles', verticalKey: 'help_articles'},
         
          { label: 'Video', verticalKey:'videos'},
          { label: 'Location', verticalKey:'locations'},
          { label: 'Products', verticalKey: 'product'},

          
        ]}
          />
          <VerticalResults
            CardComponent={ProviderCard}
          />
          <LocationBias />
        </div>
      }
    </div>
    </>
  )
}

