import { FormationId } from "../../types/formation-id";
import { OptiPlayer } from "../OptiPlayer";
import { Formation433 } from "./Formation433";
import { Formation442 } from "./Formation442";

export class FormationFactory {
    public static createFormation(
        formationId: FormationId,
        players: OptiPlayer[],
        useManager: boolean
    ) {
        switch (formationId) {
            case "433":
                return new Formation433(players, useManager);
            case "442":
                return new Formation442(players, useManager);
            default:
                throw new Error(
                    `Unknown or unimplemented formation '${formationId}'`
                );
        }
    }
}
