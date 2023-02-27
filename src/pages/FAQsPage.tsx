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
import { SearchTypeEnum, useAnswersActions, useAnswersState } from '@yext/answers-headless-react';
import SampleVisualSearchBar from '../components/VisualAutocomplete/SampleVisualSearchBar';
import Navigation from '../components/Navigation';
import { ArticleCard } from '../components/cards/ArticleCard';
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

export default function FAQsPage({ verticalKey, limit }: {
  verticalKey: string,
  limit:number
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
  
  // useEffect(() => {
  //     answersActions.setQuery(product)
  // }, []);
   
 
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