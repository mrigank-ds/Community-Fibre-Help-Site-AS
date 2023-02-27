import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import VerticalResults from '../components/VerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import { HelpArticlesCard } from '../components/cards/HelpArticlesCard';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import { useAnswersActions, useAnswersState } from '@yext/answers-headless-react';
import { useEffect } from 'react';
// import VerticalResults from '../components/VerticalResults';

export default function HelpArticlePage({ verticalKey }: {
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
  usePageSetupEffect(verticalKey);

  return (
    <div>
      <DirectAnswer />
      <SpellCheck />
      <ResultsCount />
      <AppliedFilters
        hiddenFields={['builtin.entityType']}
      />
      <AlternativeVerticals
        currentVerticalLabel='FAQs'
        verticalsConfig={[
          { label: 'Events', verticalKey: 'events' },
          { label: 'Jobs', verticalKey: 'jobs' },
          { label: 'Locations', verticalKey: 'locations' }
        ]}
      />
      <VerticalResults
        CardComponent={HelpArticlesCard}
      />
    </div>
  )
}