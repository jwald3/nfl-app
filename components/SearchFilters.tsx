import sorts from "../data/sorts.json";
import styles from "../styles/SearchFilters.module.css";

interface SearchProps {
    setSort: Function;
    setSearchInput: Function;
}

const SearchFilters: React.FC<{ props: SearchProps }> = ({ props }) => {
    const handleSelect = (value: string) => {
        props.setSort(value);
    };

    const handleSearchInput = (value: string) => {
        props.setSearchInput(value);
    };

    return (
        <div className={styles.searchFiltersContainter}>
            <input
                className={styles.searchBar}
                type="text"
                placeholder="Search a player by name"
                onChange={(e) => handleSearchInput(e.target.value)}
            />
            <select
                className="searchBox"
                onChange={(e) => handleSelect(e.target.value)}
            >
                {sorts.map((sortMethod) => (
                    <option key={sortMethod._id} value={sortMethod.value}>
                        {sortMethod.string_label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SearchFilters;
