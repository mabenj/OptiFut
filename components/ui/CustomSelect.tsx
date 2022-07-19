import { Box, Flex } from "@chakra-ui/react";
import {
    chakraComponents,
    OptionProps,
    Select,
    ValueContainerProps
} from "chakra-react-select";
import Highlighter from "react-highlight-words";
import { SelectOption } from "../../types/select-option.interface";
import { removeDiacritics } from "../../utils/utils";

let inputValue = "";

interface CustomSelectProps {
    id: string;
    name: string;
    options: any[];
    value: SelectOption | null;
    onChange: (newValue: SelectOption) => any;
    isDisabled?: boolean;
    filterOption?: (option: SelectOption, inputValue: string) => boolean;
    placeholder?: string;
    noOptionsMessage?: string;
}

export default function CustomSelect({
    id,
    name,
    options,
    value,
    onChange,
    isDisabled,
    filterOption,
    placeholder,
    noOptionsMessage
}: CustomSelectProps) {
    return (
        <Select
            useBasicStyles={true}
            hasStickyGroupHeaders={true}
            blurInputOnSelect
            id={id}
            name={name}
            placeholder={placeholder}
            noOptionsMessage={() => noOptionsMessage}
            options={options}
            value={value}
            onChange={(newVal) => onChange(newVal as SelectOption)}
            components={customSelectComponents}
            selectedOptionColor="green"
            isDisabled={isDisabled}
            isClearable
            filterOption={
                filterOption
                    ? (option, inputValue) =>
                          filterOption(option.data, inputValue)
                    : undefined
            }
            onInputChange={(value) => (inputValue = value)}
            formatOptionLabel={(option) => (
                <Highlighter
                    searchWords={[inputValue]}
                    textToHighlight={option.label}
                    highlightTag="strong"
                    sanitize={removeDiacritics}
                />
            )}
            minMenuHeight={300}
            maxMenuHeight={400}
            menuPlacement="auto"
        />
    );
}

const customSelectComponents = {
    Option: ({ children, ...props }: OptionProps<SelectOption, false>) => {
        return (
            <chakraComponents.Option {...props}>
                <Box mr={4}>{props.data.icon}</Box>
                {children}
            </chakraComponents.Option>
        );
    },
    ValueContainer: ({
        children,
        ...props
    }: ValueContainerProps<SelectOption>) => {
        const { getValue, hasValue } = props;
        const icon = getValue().at(0)?.icon || "";

        if (!hasValue) {
            return (
                <chakraComponents.ValueContainer {...props}>
                    {children}
                </chakraComponents.ValueContainer>
            );
        }

        return (
            <>
                <Flex alignItems="center" justifyContent="center" p={1} ml={2}>
                    {icon}
                </Flex>
                <chakraComponents.ValueContainer {...props}>
                    {children}
                </chakraComponents.ValueContainer>
            </>
        );
    }
};
