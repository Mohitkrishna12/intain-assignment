import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  userList: [],
  userListError: [],
  isLoadingUserList: false,
};

const MOCK_URL = "https://my.api.mockaroo.com/users.json?key=b5601520";


export const getUserList = createAsyncThunk(
  "GET_USERS_LIST",
  async () => {
    const response = await axios.get(MOCK_URL);
    return response.data;
  }
);


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUserList.pending,
      (state) => {
        state.isLoadingUserList = true;
      }
    );
    builder.addCase(
      getUserList.fulfilled,
      (
        state,
        action
      ) => {
        state.userList = action.payload;
        state.isLoadingUserList = false;
      }
    );
    builder.addCase(
      getUserList.rejected,
      (
        state,
        action
      ) => {
        state.userListError = action;
        state.isLoadingUserList = false;
      }
    );
  },
});

export default userSlice.reducer;
