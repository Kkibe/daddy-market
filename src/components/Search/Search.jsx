import { FaSearch } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import './Search.scss';
import { searchState } from '../../recoil/atoms';
import { FaXmark } from 'react-icons/fa6';

export default function Search() {
  const [searchQuery, setSearchQuery] = useRecoilState(searchState);

  const handleCloseSearch = () => {
    document.querySelector('.search-form').classList.toggle('active');
    setSearchQuery(''); // Clear search when closing
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form action='' className='search-form' onSubmit={(e) => e.preventDefault()}>
      <input
        type="search"
        placeholder='search here...'
        id="search-box"
        autoFocus
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <label htmlFor="search-box"><FaSearch /></label>
      <span id="close" onClick={handleCloseSearch}><FaXmark /></span>
    </form>
  );
}