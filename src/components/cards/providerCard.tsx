import { CompositionMethod, useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { CardProps } from '../../models/cardComponent';
import '../../sass/style.css';
import { useAnswersState } from '@yext/answers-headless-react';
import { eventClickAnalytics } from '../../config/analyticsConfig';


export interface StandardCardConfig {
  showOrdinal?: boolean
}

export interface StandardCardProps extends CardProps {
  configuration: StandardCardConfig,
  customCssClasses?: StandardCardCssClasses,
  cssCompositionMethod?: CompositionMethod
}

export interface StandardCardCssClasses {
    container?: string,
    header?: string,
    body?: string,
    descriptionContainer?: string,
    ctaContainer?: string,
    cta1?: string,
    cta2?: string,
    ordinal?: string,
    title?: string,
    ctaButton?: string,
    ProductPriceClass ?: string
  
  }
  
  

const builtInCssClasses: StandardCardCssClasses = {
  container: 'justify-between border border-blackLight border-opacity-10 rounded-lg mb-3 p-4 shadow-sm  flex-row ProviderVerticalContainer',
  header: 'text-grey-800 ProductHeaderClass',
  body: 'flex justify-end pt-2.5',
  descriptionContainer: 'w-full text-base',
  ctaContainer: 'flex flex-col justify-end ml-4',
  cta1: 'min-w-max bg-blue-600 text-white font-medium rounded-lg py-2 px-5 shadow',
  cta2: 'min-w-max bg-white text-blue-600 font-medium rounded-lg py-2 px-5 mt-2 shadow',
  ordinal: 'mr-1.5 text-lg font-medium',
  title: 'text-lg font-bold text-purple1',
  ProductPriceClass : 'ProductPrice flex flex-row'
}

interface CtaData {
  label: string,
  link: string,
  linkType: string
}

/**
 * This Component renders the base result card.
 * 
 * @param props - An object containing the result itself.
 */
export function ProviderCard(props: StandardCardProps): JSX.Element {
  const { configuration, result, customCssClasses, cssCompositionMethod } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

  //console.log(result, "result");

  const products: any = result.rawData;
  //const productsku = products.mpn ? products.mpn: 'SKU is not available';
  const name = result.name;
  const Productdec = products.c_description ? products.c_description: '';
  const ProductPhoto = products.c_image ? products.c_image[0].url : 'https://a.mktgcdn.com/p-sandbox/ICqsT6dBI9UeKt2G4bKSDEZC5U8q8AvRlATjy2v_E7Y/1152x960.jpg';
  const ProductLandingPage = products.landingPageUrl ? products.landingPageUrl : '#';
  const ProductPrice = products.price ? products.price : '23';

//console.log(Productdec,'Productdec')

function limit(string = '', limit = 0) {
  return string.substring(0, limit)
}
const greeting = limit(name, 33);
const decs = limit(Productdec, 53);
// console.log(greeting, "greeting");




  // TODO (cea2aj) Update this to render the ordinal once we get mocks from UX
  function renderOrdinal(index: number) {
    // return (
    //   <div className={cssClasses.ordinal}>{index}</div>
    // );
    return null;
  }

  function renderTitle(title: string) {
    return <div className={cssClasses.title}>{title}</div>
  }
  const queryId = useAnswersState(state => state.query.queryId) || ""; 
  const verticalKey = useAnswersState(state => state.vertical.verticalKey) || "";
  let searcher = verticalKey ? 'VERTICAL' : 'UNIVERSAL';   
  
  const knowmoreEventClick = () => {           
    eventClickAnalytics( 'VIEW_WEBSITE', products.id , "provider_switching_", queryId, searcher );
    
  };

  return (
    <div className={cssClasses.container}>
        <img src= {ProductPhoto} alt="Trainer Headshot"  />
   
      
      <div className={cssClasses.header}>
        <div className='ProductTitle'>
         

          <div className={cssClasses.title}>
          <p>{greeting} ....</p>
        </div>
        </div>
        
        <div className='Productdec'>
          <p>{decs}.....</p>
        </div>
        <div className={cssClasses.ProductPriceClass}>
        
        </div>
        <div className='ProductCta'>
          
            <div className={cssClasses.ctaButton}>
              <div className="sm:text-body align-middle font-heading  font-medium sm:text-base">
                <a target="_blank" onClick={knowmoreEventClick} href={ProductLandingPage} className='ctaBtn'>Learn More</a>
                 </div>
            </div>
          
        </div>
      </div>
      </div> 
  );
}