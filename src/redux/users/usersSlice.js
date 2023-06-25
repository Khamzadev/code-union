import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersService from "../services/userServices";

const saveUsersToLocalStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

const getUsersFromLocalStorage = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const getUsers = createAsyncThunk("GET_USERS", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const users = state.users.users;
    if (users.length > 0) {
      return users;
    }
    return usersService.getUsers();
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: getUsersFromLocalStorage(),
    isError: false,
    isLoading: false,
    message: "",
    searchResults: [],
  },
  reducers: {
    createUser: (state, action) => {
      state.users.unshift(action.payload);
      saveUsersToLocalStorage(state.users);
    },
    deleteLocalUser: (state, action) => {
      const userEmail = action.payload;
      state.users = state.users.filter((user) => user.email !== userEmail);
      saveUsersToLocalStorage(state.users);
    },
    updateUser: (state, action) => {
      const { name, email, permissions, image } = action.payload;
      const user = state.users.find((user) => user.email === email);
      if (user) {
        user.name = name;
        user.email = email;
        user.permissions = permissions;
        user.image = image;
        saveUsersToLocalStorage(state.users);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      saveUsersToLocalStorage(state.users);
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload ? action.payload.message : "Error occurred";
      state.users = null;
    });
  },
});

export const { deleteLocalUser, createUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
