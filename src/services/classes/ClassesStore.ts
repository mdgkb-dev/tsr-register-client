import Division from '@/classes/Division';
import Doctor from '@/classes/Doctor';
import Entrance from '@/classes/Entrance';
import Schedule from '@/classes/Schedule';
import Timetable from '@/classes/Timetable';
import TreatDirection from '@/classes/TreatDirection';
import ContactInfo from '@/services/classes/ContactInfo';

const ClassesStore: any = {
  Division,
  Entrance,
  Timetable,
  Schedule,
  TreatDirection,
  ContactInfo,
  Doctor,
};

export class DynamicClass {
  constructor(className: string) {
    if (ClassesStore[className] === undefined || ClassesStore[className] === null) {
      throw new Error(`Class type of '${className}' is not in the store`);
    }
    return new ClassesStore[className]();
  }

  static GetClass(className: string): any {
    return ClassesStore[className];
  }
}
