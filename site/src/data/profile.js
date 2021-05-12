const data = [
  {
    name: 'firstName',
    placeHolder: 'First Name',
    errorMsg: 'name should be greater than 2 letters',
    required: false,
  },
  {
    name: 'lastName',
    placeHolder: 'Last Name',
    errorMsg: 'name should be greater than 2 letters',
    required: false,
  },
  {
    name: 'phoneNumber',
    placeHolder: 'Phone Number',
    errorMsg: 'example +(234) xxxxxxxx',
    required: false,
  },
  {
    name: 'gender',
    placeHolder: 'Gender',
    errorMsg: '',
    required: false,
    itype: 'select',
  },
  {
    name: 'email',
    placeHolder: 'Email Address',
    errorMsg: 'email should be of the format johndoe@domain.com',
    required: false,
  },
  {
    name: 'occupation',
    placeHolder: 'Occupation',
    errorMsg: 'should be more than 2 letters',
    required: false,
  },
  {
    name: 'company',
    placeHolder: "Company's Name",
    errorMsg: 'should be more than 2 letters',
    required: false,
  },
  {
    name: 'country',
    placeHolder: 'Country',
    errorMsg: '',
    required: false,
    itype: 'select',
  },
  {
    name: 'region',
    placeHolder: 'Region',
    errorMsg: '',
    required: false,
    itype: 'select',
  },
];

export default data;
