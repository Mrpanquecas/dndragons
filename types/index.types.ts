import { Cantrip } from "../enums/cantrips.enum";
import { Class } from "../enums/classes.enum";
import { Gender } from "../enums/gender.enum";
import { Race } from "../enums/races.enum";


export interface Character {
  id: String,
  name: String,
  race: Race,
  class: Class,
  gender: Gender,
  hitpoints: number,
  armor: number,
  alignment: String,
  xp: String,
  initiative: number,
  ac: number,
  speed: number,
  maxHp: number,
  currentHp: number,
  str: number,
  dex: number,
  con: number,
  int: number,
  wis: number,
  cha: number,
  cantrips: Cantrip[],
  ownerId: String,
  owner: { name: String }
}