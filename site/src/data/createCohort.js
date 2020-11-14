export default [
  {
    name: 'name',
    errorMsg: 'enter a name greater than 2 letters',
    required: true,
  },
  {
    name: 'folderId',
    placeHolder: '',
    errorMsg: 'enter a valid google drive folder id',
    required: true,
  },
  {
    name: 'startDate',
    placeHolder: '',
    errorMsg: '',
    required: true,
    type: 'date',
  },
  {
    name: 'endDate',
    placeHolder: '',
    errorMsg: '',
    required: true,
    type: 'date',
  },
];
