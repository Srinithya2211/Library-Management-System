function formatBook(book) {
    return {
        id: book.id,
        name: book.name,
        author: book.author,
        price: book.price
    };
}

module.exports = {
    formatBook
};