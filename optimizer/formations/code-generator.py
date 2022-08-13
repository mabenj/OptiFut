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
        "formationId": "41212_2",
        "nodes": [
            {"nodeId": "LST", "links": ["RST", "CAM", "LCM"]},
            {"nodeId": "RST", "links": ["RCM", "CAM", "LST"]},
            {"nodeId": "LCM", "links": ["LST", "CAM", "CDM", "LB"]},
            {"nodeId": "CAM", "links": ["RST", "RCM", "CDM", "LCM", "LST"]},
            {"nodeId": "CDM", "links": ["CAM", "RCM", "RCB", "LCB", "LCM"]},
            {"nodeId": "RCM", "links": ["RB", "CDM", "CAM", "RST"]},
            {"nodeId": "LB", "links": ["LCM", "LCB"]},
            {"nodeId": "LCB", "links": ["CDM", "RCB", "GK", "LB"]},
            {"nodeId": "RCB", "links": ["RB", "GK", "LCB", "CDM"]},
            {"nodeId": "RB", "links": ["RCB", "RCM"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]},
        ]
    },
    {
        "formationId": "4132",
        "nodes": [
            {"nodeId": "LST", "links": ["RST", "CM", "LM"]},
            {"nodeId": "RST", "links": ["RM", "CM", "LST"]},
            {"nodeId": "LM", "links": ["LST", "CM", "CDM", "LB"]},
            {"nodeId": "CM", "links": ["RST", "RM", "CDM", "LM", "LST"]},
            {"nodeId": "CDM", "links": ["CM", "RM", "RCB", "LCB", "LM"]},
            {"nodeId": "RM", "links": ["RB", "CDM", "CM", "RST"]},
            {"nodeId": "LB", "links": ["LM", "LCB"]},
            {"nodeId": "LCB", "links": ["CDM", "RCB", "GK", "LB"]},
            {"nodeId": "RCB", "links": ["RB", "GK", "LCB", "CDM"]},
            {"nodeId": "RB", "links": ["RCB", "RM"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]},
        ]
    },
    {
        "formationId": "4141",
        "nodes": [
            {"nodeId": "ST", "links": ["RM", "RCM", "LCM", "LM"]},
            {"nodeId": "LM", "links": ["ST", "LCM", "LB"]},
            {"nodeId": "LCM", "links": ["ST", "RCM", "CDM", "LCB", "LM"]},
            {"nodeId": "CDM", "links": ["RCM", "RCB", "LCB", "LCM"]},
            {"nodeId": "RCM", "links": ["RM", "RCB", "CDM", "LCM", "ST"]},
            {"nodeId": "RM", "links": ["RB", "RCM", "ST"]},
            {"nodeId": "LB", "links": ["LM", "LCB"]},
            {"nodeId": "LCB", "links": ["LCM", "CDM", "RCB", "GK", "LB"]},
            {"nodeId": "RCB", "links": ["RCM", "RB", "GK", "LCB", "CDM"]},
            {"nodeId": "RB", "links": ["RM", "RCB"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]},
        ]
    },
    {
        "formationId": "4222",
        "nodes": [
            {"nodeId": "LST", "links": ["RST", "LCDM", "LCAM"]},
            {"nodeId": "RST", "links": ["RCAM", "RCDM", "LST"]},
            {"nodeId": "LCAM", "links": ["LST", "LCDM", "LB"]},
            {"nodeId": "LCDM", "links": ["LST", "RCDM", "LCB", "LCAM"]},
            {"nodeId": "RCDM", "links": ["RST", "RCAM", "RCB", "LCDM"]},
            {"nodeId": "RCAM", "links": ["RB", "RCDM", "RST"]},
            {"nodeId": "LB", "links": ["LCAM", "LCB"]},
            {"nodeId": "LCB", "links": ["LCDM", "RCB", "GK", "LB"]},
            {"nodeId": "RCB", "links": ["RCDM", "RB", "GK", "LCB"]},
            {"nodeId": "RB", "links": ["RCAM", "RCB"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]},
        ]
    },
    {
        "formationId": "4231",
        "nodes": [
            {"nodeId": "ST", "links": ["RCAM", "CAM", "LCAM"]},
            {"nodeId": "LCAM", "links": ["ST", "CAM", "LCDM"]},
            {"nodeId": "RCAM", "links": ["RCDM", "CAM", "ST"]},
            {"nodeId": "CAM", "links": ["ST", "RCAM", "RCDM", "LCDM", "LCAM"]},
            {"nodeId": "LCDM", "links": ["LCAM", "CAM", "LCB", "LB"]},
            {"nodeId": "RCDM", "links": ["RB", "RCB", "CAM", "RCAM"]},
            {"nodeId": "LB", "links": ["LCDM", "LCB"]},
            {"nodeId": "LCB", "links": ["RCB", "GK", "LB", "LCDM"]},
            {"nodeId": "RCB", "links": ["RCDM", "RB", "GK", "LCB"]},
            {"nodeId": "RB", "links": ["RCB", "RCDM"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]},
        ]
    },
    {
        "formationId": "4231_2",
        "nodes": [
            {"nodeId": "ST", "links": ["RM", "CAM", "LM"]},
            {"nodeId": "LM", "links": ["ST", "CAM", "LCDM", "LB"]},
            {"nodeId": "CAM", "links": ["ST", "RM", "RCDM", "LCDM", "LM"]},
            {"nodeId": "RM", "links": ["RB", "RCDM", "CAM", "ST"]},
            {"nodeId": "LCDM", "links": ["CAM", "LCB", "LB", "LM"]},
            {"nodeId": "RCDM", "links": ["RM", "RB", "RCB", "CAM"]},
            {"nodeId": "LB", "links": ["LM", "LCDM", "LCB"]},
            {"nodeId": "LCB", "links": ["LCDM", "RCB", "GK", "LB"]},
            {"nodeId": "RCB", "links": ["RCDM", "RB", "GK", "LCB"]},
            {"nodeId": "RB", "links": ["RM", "RCB", "RCDM"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]},
        ]
    },
    {
        "formationId": "424",
        "nodes": [
            {"nodeId": "LST", "links": ["RST", "LCM", "LW"]},
            {"nodeId": "RST", "links": ["RW", "RCM", "LST"]},
            {"nodeId": "LW", "links": ["LST", "LCM", "LB"]},
            {"nodeId": "RW", "links": ["RB", "RCM", "RST"]},
            {"nodeId": "LCM", "links": ["LST", "RCM", "LCB", "LB", "LW"]},
            {"nodeId": "RCM", "links": ["RST", "RW", "RB", "RCB", "LCM"]},
            {"nodeId": "LB", "links": ["LW", "LCM", "LCB"]},
            {"nodeId": "LCB", "links": ["LCM", "RCB", "GK", "LB"]},
            {"nodeId": "RCB", "links": ["RCM", "RB", "GK", "LCB"]},
            {"nodeId": "RB", "links": ["RW", "RCB", "RCM"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]},
        ]
    },
    {
        "formationId": "4312",
        "nodes": [
            {"nodeId": "LST", "links": ["RST", "CAM", "LCM"]},
            {"nodeId": "RST", "links": ["RCM", "CAM", "LST"]},
            {"nodeId": "LCM", "links": ["LST", "CM", "LCB", "LB"]},
            {"nodeId": "CAM", "links": ["RST", "CM", "LST"]},
            {"nodeId": "CM", "links": ["CAM", "RCM", "RCB", "LCB", "LCM"]},
            {"nodeId": "RCM", "links": ["RB", "RCB", "CM", "RST"]},
            {"nodeId": "LB", "links": ["LCM", "LCB"]},
            {"nodeId": "LCB", "links": ["CM", "RCB", "GK", "LB", "LCM"]},
            {"nodeId": "RCB", "links": ["RCM", "RB", "GK", "LCB", "CM"]},
            {"nodeId": "RB", "links": ["RCM", "RCB"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]},
        ]
    },
    {
        "formationId": "4321",
        "nodes": [
            {"nodeId": "ST", "links": ["RF", "LF"]},
            {"nodeId": "LF", "links": ["ST", "CM", "LCM"]},
            {"nodeId": "RF", "links": ["RCM", "CM", "ST"]},
            {"nodeId": "LCM", "links": ["LF", "CM", "LCB", "LB"]},
            {"nodeId": "CM", "links": ["RF", "RCM", "LCM", "LF"]},
            {"nodeId": "RCM", "links": ["RB", "RCB", "CM", "RF"]},
            {"nodeId": "LB", "links": ["LCM", "LCB"]},
            {"nodeId": "LCB", "links": ["RCB", "GK", "LB", "LCM"]},
            {"nodeId": "RCB", "links": ["RCM", "RB", "GK", "LCB"]},
            {"nodeId": "RB", "links": ["RCB", "RCM"]},
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
        "formationId": "433_2",
        "nodes": [
            {"nodeId": "ST", "links": ["RW", "RCM", "LCM", "LW"]},
            {"nodeId": "LW", "links": ["ST", "LCM"]},
            {"nodeId": "RW", "links": ["RCM", "ST"]},
            {"nodeId": "LCM", "links": ["LW", "ST", "RCM", "CDM", "LB"]},
            {"nodeId": "CDM", "links": ["RCM", "RCB", "LCB", "LCM"]},
            {"nodeId": "RCM", "links": ["RB", "CDM", "LCM", "ST", "RW"]},
            {"nodeId": "LB", "links": ["LCM", "LCB"]},
            {"nodeId": "LCB", "links": ["CDM", "RCB", "GK", "LB"]},
            {"nodeId": "RCB", "links": ["RB", "GK", "LCB", "CDM"]},
            {"nodeId": "RB", "links": ["RCB", "RCM"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]},
        ]
    },
    {
        "formationId": "433_3",
        "nodes": [
            {"nodeId": "ST", "links": ["RW", "CM", "LW"]},
            {"nodeId": "LW", "links": ["ST", "LCDM"]},
            {"nodeId": "RW", "links": ["RCDM", "ST"]},
            {"nodeId": "LCDM", "links": ["LW", "CM", "LCB", "LB"]},
            {"nodeId": "CM", "links": ["ST", "RCDM", "LCDM"]},
            {"nodeId": "RCDM", "links": ["RB", "RCB", "CM", "RW"]},
            {"nodeId": "LB", "links": ["LCDM", "LCB"]},
            {"nodeId": "LCB", "links": ["RCB", "GK", "LB", "LCDM"]},
            {"nodeId": "RCB", "links": ["RCDM", "RB", "GK", "LCB"]},
            {"nodeId": "RB", "links": ["RCB", "RCDM"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]},
        ]
    },
    {
        "formationId": "433_4",
        "nodes": [
            {"nodeId": "ST", "links": ["RW", "CAM", "LW"]},
            {"nodeId": "LW", "links": ["ST", "LCM", "LB"]},
            {"nodeId": "RW", "links": ["RB", "RCM", "ST"]},
            {"nodeId": "CAM", "links": ["ST", "RCM", "LCM"]},
            {"nodeId": "LCM", "links": ["LW", "CAM", "LCB", "LB"]},
            {"nodeId": "RCM", "links": ["RB", "RCB", "CAM", "RW"]},
            {"nodeId": "LB", "links": ["LW", "LCM", "LCB"]},
            {"nodeId": "LCB", "links": ["RCB", "GK", "LB", "LCM"]},
            {"nodeId": "RCB", "links": ["RCM", "RB", "GK", "LCB"]},
            {"nodeId": "RB", "links": ["RCB", "RCM", "RW"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]},
        ]
    },
    {
        "formationId": "433_5",
        "nodes": [
            {"nodeId": "LW", "links": ["CF", "LCM", "LB"]},
            {"nodeId": "RW", "links": ["RB", "RCM", "CF"]},
            {"nodeId": "CF", "links": ["RW", "RCM", "LCM", "LW"]},
            {"nodeId": "LCM", "links": ["CF", "CDM", "LB", "LW"]},
            {"nodeId": "RCM", "links": ["RW", "RB", "CDM", "CF"]},
            {"nodeId": "CDM", "links": ["RCM", "RCB", "LCB", "LCM"]},
            {"nodeId": "LB", "links": ["LW", "LCM", "LCB"]},
            {"nodeId": "LCB", "links": ["CDM", "RCB", "GK", "LB"]},
            {"nodeId": "RCB", "links": ["RB", "GK", "LCB", "CDM"]},
            {"nodeId": "RB", "links": ["RCB", "RCM", "RW"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]},
        ]
    },
    {
        "formationId": "4411",
        "nodes": [
            {"nodeId": "ST", "links": ["RM", "CF", "LM"]},
            {"nodeId": "CF", "links": ["ST", "RCM", "LCM"]},
            {"nodeId": "LM", "links": ["ST", "LCM", "LB"]},
            {"nodeId": "LCM", "links": ["CF", "RCM", "LCB", "LM"]},
            {"nodeId": "RCM", "links": ["RM", "RCB", "LCM", "CF"]},
            {"nodeId": "RM", "links": ["RB", "RCM", "ST"]},
            {"nodeId": "LB", "links": ["LM", "LCB"]},
            {"nodeId": "LCB", "links": ["LCM", "RCB", "GK", "LB"]},
            {"nodeId": "RCB", "links": ["RCM", "RB", "GK", "LCB"]},
            {"nodeId": "RB", "links": ["RM", "RCB"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]},
        ]
    },
    {
        "formationId": "4411_2",
        "nodes": [
            {"nodeId": "ST", "links": ["RM", "CAM", "LM"]},
            {"nodeId": "CAM", "links": ["ST", "RCM", "LCM"]},
            {"nodeId": "LM", "links": ["ST", "LCM", "LB"]},
            {"nodeId": "LCM", "links": ["CAM", "RCM", "LCB", "LM"]},
            {"nodeId": "RCM", "links": ["RM", "RCB", "LCM", "CAM"]},
            {"nodeId": "RM", "links": ["RB", "RCM", "ST"]},
            {"nodeId": "LB", "links": ["LM", "LCB"]},
            {"nodeId": "LCB", "links": ["LCM", "RCB", "GK", "LB"]},
            {"nodeId": "RCB", "links": ["RCM", "RB", "GK", "LCB"]},
            {"nodeId": "RB", "links": ["RM", "RCB"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]},
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
    },
    {
        "formationId": "442_2",
        "nodes": [
            {"nodeId": "LST", "links": ["RST", "LCDM", "LM"]},
            {"nodeId": "RST", "links": ["RM", "RCDM", "LST"]},
            {"nodeId": "LM", "links": ["ST", "LCDM", "LB"]},
            {"nodeId": "LCDM", "links": ["RCDM", "LCB", "LM", "LST"]},
            {"nodeId": "RCDM", "links": ["RST", "RM", "RCB", "LCDM"]},
            {"nodeId": "RM", "links": ["RB", "RCDM", "RST"]},
            {"nodeId": "LB", "links": ["LM", "LCB"]},
            {"nodeId": "LCB", "links": ["LCDM", "RCB", "GK", "LB"]},
            {"nodeId": "RCB", "links": ["RB", "GK", "LCB", "RCDM"]},
            {"nodeId": "RB", "links": ["RCB", "RM"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]},
        ]
    },
    {
        "formationId": "451",
        "nodes": [
            {"nodeId": "ST", "links": ["RCAM", "LCAM"]},
            {"nodeId": "LCAM", "links": ["ST", "RCAM", "CM", "LM"]},
            {"nodeId": "RCAM", "links": ["RM", "CM", "LCAM", "ST"]},
            {"nodeId": "LM", "links": ["LCAM", "LB"]},
            {"nodeId": "CM", "links": ["RCAM", "RCB", "LCB", "LCAM"]},
            {"nodeId": "RM", "links": ["RB", "RCAM"]},
            {"nodeId": "LB", "links": ["LM", "LCB"]},
            {"nodeId": "LCB", "links": ["CM", "RCB", "GK", "LB"]},
            {"nodeId": "RCB", "links": ["RB", "GK", "LCB", "CM"]},
            {"nodeId": "RB", "links": ["RM", "RCB"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]},
        ]
    },
    {
        "formationId": "451_2",
        "nodes": [
            {"nodeId": "ST", "links": ["RM", "CM", "LM"]},
            {"nodeId": "LM", "links": ["ST", "LCM", "LB"]},
            {"nodeId": "LCM", "links": ["CM", "LCB", "LB", "LM"]},
            {"nodeId": "CM", "links": ["ST", "RCM", "RCB", "LCB", "LCM"]},
            {"nodeId": "RCM", "links": ["RM", "RB", "RCB", "CM"]},
            {"nodeId": "RM", "links": ["RB", "RCM", "ST"]},
            {"nodeId": "LB", "links": ["LM", "LCM", "LCB"]},
            {"nodeId": "LCB", "links": ["LCM", "CM", "RCB", "GK", "LB"]},
            {"nodeId": "RCB", "links": ["RCM", "RB", "GK", "LCB", "CM"]},
            {"nodeId": "RB", "links": ["RM", "RCB", "RCM"]},
            {"nodeId": "GK", "links": ["LCB", "RCB"]},
        ]
    },
    {
        "formationId": "5212",
        "nodes": [
            {"nodeId": "LST", "links": ["RST", "CAM", "LCM"]},
            {"nodeId": "RST", "links": ["RCM", "CAM", "LST"]},
            {"nodeId": "CAM", "links": ["RST", "RCM", "LCM", "LST"]},
            {"nodeId": "LCM", "links": ["LST", "CAM", "RCM", "CB", "LWB"]},
            {"nodeId": "RCM", "links": ["RST", "RWB", "CB", "LCM", "CAM"]},
            {"nodeId": "LWB", "links": ["LCM", "LCB"]},
            {"nodeId": "LCB", "links": ["CB", "GK", "LWB"]},
            {"nodeId": "CB", "links": ["RCM", "RCB", "GK", "LCB", "LCM"]},
            {"nodeId": "RCB", "links": ["RWB", "GK", "CB"]},
            {"nodeId": "RWB", "links": ["RCB", "RCM"]},
            {"nodeId": "GK", "links": ["LCB", "CB", "RCB"]},
        ]
    },
    {
        "formationId": "5221",
        "nodes": [
            {"nodeId": "ST", "links": ["RW", "RCM", "LCM", "LW"]},
            {"nodeId": "LW", "links": ["ST", "LCM", "LWB"]},
            {"nodeId": "RW", "links": ["RWB", "RCM", "ST"]},
            {"nodeId": "LCM", "links": ["ST", "RCM", "CB", "LWB", "LW"]},
            {"nodeId": "RCM", "links": ["RW", "RWB", "CB", "LCM", "ST"]},
            {"nodeId": "LWB", "links": ["LW", "LCM", "LCB"]},
            {"nodeId": "LCB", "links": ["CB", "GK", "LWB"]},
            {"nodeId": "CB", "links": ["RCM", "RCB", "GK", "LCB", "LCM"]},
            {"nodeId": "RCB", "links": ["RWB", "GK", "CB"]},
            {"nodeId": "RWB", "links": ["RCB", "RCM", "RW"]},
            {"nodeId": "GK", "links": ["LCB", "CB", "RCB"]},
        ]
    },
    {
        "formationId": "532",
        "nodes": [
            {"nodeId": "LST", "links": ["RST", "CM", "LCM"]},
            {"nodeId": "RST", "links": ["RCM", "CM", "LST"]},
            {"nodeId": "LCM", "links": ["LST", "CM", "LCB", "LWB"]},
            {"nodeId": "CM", "links": ["RST", "RCM", "CB", "LCM", "LST"]},
            {"nodeId": "RCM", "links": ["RWB", "RCB", "CM", "RST"]},
            {"nodeId": "LWB", "links": ["LCM", "LCB"]},
            {"nodeId": "LCB", "links": ["CB", "GK", "LWB", "LCM"]},
            {"nodeId": "CB", "links": ["CM", "RCB", "GK", "LCB"]},
            {"nodeId": "RCB", "links": ["RCM", "RWB", "GK", "CB"]},
            {"nodeId": "RWB", "links": ["RCB", "RCM"]},
            {"nodeId": "GK", "links": ["LCB", "CB", "RCB"]},
        ]
    },
    {
        "formationId": "541",
        "nodes": [
            {"nodeId": "ST", "links": ["RM", "RCM", "LCM", "LM"]},
            {"nodeId": "LM", "links": ["ST", "LCM", "LWB"]},
            {"nodeId": "LCM", "links": ["ST", "RCM", "CB", "LWB", "LM"]},
            {"nodeId": "RCM", "links": ["RM", "RWB", "CB", "LCM", "ST"]},
            {"nodeId": "RM", "links": ["RWB", "RCM", "ST"]},
            {"nodeId": "LWB", "links": ["LM", "LCM", "LCB"]},
            {"nodeId": "LCB", "links": ["CB", "GK", "LWB"]},
            {"nodeId": "CB", "links": ["RCM", "RCB", "GK", "LCB", "LCM"]},
            {"nodeId": "RCB", "links": ["RWB", "GK", "CB"]},
            {"nodeId": "RWB", "links": ["RCB", "RCM", "RM"]},
            {"nodeId": "GK", "links": ["LCB", "CB", "RCB"]},
        ]
    },
]


if __name__ == "__main__":
    main()
