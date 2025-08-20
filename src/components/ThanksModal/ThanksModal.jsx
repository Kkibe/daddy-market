import './popup.scss';

export default function ThanksModal({text, title, runFunction}) {

  return (
    <div className='popup'>
        <h2 className='sub-heading'>{title}</h2>
        <p className='heading'>{text}</p>
        <a type="button" className={"btn"} onClick={() => runFunction(true)}>OK</a>
    </div>
  )
}
