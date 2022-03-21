import { FrequentFlyerModelInterface } from '../interface/frequent-flyer-model-interface';
import { FrequentFlyerDtoInterface } from '../interface/frequent-flyer-dto-interface';
import { FrequentFlyerModel } from '../model/frequent-flyer-model';

export class FrequentFlyerClubService {
  ffClub:Array<FrequentFlyerModelInterface> = [];

  addToClub(newMember: FrequentFlyerDtoInterface) {
    const nm = new FrequentFlyerModel(newMember.firstName, newMember.lastName);
    nm.points = 0;
    nm.status = 'Bronze';

    this.ffClub.push(nm);

    return this.ffClub.length - 1;
  }

  listMembers():Array<FrequentFlyerModelInterface> {
    return this.ffClub;
  }

  getMemberDetails(): FrequentFlyerModel {
    const m = this.ffClub[this.ffClub.length - 1];

    if (m) {
      return m;
    } else {
      return {
        lastName: '',
        firstName: '',
        status: '',
        points: -1,
      };
    }
  }
  updateClubMember(member: FrequentFlyerDtoInterface) {
    const m = this.ffClub.length -1 ;
    // console.log('in coming points = ', member.points);

    this.ffClub[m].lastName = member.lastName;
    this.ffClub[m].firstName = member.firstName;
    this.ffClub[m].points += member.points ? parseInt('' + member.points) :  0;
    this.ffClub[m].status = member.status !== this.ffClub[m].status ? ''+ member.status : this.calculateStatus(m);

    // console.log(`mm= ${JSON.stringify(this.ffClub[m])}`);
  }

  calculateStatus(id: number): string {
    const BRONZE_LOWER = 0;
    const BRONZE_UPPER = 299;
    const SILVER_LOWER = 300;
    const SILVER_UPPER = 499;
    const GOLD_LOWER = 500;
    const GOLD_UPPER = 699;
    const PLATINUM_UPPER = 700;

    try {
      const m = this.ffClub[id];
      let status = ''

      if (m.points >= BRONZE_LOWER && m.points <= BRONZE_UPPER) {
        status = 'Bronze';
      } else if (m.points >= SILVER_LOWER && m.points <= SILVER_UPPER) {
        status = 'Silver';
      } else if (m.points >= GOLD_LOWER && m.points <= GOLD_UPPER) {
        status = 'Gold';
      } else if (m.points >= PLATINUM_UPPER) {
        status = 'Platinum';
      }

      return status;
    } catch (e) {
      return 'Error Bronze';
    }
  }

  getMemberId(): number {
    return this.ffClub.length - 1;
  }
}
