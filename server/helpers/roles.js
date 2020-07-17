// roles use hieracial inheritance in piling up functionality
// can is where you list the permissions
// for scalability this will be stored ina database and be retrived during log in of users
// operation should be of format operation:crud e.g content:create
export default {
  rbac: {
    guest: {
      can: [''],
    },
    user: {
      can: [''],
      inherits: ['guest'],
    },
    staff: {
      can: [''],
      inherits: ['user'],
    },
    admin: {
      can: ['admin:create'],
      inherits: ['staff'],
    },
    owner: {
      can: [''],
      inherits: ['admin'],
    },
    tech: {
      can: [''],
      inherits: ['owner'],
    },
  },
};
