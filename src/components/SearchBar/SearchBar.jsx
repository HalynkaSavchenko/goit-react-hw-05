import {useRef} from 'react'
import toast, {Toaster} from 'react-hot-toast';
import css from './SearchBar.module.css';

export default function SearchBar({onSearch}) {
    const formRef = useRef(null)
   function handleSubmit(event) {
    const notifyEmptyField = () => toast ('Будь ласка, введіть назву фільму для пошуку.', {
        duration: 4000, 
        position: 'top-right',
        style: {
            borderRadius: '12px',
            background: '#3339',
            color: '#fff',
        },
        icon: '👏'
    });

    event.preventDefault();
    const searchQuery = event.target.elements.search.value.trim();
        if (searchQuery !=='') {
            onSearch(searchQuery)
        }
       else {
        notifyEmptyField()
       }
       formRef.current.reset()
   }

   return (
    <form className={css.form} ref={formRef} onSubmit={handleSubmit}>
        <input className={css.input} type='text' autoComplete='off' autoFocus name='search' placeholder='Пошук фільмів'/>
        <button className={css.btn} type='submit'>Пошук</button>
        <Toaster/>
    </form>
   )
}
