import { OptionBase } from "chakra-react-select";

export interface SelectOption extends OptionBase {
    label: string;
    value: number;
    icon: React.ReactNode;
    leagueId?: number;
}
