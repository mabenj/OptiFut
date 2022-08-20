import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { Formation3142 } from "./concrete-formations/Formation3142";
import { Formation3412 } from "./concrete-formations/Formation3412";
import { Formation3421 } from "./concrete-formations/Formation3421";
import { Formation343 } from "./concrete-formations/Formation343";
import { Formation352 } from "./concrete-formations/Formation352";
import { Formation41212 } from "./concrete-formations/Formation41212";
import { Formation41212_2 } from "./concrete-formations/Formation41212_2";
import { Formation4132 } from "./concrete-formations/Formation4132";
import { Formation4141 } from "./concrete-formations/Formation4141";
import { Formation4222 } from "./concrete-formations/Formation4222";
import { Formation4231 } from "./concrete-formations/Formation4231";
import { Formation4231_2 } from "./concrete-formations/Formation4231_2";
import { Formation424 } from "./concrete-formations/Formation424";
import { Formation4312 } from "./concrete-formations/Formation4312";
import { Formation4321 } from "./concrete-formations/Formation4321";
import { Formation433 } from "./concrete-formations/Formation433";
import { Formation433_2 } from "./concrete-formations/Formation433_2";
import { Formation433_3 } from "./concrete-formations/Formation433_3";
import { Formation433_4 } from "./concrete-formations/Formation433_4";
import { Formation433_5 } from "./concrete-formations/Formation433_5";
import { Formation4411 } from "./concrete-formations/Formation4411";
import { Formation4411_2 } from "./concrete-formations/Formation4411_2";
import { Formation442 } from "./concrete-formations/Formation442";
import { Formation442_2 } from "./concrete-formations/Formation442_2";
import { Formation451 } from "./concrete-formations/Formation451";
import { Formation451_2 } from "./concrete-formations/Formation451_2";
import { Formation5212 } from "./concrete-formations/Formation5212";
import { Formation5221 } from "./concrete-formations/Formation5221";
import { Formation532 } from "./concrete-formations/Formation532";
import { Formation541 } from "./concrete-formations/Formation541";
import { Formation } from "./Formation";

export class FormationFactory {
    public static createFormation(
        formationId: FormationId,
        players: PlayerEntity[],
        useManager: boolean
    ): Formation {
        switch (formationId) {
            case "3142":
                return new Formation3142(players, useManager);
            case "3412":
                return new Formation3412(players, useManager);
            case "3421":
                return new Formation3421(players, useManager);
            case "343":
                return new Formation343(players, useManager);
            case "352":
                return new Formation352(players, useManager);
            case "41212":
                return new Formation41212(players, useManager);
            case "41212_2":
                return new Formation41212_2(players, useManager);
            case "4132":
                return new Formation4132(players, useManager);
            case "4141":
                return new Formation4141(players, useManager);
            case "4222":
                return new Formation4222(players, useManager);
            case "4231":
                return new Formation4231(players, useManager);
            case "4231_2":
                return new Formation4231_2(players, useManager);
            case "424":
                return new Formation424(players, useManager);
            case "4312":
                return new Formation4312(players, useManager);
            case "4321":
                return new Formation4321(players, useManager);
            case "433":
                return new Formation433(players, useManager);
            case "433_2":
                return new Formation433_2(players, useManager);
            case "433_3":
                return new Formation433_3(players, useManager);
            case "433_4":
                return new Formation433_4(players, useManager);
            case "433_5":
                return new Formation433_5(players, useManager);
            case "4411":
                return new Formation4411(players, useManager);
            case "4411_2":
                return new Formation4411_2(players, useManager);
            case "442":
                return new Formation442(players, useManager);
            case "442_2":
                return new Formation442_2(players, useManager);
            case "451":
                return new Formation451(players, useManager);
            case "451_2":
                return new Formation451_2(players, useManager);
            case "5212":
                return new Formation5212(players, useManager);
            case "5221":
                return new Formation5221(players, useManager);
            case "532":
                return new Formation532(players, useManager);
            case "541":
                return new Formation541(players, useManager);
            default:
                throw new Error(
                    `Unknown or unimplemented formation '${formationId}'`
                );
        }
    }
}
