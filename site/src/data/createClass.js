export default [
  {
    name: 'title',
    placeHolder: '',
    errorMsg: 'enter a title greater than 2 letters',
    required: true,
    label: 'Title',
  },
  {
    name: 'description',
    placeHolder: '',
    errorMsg: 'enter text longer than 2 letters',
    required: true,
    label: 'Description',
    type: 'textarea',
  },
  {
    name: 'link',
    placeHolder: '',
    errorMsg: '',
    required: true,
    label: 'Link to Class',
  },
  {
    name: 'date',
    placeHolder: 'Date',
    errorMsg: '',
    required: true,
    type: 'date',
  },
  {
    name: 'time',
    placeHolder: '',
    errorMsg: '',
    required: true,
    type: 'date',
  },
];
