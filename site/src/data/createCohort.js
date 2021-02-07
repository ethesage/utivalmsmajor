export default [
  {
    name: "cohort",
    placeHolder: "",
    errorMsg: "enter a name greater than 2 letters",
    required: true,
    label: "Cohort Name",
  },
  {
    name: "folderId",
    placeHolder: "",
    errorMsg: "enter a valid google drive folder id",
    required: true,
    label: "Drive Id",
  },
  {
    name: "paymentType",
    placeHolder: "",
    errorMsg: "",
    required: true,
    itype: "radio",
    label: "Payment Type",
    types: [
      {
        name: "Full Payment",
        value: "full",
      },
      {
        name: "Split Payment",
        value: "split",
      },
    ],
  },
  {
    name: "startDate",
    placeHolder: "Start date",
    errorMsg: "",
    required: true,
    type: "date",
    label: "From",
  },
  {
    name: "endDate",
    placeHolder: "End date",
    errorMsg: "",
    required: true,
    type: "date",
    label: "To",
  },
];
