const data = [
  {
    name: 'cohort',
    placeHolder: '',
    errorMsg: 'enter a name greater than 2 letters',
    required: true,
    label: 'Cohort Name',
  },
  {
    name: 'whatsAppLink',
    placeHolder: '',
    errorMsg: 'enter a valid whatsapp link',
    label: 'WhatsApp group Link',
  },
  {
    name: 'paymentType',
    placeHolder: '',
    errorMsg: '',
    required: true,
    itype: 'radio',
    label: 'Payment Type',
    types: [
      {
        name: 'Full Payment',
        value: 'full',
      },
      {
        name: 'Split Payment',
        value: 'split',
      },
    ],
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

export default data;
