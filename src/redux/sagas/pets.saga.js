import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addPet(action) {
    console.log('got to pet saga')

    //POST
    yield axios.post('/api/pets', action.payload )
}

function* petSaga() {
    yield takeLatest('ADD_PET', addPet)
}

export default petSaga;