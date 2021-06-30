import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import BoardList from './components/BoardList';

function App() {

  const [boardsData, setBoardsData] = useState([])
  const [selectedBoard, setSelectedBoard] = useState({
    'id': null,
    'title': '',
    'owner': ''
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/boards`, {
    }).then((response) => {
      setBoardsData(response.data);
    })
  }, []);
  console.log(selectedBoard)
  //selectedBoard is an array

  const [cardsData, setCardsData] = useState([])

  useEffect(() => {
    if (selectedBoard?.id) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/boards/${selectedBoard.id}/cards`).then((response) => {
        setCardsData(response.data);
        console.log('Response is:',response.data)
      })
    }
  }, [selectedBoard]);

  return (
    <div>
      <h1> Inspiration Board </h1>
      <main>
      <section className='new-board-form__container'>
        <h2>Create a New Board</h2>
        {/* < NewBoardForm 
          addBoardCallBack={ newBoardData }
        /> */}
      </section>
      <section className='boards__container'>

        <h2>Choose A Board</h2> 
        < BoardList 
        boardsData= { boardsData }
        selectedBoard={setSelectedBoard}
        />
      </section>
      <section> 
      
        {/* < CardList /> */}
      </section>
      </main>
    </div>
    
  );
}

export default App;
