import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import VerticalResults from '../components/VerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import { VideoCard } from '../components/cards/VideoCard';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import StaticFilters from '../components/StaticFilters';
import FilterDisplayManager from '../components/FilterDisplayManager';
import ViewFiltersButton from '../components/ViewFiltersButton';
import { useContext } from 'react';
import { PageView, PageViewContext } from '../context/PageViewContext';
import { universalResultsConfig } from '../config/universalResultsConfig';
import { SearchTypeEnum, useAnswersState } from '@yext/answers-headless-react';
import SearchBar from '../components/SearchBar';
import SampleVisualSearchBar from '../components/VisualAutocomplete/SampleVisualSearchBar';
import Navigation from '../components/Navigation';


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

export default function VideoPage({ verticalKey }: {
  verticalKey: string
}) {
  const { pageView } = useContext(PageViewContext);
  usePageSetupEffect(verticalKey);
  const isVertical = useAnswersState(s => s.meta.searchType) === SearchTypeEnum.Vertical;

  return (
    <>
    {isVertical
        ? <SearchBar
          placeholder= 'Videos'
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
            currentVerticalLabel='Video'
            verticalsConfig={[
              { label: 'Help Articles', verticalKey: 'help_articles'}, 
              { label: 'Products', verticalKey: 'product'},
            
              { label: 'Location', verticalKey:'locations'},
              { label: 'Provider Switching', verticalKey:'provider_switching'},
            ]}
          />
          <VerticalResults
            CardComponent={VideoCard}
          />
          <LocationBias />
        </div>
      }
    </div>
    </>
  )
}