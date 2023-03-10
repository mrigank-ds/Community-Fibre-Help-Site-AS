import { SearchTypeEnum, useAnswersActions, useAnswersState, LocationBiasMethod } from '@yext/answers-headless-react';
import InputDropdown, { InputDropdownCssClasses } from './InputDropdown';
import { ReactComponent as YextLogoIcon } from '../icons/yext_logo.svg';
import '../sass/Autocomplete.scss';
import DropdownSection, { DropdownSectionCssClasses, Option } from './DropdownSection';
import { processTranslation } from './utils/processTranslation';
import SearchButton from './SearchButton';
import { useSynchronizedRequest } from '../hooks/useSynchronizedRequest';
import useSearchWithNearMeHandling from '../hooks/useSearchWithNearMeHandling';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import renderAutocompleteResult, {
  AutocompleteResultCssClasses,
  builtInCssClasses as AutocompleteResultBuiltInCssClasses
} from './utils/renderAutocompleteResult';
import { ReactComponent as MagnifyingGlassIcon } from '../icons/magnifying_glass.svg';
import ClearButton from './ClearButton';


const SCREENREADER_INSTRUCTIONS = 'When autocomplete results are available, use up and down arrows to review and enter to select.'

export const builtInCssClasses: SearchBarCssClasses = {
  container: 'search-nav',
  divider: 'border-t mx-2.5',
  dropdownContainer: ' absolute top-full left-0 w-full bg-white border border-blackLight border-opacity-10 pt-4 pb-3 z-10',
  inputContainer: 'inline-flex items-center justify-between w-full',
  inputDropdownContainer: 'bg-white border border-blackLight rounded-full border-opacity-10 text-blackLight w-full relative',
  inputDropdownContainer___active: 'shadow-lg',
  inputElement: 'outline-none flex-grow border-none h-full pl-0.5 pr-2',
  logoContainer: 'w-7 mx-2.5 my-2',
  optionContainer: 'flex items-stretch mb-3 mx-3.5 cursor-pointer',
  resultIconContainer: 'opacity-20 w-7 h-7 pl-1 mr-4',
  searchButtonContainer: ' w-16 h-full mx-2 flex flex-row-reverse  items-center',
  submitButton: 'h-7 w-7 submit-button',
  button : 'text-blue-600 cursor-pointer hover:underline focus:underline',
  clearButton: 'h-7 w-7 clear-button',
  

  focusedOption: 'bg-gray-100',
  ...AutocompleteResultBuiltInCssClasses
}


export interface SearchBarCssClasses 
  extends InputDropdownCssClasses, DropdownSectionCssClasses, AutocompleteResultCssClasses 
{
  container?: string,
  inputDropdownContainer?: string,
  resultIconContainer?: string,
  submitButton?: string,
  clearButton?: string,
  button?: string,
  source?: string,
}

interface Props {
  placeholder?: string,
  geolocationOptions?: PositionOptions,
  customCssClasses?: SearchBarCssClasses,
  cssCompositionMethod?: CompositionMethod
}

/**
 * Renders a SearchBar that is hooked up with an InputDropdown component
 */
export default function SearchBar({
  placeholder,
  geolocationOptions,
  customCssClasses,
  cssCompositionMethod
}: Props) {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  const answersActions = useAnswersActions();
  const query = useAnswersState(state => state.query.input) ?? '';
  const clear = useAnswersState(state => query.length===0) ?? false;
 


  const isLoading = useAnswersState(state => state.searchStatus.isLoading);
  const isVertical = useAnswersState(s => s.meta.searchType) === SearchTypeEnum.Vertical;
  const [autocompleteResponse, executeAutocomplete] = useSynchronizedRequest(() => {
    return isVertical
      ? answersActions.executeVerticalAutocomplete()
      : answersActions.executeUniversalAutocomplete();
  });
  const [executeQuery, autocompletePromiseRef] = useSearchWithNearMeHandling(answersActions, geolocationOptions);

// const [deletQuery] = () => {
//   return {
//     value: query, 
//     onSelect: () => {
//       answersActions.setQuery("");
//       deletQuery();
//     },
//     }
//  }

  const options: Option[] = autocompleteResponse?.results.map(result => {
    return {
      value: result.value,
      onSelect: () => {
        autocompletePromiseRef.current = undefined;
        answersActions.setQuery(result.value);
        executeQuery();
      },
      display: renderAutocompleteResult(result, cssClasses, MagnifyingGlassIcon)
    }
   
  }) ?? [];

  const screenReaderText = processTranslation({
    phrase: `${options.length} autocomplete option found.`,
    pluralForm: `${options.length} autocomplete options found.`,
    count: options.length
  });
  
  function clearInput(){
    answersActions.setQuery('')
    answersActions.executeVerticalQuery();
}
  function renderSearchButton() {
    return <SearchButton
      className={cssClasses.submitButton}
      handleClick={executeQuery}
      isLoading={isLoading || false}
    />
  }
  function clearButton(){
    return <ClearButton
    className={cssClasses.clearButton}
    handleClick={clearInput}
    isnotclear= {clear}
  />
}


  return (
    <div className={cssClasses.container}>
      <InputDropdown
        inputValue={query}
        placeholder= {placeholder}
        screenReaderInstructions={SCREENREADER_INSTRUCTIONS}
        screenReaderText={screenReaderText}
        onSubmit={executeQuery}
        onInputChange={value => {
          answersActions.setQuery(value);
        }}
        onInputFocus={() => {
          autocompletePromiseRef.current = executeAutocomplete();
        }}
        renderLogo={() => <YextLogoIcon />}
        renderSearchButton={renderSearchButton}
       
        clear={clearButton}

        cssClasses={cssClasses}
        forceHideDropdown={options.length === 0}
      >
        {
          options.length > 0 &&
          <DropdownSection
            options={options}
            optionIdPrefix='0'
            onFocusChange={value => {
              answersActions.setQuery(value);
            }}
            cssClasses={cssClasses}
          />
        }
      </InputDropdown>
      
     
    </div>
  )
}
