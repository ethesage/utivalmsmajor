// roles use hieracial inheritance in piling up functionality
// can is where you list the permissions
// for scalability this will be stored ina database and be retrived during log in of users
// operation should be of format operation:crud e.g content:create
export default {
  rbac: {
    guest: {
      can: [''],
    },
    student: {
      can: [''],
      inherits: ['guest'],
    },
    trainer: {
      can: ['trainer'],
      inherits: ['student'],
    },
    admin: {
      can: ['course:crud'],
      inherits: ['trainer'],
    },
    tech: {
      can: [''],
      inherits: ['admin'],
    },
  },
};
