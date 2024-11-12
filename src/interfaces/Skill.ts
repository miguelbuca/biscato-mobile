import { SkillType } from "./SkillType";

export interface Skill {
  name?: string;
  description?: string;
  skillTypeId?: string;
  skillType?: SkillType;
}
