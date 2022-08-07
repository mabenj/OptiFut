import { PositionNodeId } from "./position-node-id.type";

export type NodeLinkMap = { [nodeId in PositionNodeId]?: PositionNodeId[] };
