import Contact from '@/classes/humans/Contact';

export default {
  phone: [{ validator: Contact.validatePhone, trigger: 'blur' }],
  email: [{ validator: Contact.validateEmail, trigger: 'blur' }],
};
