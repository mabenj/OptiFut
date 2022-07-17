import { Box, Input, useBoolean } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import { useDebounce } from "../hooks/useDebounce";
import { db, Player } from "../utils/db";
import { removeDiacritics } from "../utils/utils";

const QUERY_DEBOUNCE_MS = 200;

interface AutocompleteInputProps {
    value: string;
    onChange: (newValue: string) => any;
    onPlayerSelected: (player: Player) => any;
    id: string;
    name: string;
    placeholder?: string;
}

export default function PlayerNameAutocompleteInput({
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
                .limit(100)
                .toArray();
            console.timeEnd();
            return result;
        }, [debouncedQuery]) || [];

    const handleChange = (inputValue: string) => {
        onChange(inputValue);
        setQuery(inputValue);
    };

    const handleSelectSuggestion = (suggestion: Player) => {
        // handleChange(suggestion.playerName);
        console.log("select suggestion");
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
            />
            {suggestions.length > 0 && showSuggestions && (
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
                    {suggestions.map((suggestion) => (
                        <Box
                            key={suggestion.id}
                            px={5}
                            py={2}
                            cursor="pointer"
                            onMouseDown={() =>
                                handleSelectSuggestion(suggestion)
                            }
                            _hover={{ background: "gray.100" }}>
                            <Highlighter
                                searchWords={[debouncedQuery]}
                                textToHighlight={suggestion.playerName}
                                highlightTag="strong"
                                sanitize={removeDiacritics}
                            />
                        </Box>
                    ))}
                </Box>
            )}
        </>
    );
}
