export const TOGGLE_SIDEBAR = "app/student/TOGGLE_SIDEBAR";
export const SHOW_FETCH_PROGRESS = "app/student/profile/SHOW_FETCH_PROGRESS";
export const HIDE_FETCH_PROGRESS = "app/student/profile/HIDE_FETCH_PROGRESS";

export const toggleSidebar = () => {
  return { type: TOGGLE_SIDEBAR };
};

export const showStudentFetchProgress = () => {
  return { type: SHOW_FETCH_PROGRESS };
};

export const hideStidentFetchProgress = () => {
  return { type: HIDE_FETCH_PROGRESS };
};
