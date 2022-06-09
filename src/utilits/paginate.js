export function paginate(items, currentPage, pageSize) {
    const lastIndex = currentPage * pageSize;
    const firstIndex = lastIndex - pageSize;
    return items.slice(firstIndex, lastIndex);

}