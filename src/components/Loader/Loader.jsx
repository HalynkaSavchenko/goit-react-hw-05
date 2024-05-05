import { Audio } from 'react-loader-spinner';
import css from './Loader.module.css'
 
export default function loader() {
    return (
        <div className={css.loader}>
            <Audio
                height="100"
                width="100"
                color="#8b80a2cd"
                ariaLabel="audio-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
  />
        </div>
    )
}