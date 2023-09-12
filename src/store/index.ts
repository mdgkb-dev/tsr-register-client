import Vuex, { StoreOptions } from 'vuex';

import { admin } from '@/store/modules/admin';
import { anamneses } from '@/store/modules/anamnses';
import auth from '@/store/modules/auth';
import { commissions } from '@/store/modules/commissions';
import { commissionsDoctors } from '@/store/modules/commissionsDoctors';
import { commissionsDrugApplications } from '@/store/modules/commissionsDrugApplications';
import { commissionsTemplates } from '@/store/modules/commissionsTemplates';
import { cropper } from '@/store/modules/cropper';
import dataExport from '@/store/modules/dataExport';
import { disabilities } from '@/store/modules/disabilities';
import { doctors } from '@/store/modules/doctors';
import { documentFieldValues } from '@/store/modules/documentFieldValues';
import { documentFileInfos } from '@/store/modules/documentFileInfos';
import { documents } from '@/store/modules/documents';
import { documentTypes } from '@/store/modules/documentTypes';
import { drugApplications } from '@/store/modules/drugApplications';
import { drugArrives } from '@/store/modules/drugArrives';
import { drugDecreases } from '@/store/modules/drugDecreases';
import { drugDozes } from '@/store/modules/drugDozes';
import { drugForms } from '@/store/modules/drugForms';
import { drugRecipes } from '@/store/modules/drugRecipes';
import { drugs } from '@/store/modules/drugs';
import { edvs } from '@/store/modules/edvs';
import { fileInfos } from '@/store/modules/fileInfos';
import { filter } from '@/store/modules/filter';
import { fundContracts } from '@/store/modules/fundContracts';
import { fundCouncils } from '@/store/modules/fundCouncils';
import { humans } from '@/store/modules/humans';
import { main } from '@/store/modules/main';
import { menus } from '@/store/modules/menus';
import { meta } from '@/store/modules/meta';
import { mkbItems } from '@/store/modules/mkbItems';
import { pagination } from '@/store/modules/pagination';
import { patientDiagnosis } from '@/store/modules/patientDiagnosis';
import { patientHistories } from '@/store/modules/patientHistories';
import { patients } from '@/store/modules/patients';
import { patientsDomains } from '@/store/modules/patientsDomains';
import { patientsRegisters } from '@/store/modules/patientsRegisters';
import { patientsRepresentatives } from '@/store/modules/patientsRepresentatives';
import { patientsResearches } from '@/store/modules/patientsResearches';
import { patientsResearchesPools } from '@/store/modules/patientsResearchesPools';
import { questions } from '@/store/modules/questions';
import { registers } from '@/store/modules/registers';
import { representatives } from '@/store/modules/representatives';
import { representativeTypes } from '@/store/modules/representativeTypes';
import { researches } from '@/store/modules/researches';
import { researchesPools } from '@/store/modules/researchesPools';
import { researchesResults } from '@/store/modules/researchesResults';
import search from '@/store/modules/search';
import { statuses } from '@/store/modules/statuses';
import { users } from '@/store/modules/users';

import RootState from './types';

const store: StoreOptions<RootState> = {
  state: {
    layout: 'main-layout',
  },
  getters: {
    layout(state) {
      return state.layout;
    },
  },
  mutations: {
    setLayout(state, payload) {
      state.layout = payload;
    },
  },
  modules: {
    patientDiagnosis,
    researchesResults,
    auth,
    edvs,
    disabilities,
    cropper,
    filter,
    main,
    meta,
    mkbItems,
    pagination,
    patients,
    researches,
    researchesPools,
    patientsResearchesPools,
    registers,
    representatives,
    representativeTypes,
    users,
    search,
    admin,
    patientsResearches,
    patientsRepresentatives,
    humans,
    anamneses,
    patientsRegisters,
    patientHistories,
    commissionsTemplates,
    commissionsDoctors,
    commissions,
    doctors,
    drugs,
    drugArrives,
    fundContracts,
    fundCouncils,
    drugApplications,
    commissionsDrugApplications,
    statuses,
    drugDecreases,
    drugForms,
    drugRecipes,
    questions,
    documentTypes,
    documents,
    documentFieldValues,
    documentFileInfos,
    drugDozes,
    fileInfos,
    menus,
    patientsDomains,
    dataExport,
  },
};

export default new Vuex.Store<RootState>(store);
