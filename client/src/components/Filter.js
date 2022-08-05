const Filter = ({setCategory, setCounter}) => {
    const handleChange = (e) => {
        if(e.target.value === "popular"){
        return setCategory(null);
        }
        setCategory(e.target.value);
        setCounter(0);
    }

    // TODO: Make a dynamic list
    return (
        <div className="option">
            <select className="category_bar" name="category" defaultValue="" id="category" onChange={(e) => handleChange(e)}>
                <option className="option_item" value="" disabled >Category</option>
                <option className="option_item" value="popular">Popular</option>
                <option className="option_item" value="28">Action</option>
                <option className="option_item" value="18">Drama</option>
                <option className="option_item" value="12">Adventure</option>
                <option className="option_item" value="16">Animation</option>
                <option className="option_item" value="35">Comedy</option>
                <option className="option_item" value="80">Crime</option>
                <option className="option_item" value="99">Documentry</option>
                <option className="option_item" value="10751">Family</option>
                <option className="option_item" value="14">Fantasy</option>
                <option className="option_item" value="36">History</option>
                <option className="option_item" value="27">Horror</option>
                <option className="option_item" value="9648">Mystery</option>
                <option className="option_item" value="10749">Romance</option>
                <option className="option_item" value="878">Sience-Fiction</option>
                <option className="option_item" value="53">Triller</option>
            </select >
        </div>
    )
}

export default Filter;