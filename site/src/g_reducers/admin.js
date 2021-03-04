export const initialState = {
  allCourses: null,
  currentCourse: null,
  cohorts: {},
  currentCohort: {},
};

const course = (state = initialState, action) => {
  const payload = action.payload;
  let currentCourse;
  let currentCohort;

  switch (action.type) {
    case 'GET_ALL_ORIGINAL_COURSES':
      return {
        ...state,
        allCourses: payload,
      };

    case 'GET_ALL_COURSE_COHORTS':
      return {
        ...state,
        cohorts: {
          ...state.cohorts,
          [payload.name]: payload.cohort,
        },
      };

    case 'UPDATE_COURSE_DESCRIPTION':
      return {
        ...state,
        currentCohort: {
          ...state.currentCohort,
          [payload.name]: {
            ...state.currentCohort[payload.name],
            Course: {
              ...state.currentCohort[payload.name].Course,
              CourseDescriptions: state.currentCohort[
                payload.name
              ].Course.CourseDescriptions.map((descrip) => {
                if (descrip.id === payload.courseDescription.id) {
                  return payload.courseDescription;
                }
                return descrip;
              }),
            },
          },
        },
      };

    case 'DELETE_COURSE_DESCRIPTION':
      return {
        ...state,
        currentCohort: {
          ...state.currentCohort,
          [payload.name]: {
            ...state.currentCohort[payload.name],
            Course: {
              ...state.currentCohort[payload.name].Course,
              CourseDescriptions: state.currentCohort[
                payload.name
              ].Course.CourseDescriptions.filter(
                (descrip) => descrip.id !== payload.courseDescription.id
              ),
            },
          },
        },
      };

    case 'ADD_COURSE_DESCRIPTION':
      return {
        ...state,
        currentCohort: {
          ...state.currentCohort,
          [payload.name]: {
            ...state.currentCohort[payload.name],
            Course: {
              ...state.currentCohort[payload.name].Course,
              CourseDescriptions: [
                ...state.currentCohort[payload.name].Course.CourseDescriptions,
                payload.courseDescription,
              ],
            },
          },
        },
      };

    case 'ADD_CLASS':
      return {
        ...state,
        currentCohort: {
          ...state.currentCohort,
          [payload.name]: {
            ...state.currentCohort[payload.name],
            Classes: [
              ...state.currentCohort[payload.name].Classes,
              payload.newClass,
            ],
          },
        },
      };

    case 'EDIT_CLASS':
      return {
        ...state,
        currentCohort: {
          ...state.currentCohort,
          [payload.name]: {
            ...state.currentCohort[payload.name],
            Course: {
              ...state.currentCohort[payload.name].Course,
              Classes: state.currentCohort[payload.name].Course.Classes.map(
                (e_class) => {
                  if (e_class.id === payload.newClass.id) {
                    return payload.newClass;
                  }
                  return e_class;
                }
              ),
            },
          },
        },
      };

    case 'ADD_NEW_VIDEO':
      currentCohort = state.currentCohort[payload.courseName];
      currentCourse = state.currentCohort[payload.courseName].Course;

      return {
        ...state,
        currentCohort: {
          ...state.currentCohort,
          [payload.courseName]: {
            ...currentCohort,
            Course: {
              ...currentCourse,
              Classes: currentCourse.Classes.map((e_class) => {
                if (e_class.id === payload.classId) {
                  return {
                    ...e_class,
                    CohortClassVideos: [
                      ...e_class.CohortClassVideos,
                      payload.video,
                    ],
                  };
                }
                return e_class;
              }),
            },
          },
        },
      };

    case 'REMOVE_VIDEO':
      currentCohort = state.currentCohort[payload.courseName];
      currentCourse = state.currentCohort[payload.courseName].Course;

      return {
        ...state,
        currentCohort: {
          ...state.currentCohort,
          [payload.courseName]: {
            ...currentCohort,
            Course: {
              ...currentCourse,
              Classes: currentCourse.Classes.map((e_class) => {
                if (e_class.id === payload.classId) {
                  return {
                    ...e_class,
                    CohortClassVideos: e_class.CohortClassVideos.filter(
                      (vid) => vid.id !== payload.videoId
                    ),
                  };
                }
                return e_class;
              }),
            },
          },
        },
      };

    case 'DELETE_CLASS':
      return {
        ...state,
        currentCohort: {
          ...state.currentCohort,
          [payload.name]: {
            ...state.currentCohort[payload.name],
            Classes: state.currentCohort[payload.name].Classes.filter(
              (e_class) => e_class.id !== payload.newClass.id
            ),
          },
        },
      };

    case 'ADD_COURSE_COHORT':
      return {
        ...state,
        cohorts: state.cohorts[payload.name]
          ? {
              ...state.cohorts,
              [payload.name]: [...state.cohorts[payload.name], payload.cohort],
            }
          : {
              ...state.cohorts,
              [payload.name]: [payload.cohort],
            },
      };

    case 'EDIT_COURSE_COHORT':
      return {
        ...state,
        cohorts: {
          ...state.cohorts,
          [payload.name]: state.cohorts[payload.name].map((cohort) => {
            if (cohort.id === payload.editedCohort.id) {
              return payload.editedCohort;
            }

            return cohort;
          }),
        },
      };

    case 'ADD_CURRENT_COHORT':
      return {
        ...state,
        currentCohort: {
          ...state.currentCohort,
          [payload.name]: payload.courseCohort,
        },
      };

    case 'ADD_COURSE':
      return {
        ...state,
        allCourses: state.allCourses
          ? [...state.allCourses, payload]
          : [payload],
      };

    case 'EDIT_COURSE':
      return {
        ...state,
        allCourses: state.allCourses.map((course) => {
          if (course.id === payload.id) {
            return { ...course, ...payload };
          }
          return course;
        }),
      };

    case 'DELETE_COURSE':
      return {
        ...state,
        allCourses: state.allCourses.filter(
          (course) => course.id !== payload.id
        ),
      };

    case 'GET_CURRENT_COURSE':
      return {
        ...state,
        currentCourse: payload,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default course;
