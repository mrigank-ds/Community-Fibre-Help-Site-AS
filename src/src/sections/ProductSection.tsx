import { SectionComponent, SectionConfig } from '../models/sectionComponent';
import { StandardCard } from '../components/cards/StandardCard';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import React, { useContext } from 'react';
import { useAnswersState } from '@yext/answers-headless-react';
import ProductVerticalResults from '../components/ProductVerticalResults';
import {ProductsCard} from '../components/cards/ProductsCard';
import ProductPage from '../pages/ProductPage';
interface productsSectionCssClasses {
    container ?: string,
    header?:string,
    body?:string,
    descriptionContainer?:string,
    ctaContainer?:string,
    cta1?:string,
    cta2?:string,
    ordinal?:string,
    title?:string,
    ctaButton?:string,
    section?:string
}

const builtInCssClasses: productsSectionCssClasses = {
    container: 'justify-between border rounded-lg mb-4 p-4 shadow-sm flex flex-row ProductVerticalContainer',
    header: 'text-grey-800 ProductHeaderClass',
    body: 'flex justify-end pt-2.5',
    descriptionContainer: 'w-full text-base',
    ctaContainer: 'flex flex-col justify-end ml-4',
    cta1: 'min-w-max bg-blue-600 text-white font-medium rounded-lg py-2 px-5 shadow',
    cta2: 'min-w-max bg-white text-blue-600 font-medium rounded-lg py-2 px-5 mt-2 shadow',
    ordinal: 'mr-1.5 text-lg font-medium',
    title: 'text-lg font-bold text-black-800',
    ctaButton: 'flex justify-center border-2 w-full rounded-md self-center	align-middle mt-4 hover:bg-green-900',
    section: ''
};

interface productsSectionConfig extends SectionConfig {
    customCssClasses?: productsSectionCssClasses,
    compositionmethod?: CompositionMethod
}


const productsSection: SectionComponent = function (props: productsSectionConfig): JSX.Element | null {

    const cssClasses = useComposedCssClasses(builtInCssClasses, props.customCssClasses, props.compositionmethod);
    const { results, cardConfig, header } = props;
    const latestQuery = useAnswersState((state) => state.query.mostRecentSearch);
    const verticalResults : any  = useAnswersState(state=>state.universal);
    const ProductVerticalResults : any  = verticalResults.verticals[1].results;let ProductResultsObj : any = '';
    ProductVerticalResults.forEach((_elements: any)  => {
        ProductResultsObj = _elements.rawData;
    });
    // console.log(ProductResultsObj,"ProductResultsObj");

    if (results.length === 0) {
        return null;
    }

    const cardComponent = cardConfig?.CardComponent || StandardCard;


    return (
        <>
            <section className={cssClasses.section}>
                {header}
                <h1>This is products aarea</h1>
            </section>
        </>
    );
};
export default productsSection;

