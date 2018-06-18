import {JsonController, Get, QueryParam} from "routing-controllers";
import {Op} from 'sequelize';
import {Skillset} from '../../../models';

@JsonController('/api/profile')
export class ApiProfileRouter {
  @Get('/tags')
  getTags(@QueryParam('term') term: string): any {
    return Skillset.findAll<Skillset>({
      where: {name: {[Op.iLike]: `%${term}%`}}
    })
    .then(skillsets => {
      return skillsets.map(skill => skill.name);
    });
  }
}