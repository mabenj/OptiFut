import cloneDeep from "lodash.clonedeep";
import { choice } from "../../utils/utils";
import {
    POSITIONS,
    POSITION_MODIFIER_GROUPS as POS_MOD_GROUPS
} from "../constants/positions";
import { Club } from "../types/club.interface";
import { League } from "../types/league.interface";
import { Nationality } from "../types/nationality.interface";
import { PlayerDto } from "../types/player-dto.interface";
import { PositionIdentifier } from "../types/position-identifier.enum";
import { Position } from "../types/position.interface";

export class Player {
    private posModGroup: PositionIdentifier[];
    private _facePosition: Position;
    public originalPosition: Position;

    public get facePosition() {
        return this._facePosition;
    }

    constructor(
        public readonly name: string,
        public readonly nationality: Nationality,
        public readonly league: League,
        public readonly club: Club,
        facePosition: Position,
        public readonly loyaltyBonus: boolean
    ) {
        this._facePosition = facePosition;
        this.originalPosition = cloneDeep(facePosition);
        let modGroup: PositionIdentifier[] = [];
        if (
            POS_MOD_GROUPS.StrikersMidfielders.includes(
                this.facePosition.naturalPosition
            )
        ) {
            modGroup = POS_MOD_GROUPS.StrikersMidfielders;
        } else if (
            POS_MOD_GROUPS.LeftFielders.includes(
                this.facePosition.naturalPosition
            )
        ) {
            modGroup = POS_MOD_GROUPS.LeftFielders;
        } else if (
            POS_MOD_GROUPS.RightFielders.includes(
                this.facePosition.naturalPosition
            )
        ) {
            modGroup = POS_MOD_GROUPS.RightFielders;
        } else if (
            POS_MOD_GROUPS.LeftBacks.includes(this.facePosition.naturalPosition)
        ) {
            modGroup = POS_MOD_GROUPS.LeftBacks;
        } else if (
            POS_MOD_GROUPS.RightBacks.includes(
                this.facePosition.naturalPosition
            )
        ) {
            modGroup = POS_MOD_GROUPS.RightBacks;
        } else if (
            POS_MOD_GROUPS.CenterBacks.includes(
                this.facePosition.naturalPosition
            )
        ) {
            modGroup = POS_MOD_GROUPS.CenterBacks;
        } else if (
            POS_MOD_GROUPS.Goalkeepers.includes(
                this.facePosition.naturalPosition
            )
        ) {
            modGroup = POS_MOD_GROUPS.Goalkeepers;
        }
        this.posModGroup = cloneDeep(modGroup);
    }

    public randomizeFacePosition() {
        const newPosId = choice(this.posModGroup);
        switch (newPosId) {
            case POSITIONS.ST.naturalPosition:
                this._facePosition = POSITIONS.ST;
                break;
            case POSITIONS.CF.naturalPosition:
                this._facePosition = POSITIONS.CF;
                break;
            case POSITIONS.LF.naturalPosition:
                this._facePosition = POSITIONS.LF;
                break;
            case POSITIONS.RF.naturalPosition:
                this._facePosition = POSITIONS.RF;
                break;
            case POSITIONS.LW.naturalPosition:
                this._facePosition = POSITIONS.LW;
                break;
            case POSITIONS.RW.naturalPosition:
                this._facePosition = POSITIONS.RW;
                break;
            case POSITIONS.LM.naturalPosition:
                this._facePosition = POSITIONS.LM;
                break;
            case POSITIONS.RM.naturalPosition:
                this._facePosition = POSITIONS.RM;
                break;
            case POSITIONS.CAM.naturalPosition:
                this._facePosition = POSITIONS.CAM;
                break;
            case POSITIONS.CM.naturalPosition:
                this._facePosition = POSITIONS.CM;
                break;
            case POSITIONS.CDM.naturalPosition:
                this._facePosition = POSITIONS.CDM;
                break;
            case POSITIONS.LWB.naturalPosition:
                this._facePosition = POSITIONS.LWB;
                break;
            case POSITIONS.LB.naturalPosition:
                this._facePosition = POSITIONS.LB;
                break;
            case POSITIONS.RWB.naturalPosition:
                this._facePosition = POSITIONS.RWB;
                break;
            case POSITIONS.RB.naturalPosition:
                this._facePosition = POSITIONS.RB;
                break;
            case POSITIONS.CB.naturalPosition:
                this._facePosition = POSITIONS.CB;
                break;
            case POSITIONS.GK.naturalPosition:
                this._facePosition = POSITIONS.GK;
                break;
            default:
                break;
        }
    }

    public getPosModCount() {
        return Math.abs(
            this.facePosition.naturalPosition -
                this.originalPosition.naturalPosition
        );
    }

    public toDto(): PlayerDto {
        return {
            name: this.name,
            nationality: this.nationality,
            league: this.league,
            club: this.club,
            facePosition: PositionIdentifier.toTag(
                this.facePosition.naturalPosition
            ),
            hasLoyalty: this.loyaltyBonus
        };
    }
}
