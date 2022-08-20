import cloneDeep from "lodash.clonedeep";
import { PlayerPosition } from "../types/player-position.type";
import { shuffle } from "../utils/utils";

export class PlayerEntity {
    public readonly id: number;
    public readonly name: string;

    public readonly nationId: number;
    public readonly leagueId: number;
    public readonly clubId: number;

    public prefPosition: PlayerPosition;
    public readonly initialPrefPosition: PlayerPosition;
    private readonly defaultPrefPosition: PlayerPosition;
    private altPositions: PlayerPosition[];

    constructor(
        id: number,
        name: string,
        nationId: number,
        leagueId: number,
        clubId: number,
        prefPosition: PlayerPosition,
        defaultPrefPosition: PlayerPosition,
        altPositions: PlayerPosition[]
    ) {
        this.id = id;
        this.name = name;
        this.nationId = nationId;
        this.leagueId = leagueId;
        this.clubId = clubId;
        this.prefPosition = prefPosition;
        this.initialPrefPosition = cloneDeep(prefPosition);
        this.defaultPrefPosition = defaultPrefPosition;
        this.altPositions = altPositions;
    }

    public randomizePosition() {
        this.altPositions = shuffle(this.altPositions);
        const newPosition = this.altPositions.pop();
        if (!newPosition) {
            return;
        }
        this.altPositions.push(this.prefPosition);
        this.prefPosition = newPosition;
    }
}
