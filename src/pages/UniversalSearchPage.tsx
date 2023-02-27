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
    let SearchQuery :any  = useAnswersState(state => state.query.input);
    // console.log(SearchQuery,"SearchQuery");
    const queryString : any = window.location.search;
    let  urlParams : any = new URLSearchParams(queryString);
    
    const product = urlParams.get('query');
      console.log(product,"product");
    
    // console.log(params,"params");

    const answersActions = useAnswersActions();
    
    useEffect(() => {
        answersActions.setQuery(product)
    }, []);
     
   
    useEffect(()=>{
      if(!SearchQuery){
      updateParam(SearchQuery)
      }else{
        updateParam('')
      }
    },[SearchQuery])
    function updateParam(latestUserInput:any) {
      var paramValue = SearchQuery; // Replace with your updated value
      console.log(paramValue,"paramValue");
      var searchParams = new URLSearchParams(window.location.search);
      searchParams.set('query', paramValue);
      var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
      window.history.replaceState({}, '', newUrl);
    }
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