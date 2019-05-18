'use strict';

/**
 * Books available in the inventory
 * List of books available in the inventory
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/

// DB configuration
var knex = require('../knex/knex');

exports.booksGET = function (offset, limit) {
    return knex('books')
        .join('authors', 'authors.id', '=', 'books.author_id')
        .select()
        .offset(offset)
        .limit(limit)
        .orderBy('title', 'asc')
        .then((book) => {
            return book.map(e => {
                return formatBook(e);
            });
        })
        .catch((err) => console.log(err));
};


/**
 * Find book by ID
 * Returns a book
 *
 * bookId Long ID of book to return
 * returns Book
 **/
exports.getBookById = function(bookId) {
    return knex('books')
        .join('authors', 'authors.id', '=', 'books.author_id')
        .first()
        .where('books.id', bookId)
        .then((book) => {
            return formatBook(book);
        })
        .catch((err) => console.log(err));
};

function formatBook(book){
    book.author = { name: book.name, picture: book.picture, bio: book.bio };
    delete book.author_id;
    delete book.name;
    delete book.picture;
    delete book.bio;

    book.price = { value: book.value, currency: book.currency };
    delete book.currency;
    delete book.value;
    delete book.created_at;
    delete book.updated_at;

    return book;
}