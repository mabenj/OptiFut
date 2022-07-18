import { SearchIcon } from "@chakra-ui/icons";
import {
    Box,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Skeleton,
    useBoolean
} from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { NationFlagRatio, SelectImageWidth } from "../data/constants";
import { useDebounce } from "../hooks/useDebounce";
import { useNextLiveQuery } from "../hooks/useNextLiveQuery";
import { db, Player } from "../utils/db";
import { getRandomInt, range, removeDiacritics } from "../utils/utils";
import CustomImage from "./ui/CustomImage";

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
    const [suggestionIndex, setSuggestionIndex] = useState(-1);

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
            const result = db.players
                .orderBy("rating")
                .filter(
                    (player) =>
                        re.test(removeDiacritics(player.playerName)) ||
                        re.test(removeDiacritics(player.commonName))
                )
                .reverse()
                .limit(SUGGESTIONS_LIMIT)
                .toArray();
            return result;
        }, [debouncedQuery]) || [];

    useEffect(() => {
        setIsQuerying.off();
        setSuggestionIndex(-1);
    }, [setIsQuerying, suggestions, showSuggestions]);

    const handleChange = (inputValue: string) => {
        onChange(inputValue);
        setQuery(inputValue);
        setIsQuerying.on();
        setShowSuggestions.on();
    };

    const handleSelectSuggestion = (suggestion: Player) => {
        onPlayerSelected(suggestion);
        setShowSuggestions.off();
    };

    const handleInputKeyPress = (e: KeyboardEvent) => {
        if (!showSuggestions) {
            return;
        }
        switch (e.key) {
            case "ArrowDown": {
                e.preventDefault();
                if (suggestionIndex + 1 < suggestions.length) {
                    setSuggestionIndex((prev) => prev + 1);
                }
                break;
            }
            case "ArrowUp": {
                e.preventDefault();
                if (suggestionIndex > 0) {
                    setSuggestionIndex((prev) => prev - 1);
                }
                break;
            }
            case "Tab":
            case "Enter": {
                e.preventDefault();
                handleSelectSuggestion(suggestions[suggestionIndex]);
                break;
            }
            default:
                break;
        }
    };

    return (
        <>
            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    autoComplete="off"
                    onFocus={setShowSuggestions.on}
                    onBlur={setShowSuggestions.off}
                    onKeyDown={handleInputKeyPress}
                />
            </InputGroup>
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
                        suggestions.map((suggestion, index) => (
                            <SuggestionContainer
                                key={suggestion.id}
                                onMouseDown={() =>
                                    handleSelectSuggestion(suggestion)
                                }
                                isActive={index === suggestionIndex}>
                                <PlayerSuggestion
                                    currentInputValue={query}
                                    playerSuggestion={suggestion}
                                />
                            </SuggestionContainer>
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

interface PlayerSuggestionProps {
    currentInputValue: string;
    playerSuggestion: Player;
}

const PlayerSuggestion = ({
    currentInputValue,
    playerSuggestion
}: PlayerSuggestionProps) => {
    const nation = useNextLiveQuery(() =>
        db.nations.get({ id: playerSuggestion.nationId })
    );
    const club = useNextLiveQuery(() =>
        db.clubs.get({ id: playerSuggestion.clubId })
    );

    return (
        <HStack width="100%" spacing={3}>
            <CustomImage
                alt={club?.displayName || ""}
                title={club?.displayName || ""}
                ratio={1}
                src={
                    club
                        ? `/assets/img/clubs/${club?.id}.png`
                        : `/assets/img/nations/placeholder.svg`
                }
                width={SelectImageWidth}
            />
            <CustomImage
                alt={nation?.displayName || ""}
                title={nation?.displayName}
                ratio={NationFlagRatio}
                src={
                    nation
                        ? `/assets/img/nations/${nation?.id}.png`
                        : `/assets/img/nations/placeholder.svg`
                }
                width={SelectImageWidth}
            />
            <Highlighter
                searchWords={[currentInputValue]}
                textToHighlight={playerSuggestion.playerName}
                highlightTag="strong"
                sanitize={removeDiacritics}
            />
        </HStack>
    );
};

interface SuggestionContainerProps {
    children: React.ReactNode;
    isActive?: boolean;
    onMouseDown?: (e: MouseEvent) => any;
}

const SuggestionContainer = ({
    onMouseDown,
    children,
    isActive
}: SuggestionContainerProps) => {
    return (
        <Box
            px={5}
            py={2}
            cursor="pointer"
            onMouseDown={(e) => onMouseDown && onMouseDown(e)}
            bg={isActive ? "gray.100" : undefined}
            _hover={{ background: "gray.200" }}>
            {children}
        </Box>
    );
};

const SkeletonSuggestion = () => {
    const MIN_WIDTH_PERCENT = 50;
    const MAX_WIDTH_PERCENT = 80;

    const ref = useRef(
        <SuggestionContainer>
            <Skeleton
                h="20px"
                my={1}
                w={`${getRandomInt(MIN_WIDTH_PERCENT, MAX_WIDTH_PERCENT)}%`}
            />
        </SuggestionContainer>
    );

    return ref.current;
};
