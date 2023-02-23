import UniversalResults from '../components/UniversalResults';
import DirectAnswer from '../components/DirectAnswer';
import { universalResultsConfig, UniversalResultsConfig } from '../config/universalResultsConfig';
import SpellCheck from '../components/SpellCheck';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import SearchBar from '../components/SearchBar';
import SampleVisualSearchBar from '../components/VisualAutocomplete/SampleVisualSearchBar';
import Navigation from '../components/Navigation';
import { SearchTypeEnum, useAnswersActions, useAnswersState } from '@yext/answers-headless-react';
import locationpin from '../icons/location-pin.svg';
import callicon from '../icons/icon-call.svg';
import icon from '../icons/Location.svg'
import { useEffect } from 'react';


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

const universalResultsFilterConfig = {
  show: true
};

export default function UniversalSearchPage(props: { universalResultsConfig: UniversalResultsConfig }) {
  const { universalResultsConfig } = props;
  usePageSetupEffect();
    // Getting URL code starts here

    const queryString = window.location.search;
    let  urlParams : any = new URLSearchParams(queryString);
    const product = urlParams.get('query');
    
    const answersActions = useAnswersActions();
    
    useEffect(() => {
        answersActions.setQuery(product)
    }, []);
     
  
    // Getting URL code ends here
  const isVertical = useAnswersState(s => s.meta.searchType) === SearchTypeEnum.Vertical;

  const isLoading = useAnswersState(state => state.searchStatus.isLoading);





  return (
    <>
      <div>

        {isVertical
          ? <SearchBar
            placeholder='Search your Query....'
          />
          : <SampleVisualSearchBar />
        }
        <Navigation links={navLinks} />
        <SpellCheck />
        <DirectAnswer />

     
        {isLoading==true && !isLoading ?   <div id="pre-loader">
        <img src="https://communityfibre.co.uk/apple-touch-icon.png" />
   </div>: <>
   <section className="mt-5 border border-blackLight border-opacity-10">
  
  
</section>

        <UniversalResults
          appliedFiltersConfig={universalResultsFilterConfig}
          verticalConfigs={universalResultsConfig} />
   </> }

        
      </div>
    
    </>
  );
}