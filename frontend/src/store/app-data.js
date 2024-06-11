import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
import { groupList } from "../const";
import { courses } from "../components/sections/middle";

export const SliceNames = {
  AppData: 'AppData'
};

export const loginAction = createAsyncThunk(
  'login',
  async ({ login, password }) => {
    const user = {
      login: login,
      password: password,
      role: 'teacher'
    }
    localStorage.setItem('user', JSON.stringify(user))
    return user;
  }
);

export const checkAuthAction = createAsyncThunk(
  'checkAuth',
  async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }
)

export const setLoadingState = createAsyncThunk(
  'setIsLoadind',
  async (state) => {
    return state;
  }
)

export const logoutAction = createAsyncThunk(
  'logoutAction',
  async () => {
    localStorage.removeItem('user');
    return null;
  }
)

export const getTeachers = createAsyncThunk(
  'getTeachers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get('/teachers');
    return data.data;
  }
)

export const sendTeacher = createAsyncThunk(
  'sendTeacher',
  async ({ teacher }, { extra: api }) => {
    const adapted = adaptTeacherToServer(teacher);
    const { data } = await api.post('/teachers', adaptTeacherToServer(teacher));
  }
)

const adaptTeacherToServer = (teacher) => {
  return {
    teacher_id: Number(teacher.teacher_id),
    age: Number(teacher.age),
    fio: teacher.fio,
    courses: teacher.courses
  }
}

const initialState = {
  groups: groupList,
  courses: courses,
  teachers: null,
  loading: false,
  user: null
};

const AppData = createSlice({
  name: SliceNames.AppData,
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;

      })
      .addCase(loginAction.rejected, (state) => {
        state.loading = false;
        state.user = null
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(setLoadingState.fulfilled, (state, action) => {
        state.loading = action.payload;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.user = null;
      })
      .addCase(getTeachers.fulfilled, (state, action) => {
        state.teachers = action.payload;
      })
  },
})

export default AppData.reducer;
