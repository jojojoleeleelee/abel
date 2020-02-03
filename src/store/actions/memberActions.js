
import { storage } from '../../config/fbConfig';

import isEmpty from 'lodash/isEmpty';

export const createMember = (member) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const photoUrl = !isEmpty(member.photoUrl) ? member.photoUrl : 'none'
    const birthDate = new Date(Date.parse(member.birthDate))
    firestore.collection('members').add({
      ...member,
      birthDate,
      photoUrl,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_MEMBER_SUCCESS', member });
    }).catch((err) => {
      dispatch({ type: 'CREATE_MEMBER_ERROR', err})
    });
  }
};

export const addPhoto = (image) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        dispatch({ type: 'PHOTO_PROGRESS_COMPLETE', progress})
      }, 
      (err) => {
        dispatch({ type: 'ADD_PHOTO_ERROR', err})
      }, () => {
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
          firestore.collection('photos').add({
            url,
            createdAt: new Date()
          }).then(() => {
            dispatch({ type: 'ADD_PHOTO_SUCCESS', url });
          }).catch((err) => {
            dispatch({ type: 'ADD_PHOTO_ERROR', err})
          });
        });
      });
  }

};
