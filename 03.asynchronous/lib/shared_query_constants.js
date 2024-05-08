export const BOOKS_TABLE_CREATE_QUERY =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";
export const BOOKS_RECORD_INSERT_QUERY = "INSERT INTO books (title) VALUES (?)";
export const BOOKS_ALL_RECORDS_GET_QUERY = "SELECT * FROM books";
export const BOOKS_ALL_RECORDS_GET_INVALID_QUERY = "SELECT content FROM books";
export const BOOKS_TABLE_DROP_QUERY = "DROP TABLE books";
