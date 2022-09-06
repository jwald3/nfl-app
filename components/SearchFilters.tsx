import sorts from "../data/sorts.json";
import styles from "../styles/SearchFilters.module.css";

interface SearchProps {
    setSortMethod: Function;
    setSearchInput: Function;
}

const SearchFilters = (props: SearchProps) => {
    const { setSortMethod, setSearchInput } = props;

    const handleSelect = (value: string) => {
        setSortMethod(value);
    };

    const handleSearchInput = (value: string) => {
        setSearchInput(value);
    };

    return (
        <div className={styles.searchFiltersContainter}>
            <input
                className={styles.searchBar}
                type="text"
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
