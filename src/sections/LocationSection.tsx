import { SectionComponent, SectionConfig } from '../models/sectionComponent';
import { StandardCard } from '../components/cards/StandardCard';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import React, { useContext } from 'react';
import { useAnswersState } from '@yext/answers-headless-react';
import LocationResults from '../components/LocationResults';
import { LocationProvider } from '../components/LocationContext';

//prettier-ignore
interface LocationSectionCssClasses {
  section?: string
}

const builtInCssClasses: LocationSectionCssClasses = {
  section: '',
};

interface LocationSectionConfig extends SectionConfig {
  customCssClasses?: LocationSectionCssClasses,
  compositionmethod?: CompositionMethod
}

const LocationSection: SectionComponent = function (props: LocationSectionConfig): JSX.Element | null {
  const cssClasses = useComposedCssClasses(builtInCssClasses, props.customCssClasses, props.compositionmethod);
  const { results, cardConfig, header } = props;
  const latestQuery = useAnswersState((state) => state.query.mostRecentSearch);

//   const screenSize = useContext(ResponsiveContext);

  if (results.length === 0) {
    return null;
  }

  const cardComponent = cardConfig?.CardComponent || StandardCard;

  return (
    <LocationProvider>
      <section className={cssClasses.section + "mt-5 location-page mx-4 md:mx-0 border border-blackLight border-opacity-10"}>
        {header}
        <LocationResults results={results} verticalKey="locations" cardConfig={cardConfig} />
        {/* {screenSize === 'sm' && renderViewAllLink({ verticalKey: props.verticalKey, latestQuery, label: props.label })} */}
      </section>
    </LocationProvider>
  );
};
export default LocationSection;