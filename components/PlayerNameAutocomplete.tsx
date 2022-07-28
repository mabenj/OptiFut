import { SearchIcon } from "@chakra-ui/icons";
import {
    Alert,
    AlertIcon,
    Box,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Spinner,
    useBoolean
} from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import {
    KeyboardEvent,
    LegacyRef,
    MouseEvent,
    useEffect,
    useRef,
    useState
} from "react";
import Highlighter from "react-highlight-words";
import { SelectImageWidth } from "../data/constants";
import { useDebounce } from "../hooks/useDebounce";
import { db, Player } from "../utils/db";
import { removeDiacritics } from "../utils/utils";
import ClubImage from "./ClubImage";
import NationImage from "./NationImage";

const QUERY_DEBOUNCE_MS = 100;
const SUGGESTIONS_LIMIT = 40;
const QUERY_RATING_CUTOFF = 70;

interface AutocompleteInputProps {
    value: string;
    onChange: (newValue: string) => any;
    onPlayerSelected: (player: Player) => any;
    id: string;
    name: string;
    placeholder?: string;
    inputRef?: LegacyRef<HTMLInputElement>;
}

export default function PlayerNameAutocomplete({
    value,
    onChange,
    onPlayerSelected,
    id,
    name,
    placeholder,
    inputRef
}: AutocompleteInputProps) {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, QUERY_DEBOUNCE_MS);
    const [showSuggestions, setShowSuggestions] = useBoolean(false);
    const [isQuerying, setIsQuerying] = useBoolean(false);
    const [suggestionIndex, setSuggestionIndex] = useState(-1);
    const suggestionsContainerRef = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const suggestions =
        useLiveQuery(async () => {
            if (debouncedQuery.length < 2) {
                return [];
            }
            const re = new RegExp(
                String.raw`\b${removeDiacritics(debouncedQuery)}`,
                "i"
            );
            const result = await db.players
                .where("rating")
                .aboveOrEqual(QUERY_RATING_CUTOFF)
                .filter(
                    (player) =>
                        re.test(removeDiacritics(player.playerName)) ||
                        re.test(removeDiacritics(player.commonName))
                )
                .limit(SUGGESTIONS_LIMIT)
                .reverse()
                .sortBy("rating");

            if (result.length === 0) {
                return db.players
                    .where("rating")
                    .below(QUERY_RATING_CUTOFF)
                    .filter(
                        (player) =>
                            re.test(removeDiacritics(player.playerName)) ||
                            re.test(removeDiacritics(player.commonName))
                    )
                    .limit(SUGGESTIONS_LIMIT)
                    .reverse()
                    .sortBy("rating");
            }

            return result;
        }, [debouncedQuery]) || [];

    const areSuggestionsTruncated = suggestions.length >= SUGGESTIONS_LIMIT;

    useEffect(() => {
        setIsQuerying.off();
        setSuggestionIndex(-1);
    }, [setIsQuerying, suggestions, showSuggestions]);

    useEffect(
        () => scrollSuggestions(suggestionsContainerRef.current!),
        [suggestionIndex]
    );

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

    const handleInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
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
                handleSelectSuggestion(suggestions[suggestionIndex]);
            }
            case "Escape": {
                e.preventDefault();
                e.currentTarget.blur();
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
                    {isQuerying ? (
                        <Spinner size="sm" color="gray.300" />
                    ) : (
                        <SearchIcon color="gray.300" />
                    )}
                </InputLeftElement>
                <Input
                    ref={inputRef}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    autoComplete="off"
                    type="search"
                    onFocus={(e) => {
                        e.target.select();
                        setShowSuggestions.on();
                    }}
                    onBlur={setShowSuggestions.off}
                    onKeyDown={handleInputKeyPress}
                />
            </InputGroup>
            {showSuggestions && !!suggestions.length && !isQuerying && (
                <Box
                    ref={suggestionsContainerRef}
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
                    zIndex="modal"
                    maxHeight="350px"
                    overflowY="auto">
                    {suggestions.map((suggestion, index) => (
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
                    {areSuggestionsTruncated && !isQuerying && (
                        <Alert status="warning" textAlign="center">
                            <AlertIcon />
                            Not all suggestions shown - be more specific
                        </Alert>
                    )}
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
    return (
        <HStack width="100%" spacing={3}>
            <ClubImage id={playerSuggestion.clubId} sizePx={SelectImageWidth} />
            <NationImage
                id={playerSuggestion.nationId}
                sizePx={SelectImageWidth}
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
            id={isActive ? "active-suggestion" : undefined}
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

function scrollSuggestions(suggestionsContainer: HTMLDivElement) {
    const activeSuggestion =
        suggestionsContainer?.querySelector<HTMLDivElement>(
            "#active-suggestion"
        );
    if (!activeSuggestion) {
        return;
    }

    const activeOptionHeight = activeSuggestion?.clientHeight || 0;
    const activeOptionOffsetTop = activeSuggestion?.offsetTop || 0;
    const activeOptionOffsetBottom =
        (activeOptionOffsetTop || 0) + (activeOptionHeight || 0);

    const suggestionsContainerHeight = suggestionsContainer.clientHeight;
    const suggestionsContainerScrollTop = suggestionsContainer.scrollTop;

    const isActiveOutTop =
        activeSuggestion?.offsetTop < suggestionsContainerScrollTop;
    const isActiveOutBottom =
        activeOptionOffsetTop + activeOptionHeight >
        suggestionsContainerScrollTop + suggestionsContainerHeight;

    if (isActiveOutTop) {
        suggestionsContainer.scrollTop = activeOptionOffsetTop;
    }
    if (isActiveOutBottom) {
        suggestionsContainer.scrollTop =
            activeOptionOffsetBottom - suggestionsContainerHeight;
    }
}
