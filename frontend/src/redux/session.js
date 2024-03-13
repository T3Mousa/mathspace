import { csrfFetch } from './csrf';

//Constants
const SET_USER = 'session/setUser';
const ADD_TEACHER = 'session/addTeacher'
const ADD_STUDENT = 'session/addStudent'
const REMOVE_USER = 'session/removeUser';
const EDIT_USER = 'session/editUser'

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const addTeacher = (userId) => ({
    type: ADD_TEACHER,
    payload: userId
})

const addStudent = (userId) => ({
    type: ADD_STUDENT,
    payload: userId
})

const removeUser = () => ({
    type: REMOVE_USER
});

const editUser = (user) => ({
    type: EDIT_USER,
    payload: user
})



export const thunkAuthenticate = () => async (dispatch) => {
    try {
        const response = await csrfFetch("/api/restore-user");
        if (response.ok) {
            const data = await response.json();
            // console.log(data)
            dispatch(setUser(data));
        }
    } catch (e) {
        return e
    }
};

export const thunkLogin = (credentials) => async dispatch => {
    const { email, password } = credentials
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({ credential: email, password })
    });

    if (response.ok) {
        const data = await response.json();
        const currentUser = data.user
        console.log(data.user)
        dispatch(setUser(currentUser));
        return currentUser
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        console.log(errorMessages)
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

export const thunkSignup = (user) => async (dispatch) => {
    const { email, firstName, lastName, userRole, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            firstName,
            lastName,
            userRole,
            password
        })
    });

    if (response.ok) {
        const data = await response.json();
        // console.log(data.user)
        const newUser = data.user
        dispatch(setUser(newUser));
        if (newUser.userRole === "teacher") {
            dispatch(addTeacher(newUser.id))
        } else if (newUser.userRole === "student") {
            dispatch(addStudent(newUser.id))
        }
        return newUser
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        return { server: "Something went wrong. Please try again" }
    }
};

export const thunkLogout = () => async (dispatch) => {
    await csrfFetch("/api/session", {
        method: "DELETE",
    });
    dispatch(removeUser());
};


export const updateUserThunk = (userId, form) => async (dispatch) => {
    const { img_url } = form
    try {

        const formData = new FormData();

        formData.append('userId', +userId)
        formData.append("image", img_url);

        const option = {
            method: "PUT",
            headers: { 'Content-Type': 'multipart/form-data' },
            body: formData
        }



        const response = await csrfFetch(`/api/users/${+userId}/update`, option);
        if (response.ok) {
            const user = await response.json();
            dispatch(editUser(user));
            return user

        } else if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                return data
            } else {
                throw new Error('An error occured. Please try again.')
            }
        }
        return response;
    } catch (e) {
        return e
    }
}

const initialState = {
    user: null,
};

function sessionReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            return { ...state, user: null };
        case EDIT_USER:
            newState = JSON.parse(JSON.stringify(initialState));
            newState.user = action.payload
            return newState
        default:
            return state;
    }
}

export default sessionReducer;
