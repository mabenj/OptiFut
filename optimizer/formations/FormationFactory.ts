import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { Formation3142 } from "./Formation3142";
import { Formation3412 } from "./Formation3412";
import { Formation3421 } from "./Formation3421";
import { Formation343 } from "./Formation343";
import { Formation352 } from "./Formation352";
import { Formation41212 } from "./Formation41212";
import { Formation41212_2 } from "./Formation41212_2";
import { Formation4132 } from "./Formation4132";
import { Formation4141 } from "./Formation4141";
import { Formation4222 } from "./Formation4222";
import { Formation4231 } from "./Formation4231";
import { Formation4231_2 } from "./Formation4231_2";
import { Formation424 } from "./Formation424";
import { Formation4312 } from "./Formation4312";
import { Formation4321 } from "./Formation4321";
import { Formation433 } from "./Formation433";
import { Formation433_2 } from "./Formation433_2";
import { Formation442 } from "./Formation442";

export class FormationFactory {
    public static createFormation(
        formationId: FormationId,
        players: PlayerEntity[],
        useManager: boolean
    ) {
        switch (formationId) {
            case "3142": return new Formation3142(players, useManager);
case "3412": return new Formation3412(players, useManager);
case "3421": return new Formation3421(players, useManager);
case "343": return new Formation343(players, useManager);
case "352": return new Formation352(players, useManager);
case "41212": return new Formation41212(players, useManager);
case "41212_2": return new Formation41212_2(players, useManager);
case "4132": return new Formation4132(players, useManager);
case "4141": return new Formation4141(players, useManager);
case "4222": return new Formation4222(players, useManager);
case "4231": return new Formation4231(players, useManager);
case "4231_2": return new Formation4231_2(players, useManager);
case "424": return new Formation424(players, useManager);
case "4312": return new Formation4312(players, useManager);
case "4321": return new Formation4321(players, useManager);
case "433": return new Formation433(players, useManager);
case "433_2": return new Formation433_2(players, useManager);
case "442": return new Formation442(players, useManager);
            default:
                throw new Error(
                    `Unknown or unimplemented formation '${formationId}'`
                );
        }
    }
}
