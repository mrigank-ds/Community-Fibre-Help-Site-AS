import ResultsCount from '../components/ResultsCount';
import DirectAnswer from '../components/DirectAnswer';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import { LocationCard } from '../components/cards/LocationCard';
import { LocationProvider } from '../components/LocationContext';
// import { useContext } from 'react';
import { SearchTypeEnum, useAnswersState } from '@yext/answers-headless-react';
import LocationResults from '../components/LocationResults';
import MapToggleButton from '../components/MapToggleButton';
import SearchBar from '../components/SearchBar';
import SampleVisualSearchBar from '../components/VisualAutocomplete/SampleVisualSearchBar';
import Navigation from '../components/Navigation';
import { universalResultsConfig } from '../config/universalResultsConfig';

{/* const filterSearchFields = [
  {
    fieldApiName: 'name',
    entityType: 'location',
  },
  {
    fieldApiName: 'paymentOptions',
    entityType: 'location',
  },
  {
    fieldApiName: 'services',
    entityType: 'location',
  },
]; */}
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

export default function LocationsPage({ verticalKey }: { verticalKey: string }) {
  usePageSetupEffect(verticalKey);
  const screenSize = 'sm';  
  const results = useAnswersState((state) => state.vertical.results) || [];
  { /*const latestQuery = useAnswersState((state) => state.query.mostRecentSearch); */}
  const isVertical = useAnswersState(s => s.meta.searchType) === SearchTypeEnum.Vertical;

  return (
    <>
    {isVertical
      ? <SearchBar
        placeholder= 'Locations'
      />
      : <SampleVisualSearchBar />
    }
    <Navigation links={navLinks} />
  
    <LocationProvider>
      <div className="flex location-page">
        <div className="flex-grow">
          <DirectAnswer />
          <SpellCheck
            cssCompositionMethod="assign"
            customCssClasses={{
              container: 'font-body text-xl',
              helpText: '',
              link: 'text-gold font-bold cursor-pointer hover:underline focus:underline',
            }}
          />
          <ResultsCount cssCompositionMethod="assign" customCssClasses={{ text: 'text-sm font-body' }} />
          {/* <AppliedFilters
          hiddenFields={['builtin.entityType']}
          customCssClasses={{
            nlpFilter: 'mb-4',
            removableFilter: 'mb-4',
          }}
        /> */}
          {/* <VerticalResults CardComponent={LocationCard} displayAllResults={true} /> */}
          {screenSize === 'sm' && (
            <div className="pb-2">
              <MapToggleButton />
            </div>
          )}
          <LocationResults results={results} verticalKey={verticalKey} cardConfig={{ CardComponent: LocationCard }} />
          <LocationBias customCssClasses={{ container: 'p-8' }} />
        </div>
      </div>
    </LocationProvider>
    </>
  );
}
