import React, { useEffect, useState } from 'react';
import '../styles/pages/PersonalPage.css';
import BookCard from '../components/BookCard';
import { useNavigate } from 'react-router-dom';

const PersonalPage = () => {

  const [myBooks, setMyBooks] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  
  useEffect(()=>{
    let myBooksFromShelf = localStorage.getItem('my-books');
    let parseIt = JSON.parse(myBooksFromShelf);
    if(parseIt){
      setMyBooks(parseIt);
    }
    setError("No Books Available or Refresh the window");
  },[]);

  return (
    <div className='personal-container'>

      <section className='header-my'>
        <button className='go-back' onClick={()=>navigate("/",{replace:true})}>GO back</button>
        <label className='my-label'> My BookShelf</label>
      </section>

      <section className='my-books-wrapper'>
        { myBooks.length > 0 && myBooks.map((item,index)=><div key={index} className='bookcard-wrapper-2'><BookCard book={item} addBtn={false}/></div>) }
      </section>
    </div>
  )
}

export default PersonalPage;
