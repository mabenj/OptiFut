import cloneDeep from "lodash.clonedeep";
import { PlayerPosition } from "../types/player-position.type";
import { choice } from "../utils/utils";
import { PositionInfos, PositionModifierGroups } from "./constants/positions";
import { PositionValue } from "./types/position-value.enum";

export class PlayerEntity {
    private readonly possiblePositions: PositionValue[];
    public readonly originalPosition: PositionValue;
    private _currentPosition: PositionValue;
    public _relatedPositions: PositionValue[] = [];
    public _unrelatedPositions: PositionValue[] = [];

    public readonly id: number;
    public readonly name: string;
    public readonly nationalityId: number;
    public readonly leagueId: number;
    public readonly clubId: number;
    public readonly hasLoyalty: boolean;

    public get currentPosition() {
        return this._currentPosition;
    }

    public get relatedPositions() {
        return this._relatedPositions;
    }

    public get unrelatedPositions() {
        return this._unrelatedPositions;
    }

    constructor(
        id: number,
        name: string,
        nationalityId: number,
        leagueId: number,
        clubId: number,
        position: PlayerPosition,
        hasLoyalty: boolean
    ) {
        this.id = id;
        this.name = name;
        this.nationalityId = nationalityId;
        this.leagueId = leagueId;
        this.clubId = clubId;
        this.hasLoyalty = hasLoyalty;

        this._currentPosition = PositionValue.fromString(position);
        this.originalPosition = cloneDeep(this._currentPosition);
        this.possiblePositions = getPositionModifierGroup(
            this._currentPosition
        );
        this.setPosition(this._currentPosition);
    }

    public randomizePosition() {
        const newPosition = choice(this.possiblePositions);
        this.setPosition(newPosition);
    }

    public getNumberOfPositionModifications() {
        return Math.abs(this.currentPosition - this.originalPosition);
    }

    private setPosition(position: PositionValue) {
        this._currentPosition = position;
        const posInfo = PositionInfos.find(
            (posInfo) => posInfo.position === this._currentPosition
        );
        if (!posInfo) {
            throw new Error(
                `Could not find position info for position '${this._currentPosition}'`
            );
        }
        this._relatedPositions = posInfo.relatedPositions;
        this._unrelatedPositions = posInfo.unrelatedPositions;
    }
}

function getPositionModifierGroup(
    positionValue: PositionValue
): PositionValue[] {
    let out: PositionValue[] = [];
    if (PositionModifierGroups.StrikersMidfielders.includes(positionValue)) {
        out = PositionModifierGroups.StrikersMidfielders;
    } else if (PositionModifierGroups.LeftFielders.includes(positionValue)) {
        out = PositionModifierGroups.LeftFielders;
    } else if (PositionModifierGroups.RightFielders.includes(positionValue)) {
        out = PositionModifierGroups.RightFielders;
    } else if (PositionModifierGroups.LeftBacks.includes(positionValue)) {
        out = PositionModifierGroups.LeftBacks;
    } else if (PositionModifierGroups.RightBacks.includes(positionValue)) {
        out = PositionModifierGroups.RightBacks;
    } else if (PositionModifierGroups.CenterBacks.includes(positionValue)) {
        out = PositionModifierGroups.CenterBacks;
    } else if (PositionModifierGroups.Goalkeepers.includes(positionValue)) {
        out = PositionModifierGroups.Goalkeepers;
    }
    return out;
}
