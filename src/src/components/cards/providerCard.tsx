import { CompositionMethod, useComposedCssClasses } from '../../hooks/useComposedCssClasses';
import { CardProps } from '../../models/cardComponent';
import '../../sass/style.css';

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
  title: 'text-lg font-bold text-black-800',
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

  console.log(result, "result");

  const products: any = result.rawData;
  //const productsku = products.mpn ? products.mpn: 'SKU is not available';
  const Productdec = products.services ? products.services: 'SKU is not available';
  const ProductPhoto = products.primaryPhoto ? products.primaryPhoto.image.url : 'https://a.mktgcdn.com/p-sandbox/ICqsT6dBI9UeKt2G4bKSDEZC5U8q8AvRlATjy2v_E7Y/1152x960.jpg';
  const ProductLandingPage = products.landingPageUrl ? products.landingPageUrl : '#';
  const ProductPrice = products.price ? products.price : '23';



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

  return (
    <div className={cssClasses.container}>
        <img src= {ProductPhoto} alt="Trainer Headshot"  />
   
      
      <div className={cssClasses.header}>
        <div className='ProductTitle'>
          {configuration.showOrdinal && result.index && renderOrdinal(result.index)}
          {result.name && renderTitle(result.name)}
        </div>
        
        <div className='Productdec'>
          {/* <p>{Productdec}</p> */}
        </div>
        <div className={cssClasses.ProductPriceClass}>
        
        </div>
        <div className='ProductCta'>
          <a target="_blank" href={ProductLandingPage}>
            <div className={cssClasses.ctaButton}>
              <div className="sm:text-body align-middle font-heading  font-medium sm:text-base">
                <a href="" className='ctaBtn'>Learn More</a>
                 </div>
            </div>
          </a>
        </div>
      </div>
      </div> 
  );
}