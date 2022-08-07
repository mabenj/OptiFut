def main():
    for formation in formations:
        with open(f"Formation{formation['formationId']}.ts", "w") as f:
            code = f'''import {{ FormationId }} from "../../types/formation-id";
import {{ PlayerEntity }} from "../PlayerEntity";
import {{ PositionNode }} from "../PositionNode";
import {{ Formation }} from "./Formation";

export class Formation{formation["formationId"]} extends Formation {{
    formationId: FormationId = "{formation["formationId"]}";

    /**
     *
     * @param players Order: {', '.join(list(map(lambda node: node["nodeId"], formation["nodes"])))}
     */
    constructor(players: PlayerEntity[], useManager: boolean) {{
        const nodes = PositionNode.createForFormation(players, {{
            {formation["nodes"][0]["nodeId"]}: [{', '.join(list(map(lambda link: '"' + link + '"' , formation["nodes"][0]["links"])))}],
            {formation["nodes"][1]["nodeId"]}: [{', '.join(list(map(lambda link: '"' + link + '"' , formation["nodes"][1]["links"])))}],
            {formation["nodes"][2]["nodeId"]}: [{', '.join(list(map(lambda link: '"' + link + '"' , formation["nodes"][2]["links"])))}],
            {formation["nodes"][3]["nodeId"]}: [{', '.join(list(map(lambda link: '"' + link + '"' , formation["nodes"][3]["links"])))}],
            {formation["nodes"][4]["nodeId"]}: [{', '.join(list(map(lambda link: '"' + link + '"' , formation["nodes"][4]["links"])))}],
            {formation["nodes"][5]["nodeId"]}: [{', '.join(list(map(lambda link: '"' + link + '"' , formation["nodes"][5]["links"])))}],
            {formation["nodes"][6]["nodeId"]}: [{', '.join(list(map(lambda link: '"' + link + '"' , formation["nodes"][6]["links"])))}],
            {formation["nodes"][7]["nodeId"]}: [{', '.join(list(map(lambda link: '"' + link + '"' , formation["nodes"][7]["links"])))}],
            {formation["nodes"][8]["nodeId"]}: [{', '.join(list(map(lambda link: '"' + link + '"' , formation["nodes"][8]["links"])))}],
            {formation["nodes"][9]["nodeId"]}: [{', '.join(list(map(lambda link: '"' + link + '"' , formation["nodes"][9]["links"])))}],
            {formation["nodes"][10]["nodeId"]}: [{', '.join(list(map(lambda link: '"' + link + '"' , formation["nodes"][10]["links"])))}]
        }});
        super(nodes, useManager);
    }}

    createFormation(players: PlayerEntity[], useManager: boolean): Formation {{
        return new Formation{formation["formationId"]}(players, useManager);
    }}
}}
'''
            f.write(code)

    with open("FormationFactory.ts", "w") as f:
        nl = "\n"
        code = f'''import {{ FormationId }} from "../../types/formation-id";
import {{ PlayerEntity }} from "../PlayerEntity";
{nl.join(list(map(lambda formation: 'import { Formation' + formation["formationId"] + ' } from "./Formation' + formation["formationId"] + '";', formations)))}

export class FormationFactory {{
    public static createFormation(
        formationId: FormationId,
        players: PlayerEntity[],
        useManager: boolean
    ) {{
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
        "nodes": [
            {"nodeId": "LST", "links": ["RST", "LCM", "LM"]},
            {"nodeId": "RST", "links": ["RM", "RCM", "LST"]},
            {"nodeId": "LM", "links": ["LST", "LCM", "LCB"]},
            {"nodeId": "LCM", "links": ["LST", "CDM", "LM"]},
            {"nodeId": "CDM", "links": ["RCM", "RCB", "LCB", "LCM"]},
            {"nodeId": "RCM", "links": ["RST", "RM", "CDM"]},
            {"nodeId": "RM", "links": ["RCB", "RCM", "RST"]},
            {"nodeId": "LCB", "links": ["CDM", "CB", "GK", "LM"]},
            {"nodeId": "CB", "links": ["CDM", "RCB", "GK", "LCB"]},
            {"nodeId": "RCB", "links": ["RM", "GK", "CB", "CDM"]},
            {"nodeId": "GK", "links": ["CB", "RCB", "LCB"]},
        ]
    },
    {
        "formationId": "3412",
        "nodes": [
            {"nodeId": "LST", "links": ["RST", "CAM", "LM"]},
            {"nodeId": "RST", "links": ["RM", "CAM", "LST"]},
            {"nodeId": "LM", "links": ["LST", "LCM", "LCB"]},
            {"nodeId": "LCM", "links": ["CAM", "RCM", "CB", "LM"]},
            {"nodeId": "CAM", "links": ["RST", "RCM", "LCM", "LST"]},
            {"nodeId": "RCM", "links": ["RM", "CB", "LCM", "CAM"]},
            {"nodeId": "RM", "links": ["RCB", "RCM", "RST"]},
            {"nodeId": "LCB", "links": ["CB", "GK", "LM"]},
            {"nodeId": "CB", "links": ["RCB", "GK", "LCB", "LCM", "RCM"]},
            {"nodeId": "RCB", "links": ["RM", "GK", "CB"]},
            {"nodeId": "GK", "links": ["LCB", "CB", "RCB"]},
        ]
    },
    {
        "formationId": "3421",
        "nodes": [
            {"nodeId": "LF", "links": ["ST", "LCM", "LM"]},
            {"nodeId": "ST", "links": ["RF", "LF"]},
            {"nodeId": "RF", "links": ["RM", "RCM", "ST"]},
            {"nodeId": "LM", "links": ["LF", "LCM", "LCB"]},
            {"nodeId": "LCM", "links": ["RCM", "CB", "LM", "LF"]},
            {"nodeId": "RCM", "links": ["RF", "RM", "CB", "LCM"]},
            {"nodeId": "RM", "links": ["RCB", "RCM", "RF"]},
            {"nodeId": "LCB", "links": ["CB", "GK", "LM"]},
            {"nodeId": "CB", "links": ["RCB", "GK", "LCB", "LCM", "RCM"]},
            {"nodeId": "RCB", "links": ["RM", "GK", "CB"]},
            {"nodeId": "GK", "links": ["LCB", "CB", "RCB"]},
        ]
    },
    {
        "formationId": "343",
        "nodes": [
            {"nodeId": "LW", "links": ["ST", "LM"]},
            {"nodeId": "ST", "links": ["RW", "RCM", "LCM", "LW"]},
            {"nodeId": "RW", "links": ["RM", "ST"]},
            {"nodeId": "LM", "links": ["LW", "LCM", "LCB"]},
            {"nodeId": "LCM", "links": ["ST", "RCM", "CB", "LM"]},
            {"nodeId": "RCM", "links": ["RM", "CB", "LCM", "ST"]},
            {"nodeId": "RM", "links": ["RCB", "RCM", "RW"]},
            {"nodeId": "LCB", "links": ["CB", "GK", "LM"]},
            {"nodeId": "CB", "links": ["RCM", "RCB", "GK", "LCB", "LCM"]},
            {"nodeId": "RCB", "links": ["RM", "GK", "CB"]},
            {"nodeId": "GK", "links": ["CB", "RCB", "LCB"]},
        ]
    },
    {
        "formationId": "352",
        "nodes": [
            {"nodeId": "LST", "links": ["RST", "CAM", "LM"]},
            {"nodeId": "RST", "links": ["RM", "CAM", "LST"]},
            {"nodeId": "LM", "links": ["LST", "LCDM", "LCB"]},
            {"nodeId": "LCDM", "links": ["CAM", "RCDM", "CB", "LCB", "LM"]},
            {"nodeId": "CAM", "links": ["RST", "RCDM", "LCDM", "LST"]},
            {"nodeId": "RCDM", "links": ["RM", "RCB", "CB", "LCDM", "CAM"]},
            {"nodeId": "RM", "links": ["RCB", "RCDM", "RST"]},
            {"nodeId": "LCB", "links": ["LCDM", "CB", "GK", "LM"]},
            {"nodeId": "CB", "links": ["RCDM", "RCB", "GK", "LCB", "LCDM"]},
            {"nodeId": "RCB", "links": ["RM", "GK", "CB", "RCDM"]},
            {"nodeId": "GK", "links": ["CB", "RCB", "LCB"]},
        ]
    },
    {
        "formationId": "41212",
        "nodes": [
            {"nodeId": "LST", "links": ["RST", "CAM", "LM"]},
            {"nodeId": "RST", "links": ["RM", "CAM", "LST"]},
            {"nodeId": "LM", "links": ["LST", "CAM", "CDM", "LB"]},
            {"nodeId": "CAM", "links": ["RST", "RM", "CDM", "LM"]},
            {"nodeId": "CDM", "links": ["CAM", "RM", "RCB", "LCB", "LM"]},
            {"nodeId": "RM", "links": ["RB", "CDM", "CAM", "RST"]},
            {"nodeId": "LB", "links": ["LM", "LCB"]},
            {"nodeId": "LCB", "links": ["CDM", "RCB", "GK", "LB"]},
            {"nodeId": "RCB", "links": ["RB", "GK", "LCB", "CDM"]},
            {"nodeId": "RB", "links": ["RCB", "RM"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]},
        ]
    },
    {
        "formationId": "433",
        "nodes": [
            {"nodeId": "LW", "links": ["ST", "LCM"]},
            {"nodeId": "ST", "links": ["LW", "RW", "CM"]},
            {"nodeId": "RW", "links": ["ST", "RCM"]},
            {"nodeId": "LCM", "links": ["LW", "CM", "LB"]},
            {"nodeId": "CM", "links": ["LCM", "ST", "RCM", "LCB", "RCB"]},
            {"nodeId": "RCM", "links": ["CM", "RW", "RB"]},
            {"nodeId": "LB", "links": ["LCM", "LCB"]},
            {"nodeId": "LCB", "links": ["LB", "CM", "RCB", "GK"]},
            {"nodeId": "RCB", "links": ["LCB", "CM", "RB", "GK"]},
            {"nodeId": "RB", "links": ["RCB", "RCM"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]}
        ]
    },
    {
        "formationId": "442",
        "nodes": [
            {"nodeId": "LST", "links": ["RST", "LCM", "LM"]},
            {"nodeId": "RST", "links": ["LST", "RM", "RCM"]},
            {"nodeId": "LM", "links": ["LST", "LCM", "LB"]},
            {"nodeId": "LCM", "links": ["LST", "RCM", "LCB", "LM"]},
            {"nodeId": "RCM", "links": ["RST", "RM", "RCB", "LCM"]},
            {"nodeId": "RM", "links": ["RST", "RB", "RCM"]},
            {"nodeId": "LB", "links": ["LM", "LCB"]},
            {"nodeId": "LCB", "links": ["LCM", "RCB", "GK", "LB"]},
            {"nodeId": "RCB", "links": ["RCM", "RB", "GK", "LCB"]},
            {"nodeId": "RB", "links": ["RM", "RCB"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]}
        ]
    }
]


if __name__ == "__main__":
    main()
