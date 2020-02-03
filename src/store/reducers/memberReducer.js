const initState = {
  members: [],
  memberErrors: [],
  photos: [],
  photoErrors: [],
  progress: 0
}

const titheReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_MEMBER_SUCCESS":
      state.members.push(action.member)
      return {
        ...state
      }
    case "CREATE_MEMBER_ERROR":
    state.memberErrors.push(action.err)
      return {
        ...state
      }
    case 'ADD_PHOTO_SUCCESS': {
      state.photos.push(action.url)
        return {
          ...state
        }
    }
    case 'PHOTO_PROGRESS_COMPLETE': {
      state.progress = action.progress;
        return {
          ...state
        }
    }
    case 'ADD_PHOTO_ERROR': {
      state.photoErrors.push(action.err)
        return {
          ...state
        }
    }
    default:
      return state;
  }
};

export default titheReducer;

