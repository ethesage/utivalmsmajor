export const initialState = {
  allCourses: null,
  currentCourse: null,
  cohorts: {},
  currentCohort: {},
};

const course = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_ORIGINAL_COURSES':
      return {
        ...state,
        allCourses: action.payload,
      };

    case 'GET_ALL_COURSE_COHORTS':
      return {
        ...state,
        cohorts: {
          ...state.cohorts,
          [action.payload.name]: action.payload.cohort,
        },
      };

    case 'UPDATE_COURSE_DESCRIPTION':
      return {
        ...state,
        currentCohort: {
          ...state.currentCohort,
          [action.payload.name]: {
            ...state.currentCohort[action.payload.name],
            Course: {
              ...state.currentCohort[action.payload.name].Course,
              CourseDescriptions: state.currentCohort[
                action.payload.name
              ].Course.CourseDescriptions.map((descrip) => {
                if (descrip.id === action.payload.courseDescription.id) {
                  return action.payload.courseDescription;
                }
                return descrip;
              }),
            },
          },
        },
      };

    case 'ADD_COURSE_DESCRIPTION':
      return {
        ...state,
        currentCohort: {
          ...state.currentCohort,
          [action.payload.name]: {
            ...state.currentCohort[action.payload.name],
            Course: {
              ...state.currentCohort[action.payload.name].Course,
              CourseDescriptions: [
                ...state.currentCohort[action.payload.name].Course
                  .CourseDescriptions,
                action.payload.courseDescription,
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
          [action.payload.name]: {
            ...state.currentCohort[action.payload.name],
            Classes: [
              ...state.currentCohort[action.payload.name].Classes,
              action.payload.newClass,
            ],
          },
        },
      };

    case 'ADD_COURSE_COHORT':
      return {
        ...state,
        cohorts: state.cohorts[action.payload.name]
          ? {
              ...state.cohorts,
              [action.payload.name]: [
                ...state.cohorts[action.payload.name],
                action.payload.cohort,
              ],
            }
          : {
              ...state.cohorts,
              [action.payload.name]: [action.payload.cohort],
            },
      };

    case 'ADD_CURRENT_COHORT':
      return {
        ...state,
        currentCohort: {
          ...state.currentCohort,
          [action.payload.name]: action.payload.courseCohort,
        },
      };

    case 'ADD_COURSE':
      return {
        ...state,
        allCourses: state.allCourses
          ? [...state.allCourses, action.payload]
          : [action.payload],
      };

    case 'EDIT_COURSE':
      return {
        ...state,
        allCourses: state.allCourses.map((course) => {
          if (course.id === action.payload.id) {
            return { ...course, ...action.payload };
          }
          return course;
        }),
      };

    case 'GET_CURRENT_COURSE':
      return {
        ...state,
        currentCourse: action.payload,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default course;
