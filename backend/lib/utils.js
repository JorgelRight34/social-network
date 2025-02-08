export const getPagination = (page, size) => {
    const limit = size ? +size : 10; // Default to 10 records per page
    const offset = page ? (page - 1) * limit : 0;
    return { limit, offset };
};