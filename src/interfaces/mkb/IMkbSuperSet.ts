import MkbClass from "@/classes/mkb/MkbСlass";
import MkbDiagnosis from "@/classes/mkb/MkbDiagnosis";
import MkbGroup from "@/classes/mkb/MkbGroup";
import MkbSubDiagnosis from "@/classes/mkb/MkbSubDiagnosis";
import MkbSubGroup from "@/classes/mkb/MkbSubGroup";
import MkbSubSubGroup from "@/classes/mkb/MkbSubSubGroup";

type IMkbSuperSet = MkbClass | MkbGroup | MkbSubGroup | MkbSubSubGroup | MkbDiagnosis | MkbSubDiagnosis;

export default IMkbSuperSet;
