import {useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';

function UserPage() {

  const dispatch = useDispatch();
  const [petName, setPetName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(petName)

    dispatch({
      type : 'ADD_PET',
      payload: {
        name : petName
      }
    })
  }

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor='petName'>Pet Name
          <input onChange={e => setPetName(e.target.value)} id='petName' placeholder='Add Your Pet!' />
        </label>

        <button type='submit'>Add Pet</button>
      </form>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;