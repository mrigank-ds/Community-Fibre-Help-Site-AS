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
  title?: string
}

const builtInCssClasses: StandardCardCssClasses = {
  container: 'flex flex-col justify-between border rounded-lg mb-4 p-4 shadow-sm ArticlesCardContainer',
  header: 'flex text-gray-800',
  body: 'flex justify-end pt-2.5',
  descriptionContainer: 'w-full text-base',
  ctaContainer: 'flex flex-col justify-end ml-4',
  cta1: 'min-w-max bg-blue-600 text-white font-medium rounded-lg py-2 px-5 shadow',
  cta2: 'min-w-max bg-white text-blue-600 font-medium rounded-lg py-2 px-5 mt-2 shadow',
  ordinal: 'mr-1.5 text-lg font-medium',
  title: 'font-bold ArticlesTitle'
}



/**
 * This Component renders the base result card.
 * 
 * @param props - An object containing the result itself.
 */
export function ArticlesCard(props: StandardCardProps): JSX.Element {
  const { configuration, result, customCssClasses, cssCompositionMethod } = props;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);

  const ArticleCard : any  = result.rawData;
  const ArticleDescription = ArticleCard.description ? ArticleCard.description : null;
  const ArticleImageUrl = ArticleCard.primaryPhoto ? ArticleCard.primaryPhoto.image.url : null ;
  const ArticleLandingPage = ArticleCard.slug;

  /**
   * This function limits the words
   * @param string 
   * @param limit 
   * @returns The variable containing the truncated Description.
   */
  // function limit(string = '', limit = 0) {
  //   return string.substring(0, limit)
  // }
  // const greeting = limit(ArticleDescription, 100);
  // console.log(greeting, "greeting");

  // TODO (cea2aj) Update this to render the ordinal once we get mocks from UX
  function renderOrdinal(index: number) {
    // return (
    //   <div className={cssClasses.ordinal}>{index}</div>
    // );
    return null;
  }

  

  function renderTitle(title: string) {
    return <div className={cssClasses.title}>{title}</div>;
  }

  return (
    <div className={cssClasses.container}>
          <img className='ArticlesImage' src={ArticleImageUrl}></img>
      <div className={cssClasses.header}>
        {configuration.showOrdinal && result.index && renderOrdinal(result.index)}
        {result.name && renderTitle(result.name)}
      </div>
      <div className='ArticlesDescription'>
        
      </div>
      <div className='ArticleCta'>
          <a href={ArticleLandingPage}><p  className='ArticleCtaP'>Continue Reading</p></a>
      </div>
    </div>
  );
}