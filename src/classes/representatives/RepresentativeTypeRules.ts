export default {
  name: [{ required: true, message: 'Необходимо указать наименование типа представителя', trigger: 'blur' }],
  genderType: [{ required: true, message: 'Необходимо указать тип подопечного', trigger: 'blur' }],
  isMale: [{ required: true, message: 'Необходимо указать пол представителя', trigger: 'blur' }],
};
