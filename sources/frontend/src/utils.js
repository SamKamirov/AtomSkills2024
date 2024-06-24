export const isTeacher = ({ role }) => role === 'teacher';
export const isStudent = ({ role }) => role === 'teacher';

export const saveToken = (token) => localStorage.setItem("userToken", token);
export const getToken = () => localStorage.getItem('userToken');
export const dropToken = () => localStorage.removeItem('userToken');

export const filterTasks = (topic, lessons, tasks) => {
  if (!topic || !tasks) return
  const filteredLessons = topic && lessons.filter((lesson) => topic.lessons.includes(lesson.code));
  const filteredTasks = tasks && tasks.filter((item) => filteredLessons && filteredLessons.filter((lesson) => lesson.tasks.includes(item.code)));

  return filteredTasks;
}
