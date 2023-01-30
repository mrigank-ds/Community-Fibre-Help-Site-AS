import Navigation from '../components/Navigation';
import { SearchTypeEnum, useAnswersState } from '@yext/answers-headless-react';
import { universalResultsConfig } from '../config/universalResultsConfig';
import { LayoutComponent } from '../PageRouter';
import SearchBar from '../components/SearchBar';
import SampleVisualSearchBar from '../components/VisualAutocomplete/SampleVisualSearchBar';
import Header from '../components/Header'
import Footer from '../components/Footer'

const navLinks = [
  {
    to: '/',
    label: 'Tools'
  },
  ...Object.entries(universalResultsConfig).map(([verticalKey, config]) => ({
    to: verticalKey,
    label: config.label || verticalKey
  }))
]

/**
 * A LayoutComponent that provides a SearchBar and Navigation tabs to a given page.
 */
const StandardLayout: LayoutComponent = ({ page }) => {
  const isVertical = useAnswersState(s => s.meta.searchType) === SearchTypeEnum.Vertical;
  return (
    <><Header/>
      {isVertical
        ? <SearchBar
          placeholder= 'Search your Query....'
        />
        : <SampleVisualSearchBar />
      }
      <Navigation links={navLinks} />
      {page}
      <Footer/>
    </>
  )
}
export default StandardLayout;