export const initialState = {
  enrolledcourses: null,
  currentCourse: null,
  enrolledStudents: null,
  classdays: null,
  counts: null,
  classResources: null,
};

const course = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ENROLLED_COURSES':
      return {
        ...state,
        enrolledcourses: action.payload,
      };
    case 'GET_CURRENT_COURSE':
      return {
        ...state,
        currentCourse: action.payload,
      };
    case 'GET_ALL_ENROLLED_STUDENTS':
      return {
        ...state,
        enrolledStudents: action.payload,
      };
    case 'GET_ALL_CLASS_DAYS':
      return {
        ...state,
        classdays: action.payload,
      };
    case 'COUNTS':
      return {
        ...state,
        counts: action.payload,
      };
    case 'CREATE_CLASS_RESOURCES':
      return {
        ...state,
        classResources: action.payload,
      };
    case 'GET_RESOURCES':
      const prevRes = state.classResources[action.payload.name].files;
      return {
        ...state,
        classResources: {
          ...state.classResources,
          [action.payload.name]: {
            ...state.classResources[action.payload.name],
            files: prevRes
              ? [...prevRes, action.payload.file]
              : [action.payload.file],
          },
        },
      };
    case 'GET_ASSIGNMENT':
      return {
        ...state,
        classResources: {
          ...state.classResources,
          [action.payload.name]: {
            ...state.classResources[action.payload.name],
            assignment: action.payload.file,
          },
        },
      };
    case 'SUBMIT_ASSIGNMENT':
      const prevAss =
        state.classResources[action.payload.name].submittedAssignment;
      return {
        ...state,
        classResources: {
          ...state.classResources,
          [action.payload.name]: {
            ...state.classResources[action.payload.name],
            submittedAssignment: prevAss
              ? action.payload.file
                ? [...prevAss, action.payload.file]
                : prevAss
              : action.payload.file
              ? [action.payload.file]
              : [],
          },
        },
      };

    case 'DELETE_SUBMITTED_ASSIGNMENT':
      const prevAs =
        state.classResources[action.payload.name].submittedAssignment;
      return {
        ...state,
        classResources: {
          ...state.classResources,
          [action.payload.name]: {
            ...state.classResources[action.payload.name],
            submittedAssignment: prevAs.filter(
              (ass) => ass.id !== action.payload.id
            ),
          },
        },
      };

    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
};

export default course;
