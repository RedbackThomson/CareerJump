import {Sequelize} from 'sequelize-typescript';

import {Company} from "./entities/Company";
import {CompanyPayment} from "./entities/CompanyPayment";
import {CompanyUser} from "./entities/CompanyUser";
import {Fair} from "./entities/Fair";
import {Interview} from "./entities/Interview";
import {Referral} from "./entities/Referral";
import {Skillset} from "./entities/Skillset";
import {StudentProfile} from "./entities/StudentProfile";
import {StudentUser} from "./entities/StudentUser";

export {Sequelize} from 'sequelize-typescript';

export {Company} from "./entities/Company";
export {CompanyPayment} from "./entities/CompanyPayment";
export {CompanyUser} from "./entities/CompanyUser";
export {Fair} from "./entities/Fair";
export {Interview} from "./entities/Interview";
export {Referral} from "./entities/Referral";
export {Skillset} from "./entities/Skillset";
export {StudentProfile} from "./entities/StudentProfile";
export {StudentUser} from "./entities/StudentUser";

/**
 *  All models must be imported from this file or else they will not be registered with Sequelize
 */

export class Models {

    public sequelize: Sequelize;

    constructor(config: any) {
        this.sequelize = new Sequelize(config);
    }

    public initModels(): any {
        this.sequelize.addModels(this.getModels());
        return this.sequelize.authenticate();
    }

    private getModels() {
        return [
            Company,
            CompanyPayment,
            CompanyUser,
            Fair,
            Interview,
            Referral,
            Skillset,
            StudentUser,
            StudentProfile,
        ];
    }
}