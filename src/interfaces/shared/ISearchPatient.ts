import ISearch from '@/interfaces/shared/ISearch';

export default interface ISearchPatient extends ISearch {
  patient: Patient;
}
