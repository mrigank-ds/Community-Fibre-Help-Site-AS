import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import VerticalResults from '../components/VerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import SearchBar from '../components/SearchBar';
import { universalResultsConfig } from '../config/universalResultsConfig';
import { SearchTypeEnum, useAnswersState } from '@yext/answers-headless-react';
import SampleVisualSearchBar from '../components/VisualAutocomplete/SampleVisualSearchBar';
import Navigation from '../components/Navigation';
import { ArticleCard } from '../components/cards/ArticleCard';

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

export default function FAQsPage({ verticalKey, limit }: {
  verticalKey: string,
  limit:number
}) {
  usePageSetupEffect(verticalKey);
  const isVertical = useAnswersState(s => s.meta.searchType) === SearchTypeEnum.Vertical;

  return (
    <>
   {isVertical
        ? <SearchBar
          placeholder= 'Frequently Asked Question'
        />
        : <SampleVisualSearchBar />
      }
      <Navigation links={navLinks} />
    <div>

      <DirectAnswer />
      <SpellCheck />
      <ResultsCount />
      <AppliedFilters
        hiddenFields={['builtin.entityType']}
      />
 <AlternativeVerticals
        currentVerticalLabel="Help Articles"
        verticalsConfig={[
        
        
           { label: 'Products', verticalKey: 'product'},
           { label: 'Video', verticalKey:'videos'},
              { label: 'Location', verticalKey:'locations'},
              { label: 'Provider Switching', verticalKey:'provider_switching'},

   
             
        ]}
      />
      <VerticalResults
        CardComponent={ArticleCard}
      />
      <LocationBias />
    </div>
    </>
  )
}