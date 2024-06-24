import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dropToken, saveToken } from "../utils";

export const SliceNames = {
  AppData: 'AppData'
};

export const loginAction = createAsyncThunk(
  'app/login',
  async ({ username, password, role }, { extra: api }) => {
    console.log(username, password, role);
    if (username === 'admin') {
      const { data } = await api.post('/login/admin', { 'username': username, 'password': password });
      saveToken(data.token);
      return data;
    }

    if (role === 'teacher') {
      const { data } = await api.post('/login/teacher', { 'username': username, 'password': password, 'role': role });
      saveToken(data.token);
      return data;
    }

    if (role === 'student') {
      const { data } = await api.post('/login/student', { 'username': username, 'password': password, 'role': role });
      saveToken(data.token);
      return data;
    }
  }
);

export const checkAuthAction = createAsyncThunk(
  'app/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get('/login/check');
    saveToken(data.token);
    return data;
  }
);

export const setLoadingState = createAsyncThunk(
  'app/setIsLoadind',
  async (state) => {
    return state;
  }
);

export const logoutAction = createAsyncThunk(
  'app/logoutAction',
  async () => {
    dropToken();
    return;
  }
);

export const getTeachers = createAsyncThunk(
  'app/getTeachers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get('/teachers/getTeachers');
    return data;
  }
)

export const sendTeacher = createAsyncThunk(
  'app/sendTeacher',
  async ({ teacher }, { extra: api }) => {
    const { data } = await api.post('/teachers/uploadTeacher', teacher);
    return data;
  }
);

export const getStudents = createAsyncThunk(
  'app/getStudents',
  async (_arg, { extra: api }) => {
    const { data } = await api.get('/students/getStudents');
    return data;
  }
);

export const sendStudent = createAsyncThunk(
  'app/sendTeacher',
  async ({ student }, { extra: api }) => {
    const { data } = await api.post('/students/uploadStudent', student);
    getStudents();
    return data;
  }
);

export const registryAction = createAsyncThunk(
  'app/registry',
  async ({ username, password, role }, { extra: api }) => {
    const { data } = await api.post('/auth/register', { username, password, role });
  }
)

export const fetchLessons = createAsyncThunk(
  'app/fetchMaterialById',
  async (lessonsData, { extra: api }) => {
    const data = lessonsData;
    return data;
  }
)

export const fetchTasks = createAsyncThunk(
  'app/fetchTasks',
  async (_arg, { extra: api }) => {
    const data = mockTasks;
    return data;
  }
)

export const fetchTaskById = createAsyncThunk(
  'app/fetchTaskById',
  async (taskID, { extra: api }) => {
    const { data } = await api.get(`/tasks/getTaskByID/${taskID}`)
    return data;
  }
);

export const setSelectedTopic = createAsyncThunk(
  'app/setSelectedTopic',
  async (data, { extra: api }) => {
    return data;
  }
);

export const fetchAllLessons = createAsyncThunk(
  'app/fetchAllLessons',
  async (_arg, { extra: api }) => {
    const { data } = await api.get('/lessons/getLessons');
    return data;
  }
)

export const fetchAllTopics = createAsyncThunk(
  'app/fetchAllTopics',
  async (_arg, { extra: api }) => {
    const { data } = await api.get('/topics/getTopics');
    return data;
  }
)

export const fetchAllTasks = createAsyncThunk(
  'app/fetchAllTasks',
  async (_arg, { extra: api }) => {
    const { data } = await api.get('/tasks/getTasks');
    return data;
  }
)

export const fetchLessonById = createAsyncThunk(
  'app/fetchLessonById',
  async (lessonID, { extra: api }) => {
    const { data } = await api.get(`/lessons/getLessonByID/${lessonID}`);
    return data;
  }
)

export const markWork = createAsyncThunk(
  'markWork',
  async ({ id, task }, { extra: api }) => {
    const { data } = await api.put(`/studentTasks/updateTasksStudent/${id}`, task);
    return data;
  }
)

export const sendToWork = createAsyncThunk(
  'setTaskStatus',
  async (task, { extra: api }) => {
    const { data } = await api.post(`/studentTasks/uploadStudentTasks`, task);
    return data;
  }
);

export const getStudenTasks = createAsyncThunk(
  'getTaskStatus',
  async (_arg, { extra: api }) => {
    const { data } = await api.get('/studentTasks/getStudentTasks');
    return data;
  }
)

export const setSelectedStudent = createAsyncThunk(
  'setSelectedStudent',
  async (student, { extga: api }) => {
    return student;
  }
)

export const deleteStudent = createAsyncThunk(
  'deleteStudent',
  async (id, { extra: api }) => {
    const { data } = await api.delete(`/students/deleteStudent/${id}`);
    getStudents();
    return data;
  }
);

const studentInitialState = {
  topics: null,
  lessons: null,
  tasks: null,
  selectedTask: null,
  selectedTopic: null,
  teachers: null,
  loading: false,
  user: null,
  students: null,
  selectedLesson: null,
  studentTasks: null,
  selectedStudent: null
};

const AppData = createSlice({
  name: SliceNames.AppData,
  initialState: studentInitialState,
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
      .addCase(checkAuthAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.loading = false;
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
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.lessons = action.payload;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(fetchTaskById.pending, (state, action) => {
        state.loading = false;
        state.selectedTask = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTask = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.selectedTask = action.payload;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchAllLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons = action.payload;
      })
      .addCase(fetchAllTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(setSelectedTopic.fulfilled, (state, action) => {
        state.selectedTopic = action.payload;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(fetchLessonById.pending, (state) => {
        // state.loading = true;
        state.selectedLesson = null;
      })
      .addCase(fetchLessonById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedLesson = action.payload;
      })
      .addCase(fetchLessonById.rejected, (state) => {
        // state.loading = false;
        // state.selectedLesson = null;
      })
      .addCase(getStudenTasks.fulfilled, (state, action) => {
        state.studentTasks = action.payload;
      })
      .addCase(setSelectedStudent.fulfilled, (state, action) => {
        state.selectedStudent = action.payload;
      })
      .addCase(sendToWork.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendToWork.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendToWork.rejected, (state) => {
        state.loading = false;
      })
  },
})

export default AppData.reducer;
