export const createTithe = (tithe) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('tithes').add({
      ...tithe,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_TITHE', tithe });
    }).catch((err) => {
      dispatch({ type: 'CREATE_TITHE_ERROR', err})
    });
  }
};

export const searchTithes = (category, search) => {
  console.log(category, search)
  const categ = category;
  const query = search;
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    return firestore.collection('tithes').where(categ, '==', query).orderBy(categ) 
  }
};