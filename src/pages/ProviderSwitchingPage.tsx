
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
import { useContext, useEffect } from 'react';
import { PageView, PageViewContext } from '../context/PageViewContext';
import SearchBar from '../components/SearchBar';
import SampleVisualSearchBar from '../components/VisualAutocomplete/SampleVisualSearchBar';
import Navigation from '../components/Navigation';
import { SearchTypeEnum, useAnswersActions, useAnswersState } from '@yext/answers-headless-react';
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

// Getting URL code starts here
let SearchQuery :any  = useAnswersState(state => state.query.input);
// console.log(SearchQuery,"SearchQuery");
const queryString : any = window.location.search;
let  urlParams : any = new URLSearchParams(queryString);

const product = urlParams.get('query');
  console.log(product,"product");

// console.log(params,"params");

const answersActions = useAnswersActions();


 

useEffect(()=>{
  if(SearchQuery!='' && SearchQuery!=null){
    updateParam(SearchQuery)
    }else{
      updateParam('')
    }
},[SearchQuery])
function updateParam(latestUserInput:any) {
  var paramValue = latestUserInput; // Replace with your updated value
  console.log(paramValue,"paramValue");
  var searchParams = new URLSearchParams(window.location.search);
  searchParams.set('query', paramValue);
  var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
  window.history.replaceState({}, '', newUrl);
}
// Getting URL code ends here
  const { pageView } = useContext(PageViewContext);
  usePageSetupEffect(verticalKey,6);
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

