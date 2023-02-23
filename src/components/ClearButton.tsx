import cross from '../icons/cross.svg'

interface Props {
    handleClick: () => void,
    isnotclear: boolean,
    className?: string
  }
 
export default function ClearButton ({ handleClick, isnotclear, className }: Props){
return(
    <>
    
    <button
      className={className}
      onClick={handleClick}
      aria-label='clear Search'
      
    >
            {isnotclear
        ? ''
        : <img src={cross}  alt="Cross"/>}
    </button>

    </>
   
)
}