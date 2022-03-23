import { FrequentFlyerModelInterface } from '../interface/frequent-flyer-model-interface';

export class FrequentFlyerModel implements FrequentFlyerModelInterface {
  firstName: string;
  lastName: string;
  status: string;
  points: number;
  keyid: number;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.status = 'Bronze';
    this.points = 0;
    this.keyid = 1;
  }
}
