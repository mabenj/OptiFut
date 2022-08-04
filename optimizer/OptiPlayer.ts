import cloneDeep from "lodash.clonedeep";
import { PlayerPosition } from "../types/player-position.type";
import { choice } from "../utils/utils";
import { PositionInfos, PositionModifierGroups } from "./constants/positions";
import { PositionValue } from "./types/position-value.enum";
import { PositionInfo } from "./types/position-info.interface";

export class OptiPlayer {
    private readonly _possibleFacePositions: PositionValue[];
    private _currentPosition: PositionInfo;
    public readonly originalPosition: PositionInfo;
    public readonly id: number;
    public readonly name: string;
    public readonly nationalityId: number;
    public readonly leagueId: number;
    public readonly clubId: number;
    public readonly hasLoyalty: boolean;

    public get currentPosition() {
        return this._currentPosition;
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
        this._currentPosition = PositionInfo.fromString(position);
        this.originalPosition = cloneDeep(this._currentPosition);
        this._possibleFacePositions = getPositionModifierGroup(
            this.currentPosition.position
        );
    }

    public randomizeFifaPosition() {
        const newFacePosition = choice(this._possibleFacePositions);
        switch (newFacePosition) {
            case PositionInfos.ST.position:
                this._currentPosition = PositionInfos.ST;
                break;
            case PositionInfos.CF.position:
                this._currentPosition = PositionInfos.CF;
                break;
            case PositionInfos.LF.position:
                this._currentPosition = PositionInfos.LF;
                break;
            case PositionInfos.RF.position:
                this._currentPosition = PositionInfos.RF;
                break;
            case PositionInfos.LW.position:
                this._currentPosition = PositionInfos.LW;
                break;
            case PositionInfos.RW.position:
                this._currentPosition = PositionInfos.RW;
                break;
            case PositionInfos.LM.position:
                this._currentPosition = PositionInfos.LM;
                break;
            case PositionInfos.RM.position:
                this._currentPosition = PositionInfos.RM;
                break;
            case PositionInfos.CAM.position:
                this._currentPosition = PositionInfos.CAM;
                break;
            case PositionInfos.CM.position:
                this._currentPosition = PositionInfos.CM;
                break;
            case PositionInfos.CDM.position:
                this._currentPosition = PositionInfos.CDM;
                break;
            case PositionInfos.LWB.position:
                this._currentPosition = PositionInfos.LWB;
                break;
            case PositionInfos.LB.position:
                this._currentPosition = PositionInfos.LB;
                break;
            case PositionInfos.RWB.position:
                this._currentPosition = PositionInfos.RWB;
                break;
            case PositionInfos.RB.position:
                this._currentPosition = PositionInfos.RB;
                break;
            case PositionInfos.CB.position:
                this._currentPosition = PositionInfos.CB;
                break;
            case PositionInfos.GK.position:
                this._currentPosition = PositionInfos.GK;
                break;
            default:
                break;
        }
    }

    public getNumberOfPositionModifications() {
        return Math.abs(
            this.currentPosition.position - this.originalPosition.position
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
