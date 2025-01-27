interface ObjectPagination {
    currentPage: number, 
    limitItem: number, 
    totalPage: number, 
    skip: number
}
const paginationHelper = (
        objectPagination: ObjectPagination, 
        query: Record<string, any>, 
        countRecords: number
    ) => {

    if(query.page) {
        objectPagination.currentPage = 
            isNaN(parseInt(query.page)) ? 1 : parseInt(query.page);
    }
    if(query.limit) {
        objectPagination.limitItem = 
            isNaN(parseInt(query.limit)) ? 4 : parseInt(query.limit);
    }
    const totalPage = Math.ceil(countRecords/objectPagination.limitItem);
    objectPagination.totalPage = totalPage;
    
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    return objectPagination;
}

export default paginationHelper;