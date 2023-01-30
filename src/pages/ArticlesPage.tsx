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
import { useContext } from 'react';
import { PageView, PageViewContext } from '../context/PageViewContext';

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