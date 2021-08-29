import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_MOVIE', fetchMovie);
    yield takeEvery('FETCH_ALL_GENRES', fetchAllGenres);
    yield takeEvery('ADD_MOVIE', addMovie)
}

function* addMovie(action) {
    try {
        // console.log('object to be sent to db: ', action.payload)
        yield axios.post('/api/movie', action.payload)
        // update the movie list
    } catch (erro) {
        console.log('Failed to POST movie: ', error);
        alert('Failed to POST movie. See console for details.');
    }
}

function* fetchMovie(action) {
    try {
        const genres = yield axios.get(`/api/genre/${action.payload.id}`)
        yield put({
            type: 'SET_GENRES',
            payload: genres.data
        })
    } catch (error) {
        console.log('GET of movie failed: ', error);
        alert('Failed to GET specific movie genres. See console for details.')
    }

}

function* fetchAllGenres() {
    try {
        const response = yield axios.get('/api/genre');
        yield put({
            type: 'SET_ALL_GENRES',
            payload: response.data
        })
    } catch (error) {
        console.log('Failed to fetch allGenres: ', error);
        alert('Failed to get all genres.');
    }
};

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

const allGenres = (state = [], action) => {
    switch(action.type) {
        case 'SET_ALL_GENRES':
            return action.payload
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        allGenres
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
