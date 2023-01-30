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
  imageContainer?: string,
  image?:string,
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
  container: 'border border-blackLight border-opacity-10 rounded-lg mb-4 p-4 pb-8 shadow-sm ProductVerticalContainer relative',
  header: 'ProductHeaderClass',
  body: 'flex justify-end pt-2.5',
  imageContainer: 'relative h-0 inline-block w-full overflow-hidden mb-5 imageContainer',
  image: 'absolute top-0 left-0 w-full h-full object-contain border-0 border-none',
  descriptionContainer: 'w-full text-base',
  ctaContainer: 'flex flex-col justify-end ml-4',
  cta1: 'min-w-max text-white font-medium rounded-lg py-2 px-5 shadow',
  cta2: 'min-w-max bg-white font-medium rounded-lg py-2 px-5 mt-2 shadow',
  ordinal: 'mr-1.5 text-lg font-medium',
  title: 'text-lg font-bold truncate',
  ctaButton: 'ctaBtn',
  ProductPriceClass : 'ProductPrice flex flex-row mb-2.5'
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
export function ProductsCard(props: StandardCardProps): JSX.Element {
  const { configuration, result, customCssClasses, cssCompositionMethod } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);



   const products: any = result.rawData;
  const productsbrand = products.material? products.material: "";
  const productsSpeed = products.color? products.color: "";
  const Productdec = products.richTextDescription ? products.richTextDescription: "";
  const ProductPhoto = products.primaryPhoto ? products.primaryPhoto.image.url : null;
  const ProductLandingPage = products.landingPageUrl ? products.landingPageUrl : '#';
  const ProductPrice = products.brand? products.brand: "";



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

      <div className={cssClasses.header}>
        <div className='ProductTitle'>
          {configuration.showOrdinal && result.index && renderOrdinal(result.index)}
          {result.name && renderTitle(result.name)}
        </div>
        <div className='productsku mb-2.5'>
          <p>{productsbrand}</p>
        </div>
        <div className='productsku mb-2.5'>
          <p>{productsSpeed}</p>
        </div>
        <div className='Productdec'>
          {/* <p>{Productdec}</p> */}
        </div>
        <div className={cssClasses.ProductPriceClass}>
          <p>{ProductPrice}</p>
        </div>
        <div className='ProductCta'>
          <a target="_blank" href={ProductLandingPage}>
            <div className={cssClasses.ctaButton}>
              <div className="sm:text-body align-middle font-heading  font-medium sm:text-base">Enquiry</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}