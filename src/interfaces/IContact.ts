export default interface IContact {
  id?: string;
  phone: string;
  email: string;
  formatPhoneNumber: () => void;
}
