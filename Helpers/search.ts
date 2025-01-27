interface ObjectSearch {
    keyword: string,
    regex?: RegExp
}
const searchHelper = (query: Record<string, any>): ObjectSearch => {
    let objectSearch: ObjectSearch = {
        keyword: "",
    }

    if (query.keyword) {
        objectSearch.keyword = query.keyword;
        const regex = new RegExp(objectSearch.keyword, "i"); 
        //find products with keyword, i: doesn't distinguish upper, lower case
        objectSearch.regex = regex;
    } 
    return objectSearch;
}
export default searchHelper;