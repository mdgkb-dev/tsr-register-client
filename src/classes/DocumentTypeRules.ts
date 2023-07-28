export default {
  name: [{ required: true, message: 'Необходимо заполнить название документа', trigger: 'blur' }],
  rowName: [{ required: true, message: 'Необходимо заполнить название поля', trigger: 'blur' }],
  rowType: [{ required: true, message: 'Необходимо выбрать тип поля', trigger: 'change' }],
  rowNumber: [{ required: true, message: 'Необходимо указать порядковый номер поля', trigger: 'blur' }],
};
