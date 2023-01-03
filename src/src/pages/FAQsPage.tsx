import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import VerticalResults from '../components/VerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import { FaqCard } from '../components/cards/FaqCard';
import usePageSetupEffect from '../hooks/usePageSetupEffect';

export default function FAQsPage({ verticalKey }: {
  verticalKey: string
}) {
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
        currentVerticalLabel="Help Articles"
        verticalsConfig={[
        
        
           { label: 'Products', verticalKey: 'products'},
           { label: 'Video', verticalKey:'videos'},
              { label: 'Location', verticalKey:'location'},
              { label: 'Provider Switching', verticalKey:'provider_switching_'},

   
             
        ]}
      />
      <VerticalResults
        CardComponent={FaqCard}
      />
      <LocationBias />
    </div>
  )
}