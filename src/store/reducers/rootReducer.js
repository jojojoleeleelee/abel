import authReducer from './authReducer';
import memberReducer from './memberReducer';
import titheReducer from './titheReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  tithe: titheReducer,
  member: memberReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;