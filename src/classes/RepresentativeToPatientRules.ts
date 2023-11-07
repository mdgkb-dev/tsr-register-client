export default {
  representativeTypeId: [
    {
      required: true,
      message: 'Необходимо указать роль представителя/подопечного',
      trigger: 'change',
    },
  ],
  patientId: [{ required: true, message: 'Необходимо указать подопечного', trigger: 'change' }],
  representativeId: [{ required: true, message: 'Необходимо указать представителя', trigger: 'change' }],
};
