export default [
  {
    name: 'cohort',
    placeHolder: '',
    errorMsg: 'enter a name greater than 2 letters',
    required: true,
    label: 'Cohort Name',
  },
  {
    name: 'folderId',
    placeHolder: '',
    errorMsg: 'enter a valid google drive folder id',
    required: true,
    label: 'Drive Id',
  },
  {
    name: 'startDate',
    placeHolder: 'Start date',
    errorMsg: '',
    required: true,
    type: 'date',
    label: 'From',
  },
  {
    name: 'endDate',
    placeHolder: 'End date',
    errorMsg: '',
    required: true,
    type: 'date',
    label: 'To',
  },
];
