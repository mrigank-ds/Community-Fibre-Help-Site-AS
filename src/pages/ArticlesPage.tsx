import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import VerticalResults from '../components/VerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import { ArticlesCard } from '../components/cards/ArticlesCard';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import StaticFilters from '../components/StaticFilters';
import FilterDisplayManager from '../components/FilterDisplayManager';
import ViewFiltersButton from '../components/ViewFiltersButton';
import { useContext, useEffect } from 'react';
import { PageView, PageViewContext } from '../context/PageViewContext';
import { useAnswersActions, useAnswersState } from '@yext/answers-headless-react';

/**
 * Static Filter/Facets
 */
// const staticFiltersConfig = [{
//   title: 'Venue',
//   options: [
//     {
//       label: 'West End Avenue',
//       fieldId: 'venueName',
//       value: 'West End Avenue'
//     },
//     {
//       label: 'Peaceful Coffee',
//       fieldId: 'venueName',
//       value: 'Peaceful Coffee',
//     },
//   ]
// }]

export default function ArticlesPage({ verticalKey }: {
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
 
//  useEffect(() => {
//      answersActions.setQuery(product)
//  }, []);
  

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
  const { pageView } = useContext(PageViewContext);
  usePageSetupEffect(verticalKey);

  return (
    <div className='flex'>
      <FilterDisplayManager>
        {/* <StaticFilters
          filterConfig={staticFiltersConfig}
        /> */}
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
            currentVerticalLabel='Articles'
            verticalsConfig={[
              { label: 'FAQs', verticalKey: 'faqs'}, 
              { label: 'Products', verticalKey: 'products'},
              { label: 'Blogs', verticalKey: 'blogs'},
              { label: 'Member Options', verticalKey: 'member_options'}


            ]}
          />
          <VerticalResults
            CardComponent={ArticlesCard}
          />
          <LocationBias />
        </div>
      }
    </div>
  )
}