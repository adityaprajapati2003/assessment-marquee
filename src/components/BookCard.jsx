import React from 'react';
import '../styles/components/BookCard.css';

const BookCard = ({book, addBtn}) => {

    const handleAddToBookshelf = async () => {
        let getdata = localStorage.getItem('my-books');

        if(getdata){
            try{
                getdata = JSON.parse(getdata);
                if(Array.isArray(getdata)){
                    getdata.push(book);
                    localStorage.setItem('my-books', JSON.stringify(getdata));
                    alert('Books are added to your shelf');
                    return;
                }
                getdata = [getdata, book]; // If it's not an array, make it an array with the old and new book
                localStorage.setItem('my-books', JSON.stringify(getdata));
                alert('Books are added to your shelf');
                return;
            }catch(e){
                alert('Not able to add');
                console.log(e);
                return;
            }
        }

        // Initialize the books array with the first book
        localStorage.setItem('my-books', JSON.stringify(book));
        alert('Books are added to your shelf');
    }

    return (
        <div className='book-wrapper'>
            <section>
                <h1 className='text'>Book title: {book.title}</h1>
                <h1 className='text'>Edition Count: {book.edition_count}</h1>
            </section>
            <section>
                { addBtn ? <button className='add-btn' onClick={handleAddToBookshelf}>Add to Bookshelf</button>: ""}
            </section>
        </div>
    );
}

export default BookCard;
