import React, {Component} from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';


import {withBookstoreService} from '../hoc';
import {booksLoaded} from '../../actions';

import {compose} from '../../utils';


import './book-list.css';

class BookList extends Component {

  componentDidMount() {
    // get data
    const {bookstoreService} = this.props;
    const data = bookstoreService.getBooks();
    
    // dispatch data to store
    this.props.booksLoaded(data);
  }
  render() {
    const { books } = this.props;
    return (
      <ul className='book-list'>
        {
          books.map((book)=>{
            return (
              <li key={book.id}>
                <BookListItem book={book} />
              </li>
            );
          })
        }
      </ul>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

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

const mapDispatchToProps = {
  booksLoaded
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);


//compose своя функція для зручності
/* withBookstoreService()(
  connect(mapStateToProps, mapDispatchToProps)(BookList)
); */