import ContactRules from '@/classes/humans/ContactRules';

export default {
  surname: [{ required: true, message: 'Пожалуйста, укажите фамилию', trigger: 'blur' }],
  name: [{ required: true, message: 'Пожалуйста, укажите имя', trigger: 'blur' }],
  patronymic: [{ required: true, message: 'Пожалуйста, укажите отчество', trigger: 'blur' }],
  isMale: [{ required: true, message: 'Пожалуйста, выберите пол', trigger: 'change' }],
  dateBirth: [{ required: true, message: 'Пожалуйста, выберите дату рождения', trigger: 'change' }],
  addressRegistration: [{ required: true, message: 'Пожалуйста, укажите адрес регистрации', trigger: 'blur' }],
  addressResidential: [{ required: true, message: 'Пожалуйста, укажите адрес проживания', trigger: 'blur' }],
  contact: ContactRules,
};
