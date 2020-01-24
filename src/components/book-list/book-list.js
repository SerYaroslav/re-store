/* eslint-disable no-undef */
import React, {Component} from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';

import Spinner from '../spinner';
import ErrorIndicator from "../error-indicator";

import {withBookstoreService} from '../hoc'; 
import { /* booksLoaded, booksRequested, booksError */ fetchBooks} from "../../actions";

import {compose} from '../../utils';


import './book-list.css';

const BookList = ({ books }) => {
  return (
    <ul className="book-list">
      {books.map(book => {
        return (
          <li key={book.id}>
            <BookListItem book={book} />
          </li>
        );
      })}
    </ul>
  );
};

class BookListContainer extends Component {

  componentDidMount() {
    // get data
     this.props.fetchBooks(); 
    /* const {
      bookstoreService,
      booksLoaded,
      booksRequested,
      booksError,
    } = this.props;

    booksRequested();
    bookstoreService.getBooks()
      .then((data) => booksLoaded(data))
      .catch((err) => booksError(err)); */
    /* // dispatch data to store
    this.props.booksLoaded(data); */
  }
  render() {
    const { books, loading, error } = this.props;

    if(loading){
      return <Spinner/>
    }
    if(error){
      return <ErrorIndicator/>
    }

    return <BookList books={books}/>
  };
};



const mapStateToProps = (state) => {
  return {
    books: state.books,
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;// ownProps надходить з обгортки сервіс і передає те що є в ній
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch)
    /* fetchBooks: () => {

      dispatch(booksRequested());
      bookstoreService
        .getBooks()
        .then((data) => dispatch(booksLoaded(data)))
        .catch((err) => dispatch(booksError(err)));
    } */
  };
}

/* const mapDispatchToProps = {
  booksLoaded,
  booksRequested,
  booksError,
}; */

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);


/* метод з  bindActionCreators
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    booksLoaded,
  }, dispatch)



метод без додаткових функцій 
  return{
    booksLoaded: (newBooks) => {
      dispatch(booksLoaded(newBooks));
    }
  }
}; */

//якщо передати об'єкт то бінд робить сам редакс



//compose своя функція для зручності
/* withBookstoreService()(
  connect(mapStateToProps, mapDispatchToProps)(BookList)
); */

