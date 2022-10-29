import { Select } from "chakra-react-select";
import Highlighter from "react-highlight-words";
import { SelectOption } from "../../types/select-option.interface";
import { removeDiacritics } from "../../utils/utils";

interface CustomMultiSelectOption{
    label: string;
    value: any;
}

interface CustomMultiSelectProps {
    id: string;
    name: string;
    options: CustomMultiSelectOption[];
    value: CustomMultiSelectOption[] | null;
    onChange: (newValue: CustomMultiSelectOption[]) => any;
    isDisabled?: boolean;
    placeholder?: string;
    noOptionsMessage?: string;
}

let inputValue = ""

export default function CustomMultiSelect({
    id,
    name,
    placeholder,
    options,
    noOptionsMessage,
    value,onChange,isDisabled
}: CustomMultiSelectProps) {
    return (
        <Select
            useBasicStyles={true}
            isMulti
            blurInputOnSelect
            id={id}
            name={name}
            placeholder={placeholder}
            noOptionsMessage={() => noOptionsMessage}
            options={options}
            value={value}
            onChange={(newVal) => onChange(newVal as SelectOption[])}
            selectedOptionColor="green"
            isDisabled={isDisabled}
            isClearable
            minMenuHeight={300}
            maxMenuHeight={400}
            menuPlacement="auto"
            onInputChange={(value) => (inputValue = value)}
            formatOptionLabel={(option) => (
                <Highlighter
                    searchWords={[inputValue]}
                    textToHighlight={option.label}
                    highlightTag="strong"
                    sanitize={removeDiacritics}
                />
            )}
        />
    );
}
