import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/pages/HomePage.css';
import BookCard from '../components/BookCard';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const [loading,setLoading] = useState(false);
    const [userInput,setUserInput] = useState("");
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(()=>{
        const time = setTimeout(()=>setError(null),1000);
        return() => clearTimeout(time);
    },[error])

    const handleFetchBooks = async() =>{
        setLoading(true);
        const check_input = userInput.length;

        if(check_input > 5){
            try {
                const response = await axios.get(`https://openlibrary.org/search.json?q=${userInput}&limit=10&page=1`);
                if(response.data.docs.length > 0){
                    setLoading(false);
                    setBooks(response.data.docs);
                    console.log(response);
                    return;
                }
                setError('No results found');
                setLoading(false);
                return;
            } catch (error) {
                setLoading(false);
                setError('Some error arrived');
                return;
            }
        }else{
            setError('Atleast 6 characters');
            setLoading(false);
            return;
        }
    }

  return (
    <div className='home-container'>
        <section className="header">
            <button className='my-btn' onClick={()=>navigate("/my-shelf")}>My Bookshelf</button>
        </section>

        <section className="user-input">
            <label className='search-label'>Search Book by name</label>
            <div className='search-field'>
                <input type="text" placeholder='Search book' 
                    onChange={(e)=>{setUserInput(e.target.value)}}
                    value={userInput}
                    className='search-input'
                />
                <button onClick={handleFetchBooks} className='search-btn'>search</button>
            </div>
        </section>

        <section className="books-display">
            {loading ? 
                <div className='load'>Loading...</div> : 
                books.length > 0 && 
                    books.map((item, index) => (
                        <div key={index} className='bookcard-wrapper'>
                            <BookCard book={item} addBtn={true} />
                        </div>
                    ))
            }

            {error && <div className='load'>{error}</div>}
        </section>
    </div>
  )
}

export default HomePage
