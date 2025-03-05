import { useState } from 'react';
import '../App.css';
 
 
function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');
 
  const handleSearch = (event) => {
    setSearchText(event.target.value);
    onSearch(searchText);
  };
 
  return (
    <form>
      <label htmlFor="search"></label>
      <input
        class="rounded-input "
        className="search-input"
        type="text"
        placeholder="recherche un produit, un commerce"
        value={searchText}
        onChange={handleSearch}
      />
    </form>
  );
}
 
export default SearchBar;