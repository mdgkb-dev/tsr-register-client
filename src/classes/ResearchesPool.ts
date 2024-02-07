import ClassHelper from '@/services/ClassHelper';

export default class ResearchesPool {
  id?: string;
  name = '';
  // @ClassHelper.GetClassConstructor(RegisterDiagnosis)
  // registerDiagnosis: RegisterDiagnosis[] = [];
  registerDiagnosisForDelete: string[] = [];
  // @ClassHelper.GetClassConstructor(ResearchesPoolResearch)
  researchesPoolsResearches: any[] = [];
  researchesPoolsResearchesForDelete: string[] = [];

  constructor(i?: ResearchesPool) {
    ClassHelper.BuildClass(this, i);
  }

  // getProps(): RegisterProperty[] {
  //   const props: RegisterProperty[] = [];
  //   this.researchSection.forEach((group: ResearchSection) =>
  //     group.registerProperties.forEach((property: RegisterProperty) => {
  //       props.push(property);
  //     })
  //   );
  //   return props as RegisterProperty[];
  // }
  //
  // patientIncludableByDiagnosis(patientDiagnosis: PatientDiagnosis[]): boolean {
  //   if (this.registerDiagnosis.length === 0) return true;
  //   const diagnosis = patientDiagnosis.find((d: PatientDiagnosis) => {
  //     return !!this.registerDiagnosis.find((i) => i.mkbItemId === d.mkbItemId);
  //   });
  //   return !!diagnosis;
  // }
  //
  // patientInRegister(registerToPatient: RegisterToPatient[]): boolean {
  //   return !!registerToPatient.find((i: RegisterToPatient) => i.registerId === this.id);
  // }
  //
  // getTagName(): string {
  //   if (this.name.length > 10) return this.name.replace(/(?<=.{9}).+/g, '...');
  //   return this.name;
  // }
  //
  // addRegisterGroup(item?: ResearchSection): void {
  //   const newItem = new ResearchSection(item);
  //   newItem.order = this.researchSection.length;
  //   this.researchSection.push(newItem);
  // }
  //
  // removeRegisterGroup(index: number): void {
  //   const idForDelete = this.researchSection[index].id;
  //   if (idForDelete) {
  //     this.researchSectionForDelete.push(idForDelete);
  //   }
  //   this.researchSection.splice(index, 1);
  // }
  //
  // sortGroups(): void {
  //   this.researchSection.forEach((item: ResearchSection, index: number) => (item.order = index));
  // }
}
