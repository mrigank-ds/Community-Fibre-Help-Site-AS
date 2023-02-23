
import { SearchTypeEnum, useAnswersState } from '@yext/answers-headless-react';
import { universalResultsConfig } from '../config/universalResultsConfig';
import { LayoutComponent } from '../PageRouter';

import Header from '../components/Header'
import Footer from '../components/Footer'



/**
 * A LayoutComponent that provides a SearchBar and Navigation tabs to a given page.
 */
const StandardLayout: LayoutComponent = ({ page }) => {
  const isVertical = useAnswersState(s => s.meta.searchType) === SearchTypeEnum.Vertical;
  return (
    <>
    
    <Header/>


    <div className='max-w-7xl px-0 md:px-8 mx-auto'>

      {page}
      </div>
      <Footer/>
    </>
  )
}
export default StandardLayout;