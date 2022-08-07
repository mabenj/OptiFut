import { FormationId } from "../../types/formation-id";
import { PlayerEntity } from "../PlayerEntity";
import { Formation3142 } from "./Formation3142";
import { Formation3412 } from "./Formation3412";
import { Formation3421 } from "./Formation3421";
import { Formation343 } from "./Formation343";
import { Formation352 } from "./Formation352";
import { Formation41212 } from "./Formation41212";
import { Formation433 } from "./Formation433";
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
case "433": return new Formation433(players, useManager);
case "442": return new Formation442(players, useManager);
            default:
                throw new Error(
                    `Unknown or unimplemented formation '${formationId}'`
                );
        }
    }
}
