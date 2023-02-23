import classNames from 'classnames';
import { useRef, useEffect, useState, useContext } from 'react';
import { SectionConfig } from '../models/sectionComponent';
import AlternativeVerticals from './AlternativeVerticals';
import { StandardCard } from './cards/StandardCard';
import { LocationContext } from './LocationContext';
import { LocationActionTypes } from './locationReducers';
import Mapbox, { MapLocationData } from './mapbox/Mapbox';
import MapGoogle from './mapbox/MapGoogle';
import { GoogleMaps } from './mapbox/GoogleMaps';
import { VerticalResultsDisplay } from './VerticalResults'; 
import { Maps } from './mapbox/mapMpbile';


interface LocationResultsProps extends SectionConfig {}

export default function LocationResults(props: LocationResultsProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { state, dispatch } = useContext(LocationContext);
  const screenSize = 'xl';

  const { results, cardConfig } = props;
  const cardComponent = cardConfig?.CardComponent || StandardCard;
  const refLcation = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mapLocations: MapLocationData[] = [];
    for (const result of results) {
      const location = result.rawData as unknown as MapLocationData;
      if (result.id && location.yextDisplayCoordinate) {
        mapLocations.push({
          id: result.id ?? '',
          name: location.name,
          mainPhone: location.mainPhone,
          address: location.address,
          yextDisplayCoordinate: {
            latitude: location.yextDisplayCoordinate.latitude,
            longitude: location.yextDisplayCoordinate.longitude,
          },

        });
      }
    }
    dispatch({ type: LocationActionTypes.SetMapLocations, payload: { mapLocations } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  const googleMapsConfig =  {
    centerLatitude: 26.8894208,
    centerLongitude:75.8349824,
    googleMapsApiKey: "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18"   
  };
  

  const renderMap = () => {
    if (!state.mapLocations) return null;

    return <GoogleMaps
    apiKey={googleMapsConfig.googleMapsApiKey}
    centerLatitude={googleMapsConfig.centerLatitude}
    centerLongitude={googleMapsConfig.centerLongitude}
    defaultZoom={0}
    showEmptyMap={true}
    refLcation={refLcation}
  />;
  };
  const mobileMap = () => {
    if (!state.mapLocations) return null;

    return <Maps
    apiKey={googleMapsConfig.googleMapsApiKey}
    centerLatitude={googleMapsConfig.centerLatitude}
    centerLongitude={googleMapsConfig.centerLongitude}
    defaultZoom={0}
    showEmptyMap={true}
    refLcation={refLcation}
  />;
  };

  return (
    <div className='border border-blackLight mx-4 md:mx-0 border-opacity-10'>
    <div className="flex flex-wrap" ref={refLcation}>
      <div className={classNames('w-full map-section', { hidden: screenSize !== 'xl' && !state.showMap })}>
         {state.mapLocations && state.mapLocations.length > 0 ?
       renderMap()  :null}
      </div>
      <div

        className={classNames('overflow-y-auto p-2 sm:overflow-auto scrollbar-container', {

          hidden: state.showMap,
          'w-full': !state.showMap,
        })}
        style={{ maxHeight: '580px' }}>
        {state.mapLocations && state.mapLocations.length > 0 ? (
          <VerticalResultsDisplay
            results={results}
            CardComponent={cardComponent}
            {...(cardConfig && { cardConfig })}
            customCssClasses={{ container: 'px-4 sm:px-0' }}
          />
        ) : state.noGymsMessage ? (
          <div className="flex h-full items-center justify-center">
            <span className="font-heading text-xl">{state.noGymsMessage}</span>
          </div>
        ) : (
          <AlternativeVerticals
            currentVerticalLabel="Locations"           
            verticalsConfig={[
              { label: 'Help Articles', verticalKey: 'help_articles'}, 
              { label: 'products', verticalKey: 'product'},
             
              { label: 'Video', verticalKey:'videos'},
              { label: 'Provider Switching', verticalKey:'provider_switching'},
            ]}
            cssCompositionMethod="assign"
            customCssClasses={{
              container: 'flex flex-col justify-between mb-4 p-0 shadow-sm no-result-data',
              noResultsText: 'text-lg font-heading pb-2',
              categoriesText: 'font-body text-gray-500',
              suggestions: 'pt-0 ',
              suggestion: 'pb-4  font-heading',
              allCategoriesLink: 'cursor-pointer hover:underline focus:underline text-gray-500',
            }}
          />
        )}
      </div>
      </div>
    </div>
  );
}
