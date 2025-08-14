const { initializeDatabase } = require('./db/db.connect')
const Books = require('./models/books.model')

const express = require('express')
const app = express()
app.use(express.json())

initializeDatabase()


const createBooks = async (newBook) => {
    try {
        const books = new Books(newBook)
        const saveBook = await books.save()
        return saveBook

    } catch (error) {
        throw error
    }
}

app.post('/books', async (req, res) => {
    try {
        const savedBook = await createBooks(req.body)
        res.status(201).json({message: "Book added successfully.", book: savedBook}) 

    } catch (error) {
        res.status(500).json({error: error.message })
    }
})



const getAllBooks = async () => {
    try {
        const allBooks = await Books.find()
        return allBooks

    } catch (error) {
        throw error
    }
}

app.get('/books', async (req, res) => {
    try {
        const books = await getAllBooks()
        books.length != 0 ? res.json(books) : res.status(404).json({error: 'Books Not Found.'})

    } catch (error) {
        res.status(500).json({error: "Failed to fetch books."})
    }
})



const getBookByTitle = async (bookTitle) => {
    try {
        const bookByTitle = await Books.find({title: bookTitle})
        return bookByTitle        

    } catch (error) {
        throw error
    }
}

app.get('/books/:title', async (req, res) => {
    try {
        const books = await getBookByTitle(req.params.title)
        books.length != 0 ? res.json(books) : res.status(404).json({error: 'Book not found.'})

    } catch (error) {
        res.status(500).json({error: 'Failed to get books by title.'. error.message})
    }
})



const getBookByAuthor = async (bookAuthor) => {
    try {
        const bookByAuthor = await Books.find({author: bookAuthor})
        return bookByAuthor

    } catch (error) {
        throw error
    }
}

app.get('/books/authorName/:author', async (req, res) => {
    try {
        const books = await getBookByAuthor(req.params.author)
        books.length != 0 ? res.json(books) : res.status(404).json({error: 'Book not found.'})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})



const getBooksByGenre = async (bookGenre) => {
    try {
        const books = await Books.find({genre: bookGenre})
        return books

    } catch (error) {
        throw error
    }
}

app.get('/books/genre/:genreType', async (req, res) => {
    try {
        const booksByGenre = await getBooksByGenre(req.params.genreType)
        booksByGenre.length != 0 ? res.json(booksByGenre) : res.status(404).json({error: 'Book not found.'})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})



const getBookByReleaseYear = async (year) => {
    try {
        const booksByYear = await Books.find({publishedYear: year})
        return booksByYear

    } catch (error) {
        throw error
    }
}

app.get('/books/year/:publishedYear', async (req, res) => {
    try {
        const books = await getBookByReleaseYear(req.params.publishedYear)
        books.length != 0 ? res.json(books) : res.status(404).json({error: 'Book not found.'})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})



const updateRating = async (bookId, dataToUpdate) => {
    try {
        const ratingToUpdate = await Books.findByIdAndUpdate(bookId, dataToUpdate, {new: true})
        return ratingToUpdate

    } catch (error) {
        throw error
    }
}

app.post('/books/rating/:bookId', async (req, res) => {
    try {
        const updatedRating = await updateRating(req.params.bookId, req.body)
        updatedRating ? res.status(200).json({message: "Book rating updated successfully.", updatedBook: updateRating}) : res.status(404).json({message: "Unable to update rating."})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})



const updateBookData = async (bookTitle, dataToUpdate) => {
    try {
        const bookToUpdate = await Books.findOneAndUpdate({title: bookTitle}, dataToUpdate, {new: true})
        return bookToUpdate

    } catch (error) {
        throw error
    }
}

app.post('/books/updatedBook/:title', async (req, res) => {
    try {
        const updatedBook = await updateBookData(req.params.title, req.body)
        updatedBook ? res.json('This book data is updated : ', updatedBook) : res.status(404).json({error: 'Book not found'})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})



const deleteBookById = async (bookId) => {
    try {
        const bookToDelete = await Books.findByIdAndDelete(bookId)
        return bookToDelete

    } catch (error) {
        throw error
    }
}

app.delete('/books/deleteBook/:bookId', async (req, res) => {
    try {
        const deletedBook = await deleteBookById(req.params.bookId)
        deletedBook ? res.status(200).json({message: "Book deleted successfully."}) : res.status(404).json({error: "Book not found"})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})




const PORT=3000
app.listen(PORT, () => {
    console.log('Server connected to port ', PORT)
})