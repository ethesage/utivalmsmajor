export const initialState = {
  enrolledcourses: null,
  currentCourse: null,
  enrolledStudents: null,
  classdays: null,
  counts: null,
  classResources: null,
  allAssignments: null,
};

const course = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case 'GET_ENROLLED_COURSES':
      return {
        ...state,
        enrolledcourses: payload,
      };
    case 'GET_CURRENT_COURSE_MEMBER':
      return {
        ...state,
        currentCourse: payload,
      };
    case 'GET_ALL_ENROLLED_STUDENTS':
      return {
        ...state,
        enrolledStudents: payload,
      };

    case 'ENROLL_STUDENTS':
      return {
        ...state,
        enrolledStudents: {
          ...state.enrolledStudents,
          members: [...state.enrolledStudents.members, ...payload],
        },
      };

    case 'MEMBER_ADD_NEW_VIDEO':
      return {
        ...state,
        currentCourse: {
          ...state.currentCourse,
          Course: {
            ...state.currentCourse.Course,
            Classes: state.currentCourse.Course.Classes.map((e_class) => {
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
      };

    case 'MEMBER_REMOVE_VIDEO':
      return {
        ...state,
        currentCourse: {
          ...state.currentCourse,
          Course: {
            ...state.currentCourse.Course,
            Classes: state.currentCourse.Course.Classes.map((e_class) => {
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
      };

    case 'REMOVE_STUDENT':
      return {
        ...state,
        enrolledStudents: {
          ...state.enrolledStudents,
          members: state.enrolledStudents.members.filter(
            (student) => student.User.id !== payload
          ),
        },
      };

    case 'GET_ALL_CLASS_DAYS':
      return {
        ...state,
        classdays: payload,
      };
    case 'COUNTS':
      return {
        ...state,
        counts: payload,
      };
    case 'CREATE_CLASS_RESOURCES':
      return {
        ...state,
        classResources: payload,
      };
    case 'GET_RESOURCES':
      const prevRes = state.classResources[payload.name].resources;
      const file = payload.file;
      return {
        ...state,
        classResources: {
          ...state.classResources,
          [payload.name]: {
            ...state.classResources[payload.name],
            resources: prevRes ? [...prevRes, file] : file ? [file] : [],
          },
        },
      };

    case 'UPDATE_RESOURCE_NAME':
      // const prevRes = state.classResources[payload.name].files;
      // const file = payload.file;

      const newClassResoures = Object.keys(state.classResources).reduce(
        (acc, cur) => {
          if (cur === payload.oldname) {
            return {
              ...acc,
              [payload.newname]: state.classResources[payload.oldname],
            };
          }
          return { ...acc, [cur]: state.classResources[cur] };
        },
        {}
      );

      return {
        ...state,
        classResources: newClassResoures,
      };

    //UPDATE_RESOURCE_NAME

    case 'CREATE_RESOURCE_NAME':
      return {
        ...state,
        classResources: {
          ...state.classResources,
          [payload]: {
            files: [],
            assignments: [],
            allSubmittedAssignment: null,
          },
        },
      };

    case 'GET_ASSIGNMENT':
      return {
        ...state,
        classResources: {
          ...state.classResources,
          [payload.name]: {
            ...state.classResources[payload.name],
            assignments: payload.file ? [payload.file] : [],
          },
        },
      };

    case 'UPDATE_ASSIGNMENTS':
      return {
        ...state,
        classResources: {
          ...state.classResources,
          [payload.name]: {
            ...state.classResources[payload.name],
            assignments: payload.files,
          },
        },
      };

    case 'SUBMIT_ASSIGNMENT':
      const prevAss = state.classResources[payload.name].submittedAssignment;
      return {
        ...state,
        classResources: {
          ...state.classResources,
          [payload.name]: {
            ...state.classResources[payload.name],
            submittedAssignment: prevAss
              ? payload.file
                ? [...prevAss, payload.file]
                : prevAss
              : payload.file
              ? [payload.file]
              : [],
          },
        },
      };

    case 'GET_STUDENT_ASSIGNMENT':
      return {
        ...state,
        classResources: {
          ...state.classResources,
          [payload.name]: {
            ...state.classResources[payload.name],
            submittedAssignment: payload.data,
          },
        },
      };

    case 'UPDATE_SUBMITTED_ASSIGNMENT':
      const prevSubmittedAss =
        state.classResources[payload.name].submittedAssignment;

      return {
        ...state,
        classResources: {
          ...state.classResources,
          [payload.name]: {
            ...state.classResources[payload.name],
            submittedAssignment: prevSubmittedAss.map((ass) => {
              if (ass.Key === payload.file.Key) {
                return payload.file;
              }
              return ass;
            }),
          },
        },
      };

    case 'GET_ALL_SUBMITTED_ASSIGNMENTS':
      // const prevAss =
      //   state.classResources[payload.name].submittedAssignment;
      return {
        ...state,
        classResources: {
          ...state.classResources,
          [payload.name]: {
            ...state.classResources[payload.name],
            allSubmittedAssignment: payload.data,
          },
        },
      };

    case 'GRADE_ASSIGNMENT':
      const updated = state.classResources[
        payload.name
      ].allSubmittedAssignment.map((ass) => {
        if (ass.id === payload.Id) {
          return { ...ass, grade: payload.grade };
        }
        return ass;
      });

      return {
        ...state,
        classResources: {
          ...state.classResources,
          [payload.name]: {
            ...state.classResources[payload.name],
            allSubmittedAssignment: updated,
          },
        },
      };

    case 'DELETE_SUBMITTED_ASSIGNMENT':
      const prevAs = state.classResources[payload.name].submittedAssignment;
      return {
        ...state,
        classResources: {
          ...state.classResources,
          [payload.name]: {
            ...state.classResources[payload.name],
            submittedAssignment: prevAs.filter((ass) => ass.id !== payload.id),
          },
        },
      };

    case 'DELETE_ASSIGNMENT':
      // const prevAss_tr = state.classResources[payload.name].assignment;
      return {
        ...state,
        classResources: {
          ...state.classResources,
          [payload.name]: {
            ...state.classResources[payload.name],
            assignments: [],
          },
        },
      };

    case 'DELETE_RESOURCE':
      const prevAss_re = state.classResources[payload.name].resources;

      return {
        ...state,
        classResources: {
          ...state.classResources,
          [payload.name]: {
            ...state.classResources[payload.name],
            resources: prevAss_re.filter((file) => file.Key !== payload.file),
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
