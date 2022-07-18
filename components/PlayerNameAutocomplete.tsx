import { Box, Input, Skeleton, useBoolean } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { MouseEvent, useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDebounce } from "../hooks/useDebounce";
import { db, Player } from "../utils/db";
import { getRandomInt, range, removeDiacritics } from "../utils/utils";

const QUERY_DEBOUNCE_MS = 200;
const SUGGESTIONS_LIMIT = 40;

interface AutocompleteInputProps {
    value: string;
    onChange: (newValue: string) => any;
    onPlayerSelected: (player: Player) => any;
    id: string;
    name: string;
    placeholder?: string;
}

export default function PlayerNameAutocomplete({
    value,
    onChange,
    onPlayerSelected,
    id,
    name,
    placeholder
}: AutocompleteInputProps) {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, QUERY_DEBOUNCE_MS);
    const [showSuggestions, setShowSuggestions] = useBoolean(false);
    const [isQuerying, setIsQuerying] = useBoolean(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const suggestions =
        useLiveQuery(() => {
            if (debouncedQuery.length < 2) {
                return [];
            }
            const re = new RegExp(
                String.raw`\b${removeDiacritics(debouncedQuery)}`,
                "i"
            );
            console.time();
            const result = db.players
                .filter(
                    (player) =>
                        re.test(removeDiacritics(player.playerName)) ||
                        re.test(removeDiacritics(player.commonName))
                )
                .limit(SUGGESTIONS_LIMIT)
                .toArray();
            console.timeEnd();
            return result;
        }, [debouncedQuery]) || [];

    useEffect(() => setIsQuerying.off(), [setIsQuerying, suggestions]);

    const handleChange = (inputValue: string) => {
        onChange(inputValue);
        setQuery(inputValue);
        setIsQuerying.on();
    };

    const handleSelectSuggestion = (suggestion: Player) => {
        onPlayerSelected(suggestion);
        setShowSuggestions.off();
    };

    return (
        <>
            <Input
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                autoComplete="off"
                onFocus={setShowSuggestions.on}
                onBlur={setShowSuggestions.off}
            />
            {showSuggestions && (suggestions.length > 0 || isQuerying) && (
                <Box
                    mt={2}
                    position="absolute"
                    top="100%"
                    left={0}
                    right={0}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    boxShadow="xs"
                    bg="white"
                    zIndex={9999}
                    maxHeight="350px"
                    overflowY="auto">
                    {!isQuerying &&
                        suggestions.map((suggestion) => (
                            <Suggestion
                                key={suggestion.id}
                                onMouseDown={() =>
                                    handleSelectSuggestion(suggestion)
                                }>
                                <Highlighter
                                    searchWords={[debouncedQuery]}
                                    textToHighlight={suggestion.playerName}
                                    highlightTag="strong"
                                    sanitize={removeDiacritics}
                                />
                            </Suggestion>
                        ))}
                    {isQuerying &&
                        range(0, SUGGESTIONS_LIMIT).map((i) => (
                            <SkeletonSuggestion
                                key={"skeletonSuggestion_" + i}
                            />
                        ))}
                </Box>
            )}
        </>
    );
}

interface SuggestionProps {
    onMouseDown?: (e: MouseEvent) => any;
    children: React.ReactNode;
}

const Suggestion = ({ onMouseDown, children }: SuggestionProps) => {
    return (
        <Box
            px={5}
            py={2}
            cursor="pointer"
            onMouseDown={(e) => onMouseDown && onMouseDown(e)}
            _hover={{ background: "gray.100" }}>
            {children}
        </Box>
    );
};

const SkeletonSuggestion = () => {
    const MIN_WIDTH_PERCENT = 50;
    const MAX_WIDTH_PERCENT = 80;
    return (
        <Suggestion>
            <Skeleton
                h="20px"
                my={1}
                w={`${getRandomInt(MIN_WIDTH_PERCENT, MAX_WIDTH_PERCENT)}%`}
            />
        </Suggestion>
    );
};
