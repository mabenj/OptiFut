import cloneDeep from "lodash.clonedeep";
import { PlayerPosition } from "../types/player-position.type";
import { choice } from "../utils/utils";
import { FifaPositions, PositionModifierGroups } from "./constants/positions";
import { FifaPosition } from "./types/fifa-position.interface";
import { PositionValue } from "./types/position-value.enum";

export class OptiPlayer {
    private readonly _posModGroup: PositionValue[];
    private _currentFifaPosition: FifaPosition;
    public readonly originalFifaPosition: FifaPosition;
    public readonly id: number;
    public readonly nationalityId: number;
    public readonly leagueId: number;
    public readonly clubId: number;
    public readonly hasLoyalty: boolean;

    public get currentFifaPosition() {
        return this._currentFifaPosition;
    }

    constructor(
        id: number,
        nationalityId: number,
        leagueId: number,
        clubId: number,
        position: PlayerPosition,
        hasLoyalty: boolean
    ) {
        this.id = id;
        this.nationalityId = nationalityId;
        this.leagueId = leagueId;
        this.clubId = clubId;
        this.hasLoyalty = hasLoyalty;
        this._currentFifaPosition = FifaPosition.fromString(position);
        this.originalFifaPosition = cloneDeep(this._currentFifaPosition);
        this._posModGroup = getPositionModifierGroup(
            this.currentFifaPosition.positionValue
        );
    }

    public randomizeFifaPosition() {
        const newPositionValue = choice(this._posModGroup);
        switch (newPositionValue) {
            case FifaPositions.ST.positionValue:
                this._currentFifaPosition = FifaPositions.ST;
                break;
            case FifaPositions.CF.positionValue:
                this._currentFifaPosition = FifaPositions.CF;
                break;
            case FifaPositions.LF.positionValue:
                this._currentFifaPosition = FifaPositions.LF;
                break;
            case FifaPositions.RF.positionValue:
                this._currentFifaPosition = FifaPositions.RF;
                break;
            case FifaPositions.LW.positionValue:
                this._currentFifaPosition = FifaPositions.LW;
                break;
            case FifaPositions.RW.positionValue:
                this._currentFifaPosition = FifaPositions.RW;
                break;
            case FifaPositions.LM.positionValue:
                this._currentFifaPosition = FifaPositions.LM;
                break;
            case FifaPositions.RM.positionValue:
                this._currentFifaPosition = FifaPositions.RM;
                break;
            case FifaPositions.CAM.positionValue:
                this._currentFifaPosition = FifaPositions.CAM;
                break;
            case FifaPositions.CM.positionValue:
                this._currentFifaPosition = FifaPositions.CM;
                break;
            case FifaPositions.CDM.positionValue:
                this._currentFifaPosition = FifaPositions.CDM;
                break;
            case FifaPositions.LWB.positionValue:
                this._currentFifaPosition = FifaPositions.LWB;
                break;
            case FifaPositions.LB.positionValue:
                this._currentFifaPosition = FifaPositions.LB;
                break;
            case FifaPositions.RWB.positionValue:
                this._currentFifaPosition = FifaPositions.RWB;
                break;
            case FifaPositions.RB.positionValue:
                this._currentFifaPosition = FifaPositions.RB;
                break;
            case FifaPositions.CB.positionValue:
                this._currentFifaPosition = FifaPositions.CB;
                break;
            case FifaPositions.GK.positionValue:
                this._currentFifaPosition = FifaPositions.GK;
                break;
            default:
                break;
        }
    }

    public getNumberOfPositionModifications() {
        return Math.abs(
            this.currentFifaPosition.positionValue -
                this.originalFifaPosition.positionValue
        );
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
    return cloneDeep(out);
}
