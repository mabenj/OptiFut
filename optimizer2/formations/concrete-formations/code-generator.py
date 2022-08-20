def main():
    for formation in formations:
        with open(f"Formation{formation['formationId']}.ts", "w") as f:
            code = f'''import {{ PlayerEntity }} from "../../PlayerEntity";
import {{ PositionNode }} from "../../PositionNode";
import {{ Formation }} from "../Formation";

export class Formation{formation["formationId"]} extends Formation {{
    public readonly formationId = "{formation["formationId"]}";

    /**
     *
     * @param players Order: {', '.join(formation["positions"])}
     */
    constructor(players: PlayerEntity[], useManager: boolean) {{
        super(
            PositionNode.createForFormation(players, [
                "{formation["positions"][0]}",
                "{formation["positions"][1]}",
                "{formation["positions"][2]}",
                "{formation["positions"][3]}",
                "{formation["positions"][4]}",
                "{formation["positions"][5]}",
                "{formation["positions"][6]}",
                "{formation["positions"][7]}",
                "{formation["positions"][8]}",
                "{formation["positions"][9]}",
                "{formation["positions"][10]}"
            ]),
            useManager
        );
    }}

    createFormation(players: PlayerEntity[], useManager: boolean) {{
        return new Formation{formation["formationId"]}(players, useManager);
    }}
}}
'''
            f.write(code)

    with open("../FormationFactory.ts", "w") as f:
        nl = "\n"
        code = f'''import {{ FormationId }} from "../../types/formation-id";
import {{ PlayerEntity }} from "../PlayerEntity";
import {{ Formation }} from "./Formation";
{nl.join(list(map(lambda formation: 'import { Formation' + formation["formationId"] + ' } from "./concrete-formations/Formation' + formation["formationId"] + '";', formations)))}

export class FormationFactory {{
    public static createFormation(
        formationId: FormationId,
        players: PlayerEntity[],
        useManager: boolean
    ): Formation {{
        switch (formationId) {{
            {nl.join(list(map(lambda formation: 'case "' + formation["formationId"] + '": return new Formation' + formation["formationId"] + '(players, useManager);', formations)))}
            default:
                throw new Error(
                    `Unknown or unimplemented formation '${{formationId}}'`
                );
        }}
    }}
}}
'''
        f.write(code)


formations = [
    {
        "formationId": "3142",
        "positions": [
            "ST",
            "ST",
            "LM",
            "CM",
            "CDM",
            "CM",
            "RM",
            "CB",
            "CB",
            "CB",
            "GK",
        ]
    },
    {
        "formationId": "3412",
        "positions": [
            "ST",
            "ST",
            "LM",
            "CM",
            "CAM",
            "CM",
            "RM",
            "CB",
            "CB",
            "CB",
            "GK",
        ]
    },
    {
        "formationId": "3421",
        "positions": [
            "LF",
            "ST",
            "RF",
            "LM",
            "CM",
            "CM",
            "RM",
            "CB",
            "CB",
            "CB",
            "GK",
        ]
    },
    {
        "formationId": "343",
        "positions": [
            "LW",
            "ST",
            "RW",
            "LM",
            "CM",
            "CM",
            "RM",
            "CB",
            "CB",
            "CB",
            "GK",
        ]
    },
    {
        "formationId": "352",
        "positions": [
            "ST",
            "ST",
            "LM",
            "CDM",
            "CAM",
            "CDM",
            "RM",
            "CB",
            "CB",
            "CB",
            "GK",
        ]
    },
    {
        "formationId": "41212",
        "positions": [
            "ST",
            "ST",
            "LM",
            "CAM",
            "CDM",
            "RM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "41212_2",
        "positions": [
            "ST",
            "ST",
            "CM",
            "CAM",
            "CDM",
            "CM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "4132",
        "positions": [
            "ST",
            "ST",
            "LM",
            "CM",
            "CDM",
            "RM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "4141",
        "positions": [
            "ST",
            "LM",
            "CM",
            "CDM",
            "CM",
            "RM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "4222",
        "positions": [
            "ST",
            "ST",
            "CAM",
            "CDM",
            "CDM",
            "CAM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "4231",
        "positions": [
            "ST",
            "CAM",
            "CAM",
            "CAM",
            "CDM",
            "CDM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "4231_2",
        "positions": [
            "ST",
            "LM",
            "CAM",
            "RM",
            "CDM",
            "CDM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "424",
        "positions": [
            "ST",
            "ST",
            "LW",
            "RW",
            "CM",
            "CM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "4312",
        "positions": [
            "ST",
            "ST",
            "CM",
            "CAM",
            "CM",
            "CM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "4321",
        "positions": [
            "ST",
            "LF",
            "RF",
            "CM",
            "CM",
            "CM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "433",
        "positions": [
            "LW",
            "ST",
            "RW",
            "CM",
            "CM",
            "CM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "433_2",
        "positions": [
            "ST",
            "LW",
            "RW",
            "CM",
            "CDM",
            "CM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "433_3",
        "positions": [
            "ST",
            "LW",
            "RW",
            "CDM",
            "CM",
            "CDM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "433_4",
        "positions": [
            "ST",
            "LW",
            "RW",
            "CAM",
            "CM",
            "CM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "433_5",
        "positions": [
            "LW",
            "RW",
            "CF",
            "CM",
            "CM",
            "CDM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "4411",
        "positions": [
            "ST",
            "CF",
            "LM",
            "CM",
            "CM",
            "RM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "4411_2",
        "positions": [
            "ST",
            "CAM",
            "LM",
            "CM",
            "CM",
            "RM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "442",
        "positions": [
            "ST",
            "ST",
            "LM",
            "CM",
            "CM",
            "RM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "442_2",
        "positions": [
            "ST",
            "ST",
            "LM",
            "CDM",
            "CDM",
            "RM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "451",
        "positions": [
            "ST",
            "CAM",
            "CAM",
            "LM",
            "CM",
            "RM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "451_2",
        "positions": [
            "ST",
            "LM",
            "CM",
            "CM",
            "CM",
            "RM",
            "LB",
            "CB",
            "CB",
            "RB",
            "GK",
        ]
    },
    {
        "formationId": "5212",
        "positions": [
            "ST",
            "ST",
            "CAM",
            "CM",
            "CM",
            "LWB",
            "CB",
            "CB",
            "CB",
            "RWB",
            "GK",
        ]
    },
    {
        "formationId": "5221",
        "positions": [
            "ST",
            "LW",
            "RW",
            "CM",
            "CM",
            "LWB",
            "CB",
            "CB",
            "CB",
            "RWB",
            "GK",
        ]
    },
    {
        "formationId": "532",
        "positions": [
            "ST",
            "ST",
            "CM",
            "CM",
            "CM",
            "LWB",
            "CB",
            "CB",
            "CB",
            "RWB",
            "GK",
        ]
    },
    {
        "formationId": "541",
        "positions": [
            "ST",
            "LM",
            "CM",
            "CM",
            "RM",
            "LWB",
            "CB",
            "CB",
            "CB",
            "RWB",
            "GK",
        ]
    },
]


if __name__ == "__main__":
    main()
