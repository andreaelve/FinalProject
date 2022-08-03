// TODO: Make a dynamic list
const Filter = ({setCategory, setCounter}) => {
    // Changing category of films when changing option in dropdown
    const handleChange = (e) => {
        if(e.target.value === "popular"){
        return setCategory(null);
        }
        setCategory(e.target.value);
        setCounter(0);
    }

    return (
        <div className="option">
            <select className="category_bar" name="category" id="category" onChange={(e) => handleChange(e)}>
                <option class="option_item" value="" disabled selected>Category</option>
                <option class="option_item" value="popular">Popular</option>
                <option class="option_item" value="28">Action</option>
                <option class="option_item" value="18">Drama</option>
                <option class="option_item" value="12">Adventure</option>
                <option class="option_item" value="16">Animation</option>
                <option class="option_item" value="35">Comedy</option>
                <option class="option_item" value="80">Crime</option>
                <option class="option_item" value="99">Documentry</option>
                <option class="option_item" value="10751">Family</option>
                <option class="option_item" value="14">Fantasy</option>
                <option class="option_item" value="36">History</option>
                <option class="option_item" value="27">Horror</option>
                <option class="option_item" value="9648">Mystery</option>
                <option class="option_item" value="10749">Romance</option>
                <option class="option_item" value="878">Sience-Fiction</option>
                <option class="option_item" value="53">Triller</option>
            </select >
        </div>
    )
}

export default Filter;