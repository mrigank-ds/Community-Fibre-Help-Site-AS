import { useAnswersState, useAnswersActions } from '@yext/answers-headless-react';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import { ReactComponent as PageNavigationIcon } from '../icons/chevron.svg';


interface PaginationCssClasses {
  container?: string,
  labelContainer?: string,
  label?: string,
  selectedLabel?: string,
  leftIconContainer?: string,
  rightIconContainer?: string,
  icon?: string
}

const builtInPaginationCssClasses: PaginationCssClasses = {
  container: 'flex justify-center mb-4',
  labelContainer: 'inline-flex shadow-sm -space-x-px',
  label: 'z-0 inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 text-gray-500',
  selectedLabel: 'z-10 inline-flex items-center px-4 py-2 text-sm font-semibold border border-blue-600 text-blue-600 bg-blue-50 active-pagination-button',
  leftIconContainer: 'inline-flex items-center px-3.5 py-2 border border-gray-300 rounded-l-md',
  rightIconContainer: 'inline-flex items-center px-3.5 py-2 border border-gray-300 rounded-r-md',
  icon: 'w-3 text-gray-500'
}

interface PaginationProps {
  numResults: any,
  customCssClasses?: PaginationCssClasses,
  cssCompositionMethod?: CompositionMethod
}



function generatePaginationLabels(pageNumber: number, maxPageCount: number): string[] {
  const paginationLabels: string[] = [];
  const previousPageNumber = pageNumber - 1;
  const nextPageNumber = pageNumber + 1;

  if (previousPageNumber > 3) {
    paginationLabels.push('1', '...', `${previousPageNumber}`);
  } else if (previousPageNumber !== 0) {
    [...Array(previousPageNumber)].forEach((_, index) => paginationLabels.push(`${index + 1}`));
  }
  paginationLabels.push(`${pageNumber}`);
  if (maxPageCount - nextPageNumber > 2) {
    paginationLabels.push(`${nextPageNumber}`, '...', `${maxPageCount}`);
  } else if (nextPageNumber <= maxPageCount) {
    [...Array(maxPageCount - nextPageNumber + 1)]
      .forEach((_, index) => paginationLabels.push(`${nextPageNumber + index}`));
  }
  return paginationLabels;
}




export default function NewPagination(props: PaginationProps): JSX.Element | null  {

    const { numResults } = props;
    const cssClasses = useComposedCssClasses(builtInPaginationCssClasses);
    const answersAction = useAnswersActions();
    const offset = useAnswersState(state => state.vertical.offset) || 0;
    const limit = useAnswersState(state => state.vertical.limit) || 10;
  
    const executeSearchWithNewOffset = (newOffset: number) => {
      answersAction.setOffset(newOffset);
      answersAction.executeVerticalQuery();
    }
    const onSelectNewPage = (evt: React.MouseEvent) => {
      const newPageNumber = Number(evt.currentTarget.textContent);
      newPageNumber && executeSearchWithNewOffset(limit * (newPageNumber - 1));
    }
  
    const maxPageCount = Math.ceil(numResults / limit);
    if (maxPageCount <= 1) {
        return null;
    }
    const pageNumber = (offset / limit) + 1;
    const paginationLabels: string[] = generatePaginationLabels(pageNumber, maxPageCount);
  
    return (
      <div className={cssClasses.container}>
        <nav className={cssClasses.labelContainer} aria-label="Pagination">
            {pageNumber===1 ? null : <button
            aria-label='Navigate to the previous results page'
            className={cssClasses.leftIconContainer}
            onClick={() => executeSearchWithNewOffset(offset - limit)} disabled={pageNumber === 1}
          >
            <PageNavigationIcon className={cssClasses.icon + ' transform -rotate-90'} />
          </button>}
          
          {paginationLabels.map((label, index) => {
            switch (label) {
              case '...':
                return <button key={index} className={cssClasses.label}>{label}</button>
              case `${pageNumber}`:
                return <button key={index} className={cssClasses.selectedLabel} onClick={onSelectNewPage}>{label}</button>
              default:
                return <button key={index} className={cssClasses.label} onClick={onSelectNewPage}>{label}</button>
            }
          })}
          {pageNumber === maxPageCount ? null : <button
            aria-label='Navigate to the next results page'
            className={cssClasses.rightIconContainer}
            onClick={() => executeSearchWithNewOffset(offset + limit)} disabled={pageNumber === maxPageCount}
          >
            <PageNavigationIcon className={cssClasses.icon + ' transform rotate-90'} />
          </button>}
          
        </nav>
      </div>
    );
  }