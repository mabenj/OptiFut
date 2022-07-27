import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    InputGroup,
    InputRightAddon,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Portal,
    Text,
    useBoolean,
    useRadio,
    useRadioGroup,
    UseRadioProps,
    VStack
} from "@chakra-ui/react";
import Image from "next/image";
import React, {
    FormEvent,
    ReactElement,
    useEffect,
    useRef,
    useState
} from "react";
import {
    DefaultEditorValues,
    HeroClubId,
    IconClubId,
    IconLeagueId
} from "../data/constants";
import { useClub } from "../hooks/player-options/useClub";
import { useLeague } from "../hooks/player-options/useLeague";
import { useNationality } from "../hooks/player-options/useNationality";
import { usePlayerPosition } from "../hooks/player-options/usePlayerPosition";
import { PlayerEditorValues } from "../types/player-editor-values.interface";
import { PlayerPosition } from "../types/player-position.type";
import { PlayerVersion } from "../types/player-version.type";
import { removeDiacritics } from "../utils/utils";
import PlayerNameAutocomplete from "./PlayerNameAutocomplete";
import CustomSelect from "./ui/CustomSelect";
import CustomTooltip from "./ui/CustomTooltip";

interface AddPlayerModalProps {
    onPlayerAdded: (player: PlayerEditorValues) => any;
    isOpen: boolean;
    closeModal: () => any;
    prefillValues: PlayerEditorValues;
}

export default function PlayerEditorModal({
    onPlayerAdded,
    isOpen,
    closeModal,
    prefillValues
}: AddPlayerModalProps) {
    const [playerName, setPlayerName] = useState(prefillValues.name);
    const [playerPosition, setPlayerPosition, positionOptions] =
        usePlayerPosition(prefillValues.position);
    const [playerVersion, setPlayerVersion] = useState(prefillValues.version);
    const [hasLoyalty, setHasLoyalty] = useBoolean(prefillValues.hasLoyalty);
    const {
        nationalityId,
        setNationalityId,
        nationalityOption,
        nationalityOptions
    } = useNationality(prefillValues.nationId);
    const { leagueId, setLeagueId, leagueOption, leagueOptions } = useLeague(
        prefillValues.leagueId
    );
    const { clubId, setClubId, clubOption, clubOptions } = useClub(
        prefillValues.clubId
    );

    const initialFocusRef = useRef(null);
    const finalFocusRef = useRef(null);

    const isNewPlayer = prefillValues.name === "";

    useEffect(() => {
        populateFieldsWith(prefillValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prefillValues]);

    const handleVersionChange = (version: PlayerVersion) => {
        if (version === "icon") {
            setLeagueId(IconLeagueId);
            setClubId(IconClubId);
        }
        if (version === "hero") {
            setClubId(HeroClubId);
        }
        if (version === "other") {
            if (leagueId === IconLeagueId) {
                setLeagueId(null);
            }
            if (clubId === IconClubId || clubId === HeroClubId) {
                setClubId(null);
            }
        }
        setPlayerVersion(version);
    };

    const handleAddPlayer = (e: FormEvent) => {
        e.preventDefault();
        // TODO: validate, display errors etc
        onPlayerAdded({
            name: playerName,
            version: playerVersion,
            hasLoyalty: hasLoyalty,
            position: playerPosition,
            nationId: nationalityId!,
            leagueId: leagueId!,
            clubId: clubId!
        });
        handleReset();
        handleCloseModal();
    };

    const handleCloseModal = () => {
        closeModal();
    };

    const handleReset = () => {
        setPlayerName(DefaultEditorValues.name);
        setPlayerVersion(DefaultEditorValues.version);
        setPlayerPosition(DefaultEditorValues.position);
        setNationalityId(DefaultEditorValues.nationId);
        setLeagueId(DefaultEditorValues.leagueId);
        setClubId(DefaultEditorValues.clubId);
        if (DefaultEditorValues.hasLoyalty) {
            setHasLoyalty.on();
        } else {
            setHasLoyalty.off();
        }
    };

    const populateFieldsWith = (values: PlayerEditorValues) => {
        setPlayerName(values.name);
        setPlayerPosition(values.position);
        setPlayerVersion(values.version);
        setNationalityId(values.nationId);
        setLeagueId(values.leagueId);
        setClubId(values.clubId);
        values.hasLoyalty ? setHasLoyalty.on() : setHasLoyalty.off();
    };

    return (
        <Modal
            initialFocusRef={initialFocusRef}
            finalFocusRef={finalFocusRef}
            isOpen={isOpen}
            onClose={handleCloseModal}
            size={["full", "xl"]}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Flex gap={4}>
                        <Text className="bi bi-person-lines-fill" />
                        {isNewPlayer ? "Add Player" : "Edit Player"}
                    </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody my={5}>
                    <form id="addPlayer" onSubmit={handleAddPlayer}>
                        <VStack spacing={5}>
                            <Flex w="100%">
                                <FormControl w="70%">
                                    <FormLabel
                                        htmlFor="playerName"
                                        textAlign="center">
                                        Player Name
                                    </FormLabel>
                                    <InputGroup>
                                        <PlayerNameAutocomplete
                                            inputRef={initialFocusRef}
                                            id="playerName"
                                            name="playerName"
                                            placeholder="Enter name"
                                            value={playerName}
                                            onChange={setPlayerName}
                                            onPlayerSelected={(player) =>
                                                populateFieldsWith({
                                                    name: player.playerName,
                                                    hasLoyalty:
                                                        prefillValues.hasLoyalty,
                                                    version: player.version,
                                                    position: player.position,
                                                    nationId: player.nationId,
                                                    leagueId: player.leagueId,
                                                    clubId: player.clubId
                                                })
                                            }
                                        />
                                        <InputRightAddon p={0}>
                                            <Menu>
                                                <CustomTooltip label="Loyalty">
                                                    <MenuButton
                                                        as={IconButton}
                                                        icon={
                                                            hasLoyalty ? (
                                                                <Text
                                                                    className="bi-shield-fill-check"
                                                                    color="green.600"
                                                                />
                                                            ) : (
                                                                <Text
                                                                    className="bi-shield-slash-fill"
                                                                    color="gray.600"
                                                                />
                                                            )
                                                        }
                                                        variant="outline"
                                                    />
                                                </CustomTooltip>

                                                <MenuList>
                                                    <MenuOptionGroup
                                                        value={hasLoyalty.toString()}
                                                        type="radio">
                                                        <MenuItemOption
                                                            value="true"
                                                            onClick={
                                                                setHasLoyalty.on
                                                            }>
                                                            Has loyalty
                                                        </MenuItemOption>
                                                        <MenuItemOption
                                                            value="false"
                                                            onClick={
                                                                setHasLoyalty.off
                                                            }>
                                                            No loyalty
                                                        </MenuItemOption>
                                                    </MenuOptionGroup>
                                                </MenuList>
                                            </Menu>
                                        </InputRightAddon>
                                    </InputGroup>
                                </FormControl>
                                <FormControl w="30%">
                                    <FormLabel
                                        htmlFor="playerPosition"
                                        textAlign="center">
                                        Position
                                    </FormLabel>
                                    <Menu>
                                        <Flex justifyContent="center">
                                            <CustomTooltip label="Current position in card">
                                                <MenuButton as={Button}>
                                                    {playerPosition.toUpperCase()}{" "}
                                                    <ChevronDownIcon />
                                                </MenuButton>
                                            </CustomTooltip>
                                            <Portal>
                                                <MenuList zIndex={"modal"}>
                                                    <MenuOptionGroup
                                                        type="radio"
                                                        value={playerPosition}
                                                        onChange={(position) =>
                                                            setPlayerPosition(
                                                                position as PlayerPosition
                                                            )
                                                        }>
                                                        {positionOptions.map(
                                                            (pos) => (
                                                                <MenuItemOption
                                                                    key={pos}
                                                                    value={pos}>
                                                                    {pos}
                                                                </MenuItemOption>
                                                            )
                                                        )}
                                                    </MenuOptionGroup>
                                                </MenuList>
                                            </Portal>
                                        </Flex>
                                    </Menu>
                                </FormControl>
                            </Flex>

                            <FormControl>
                                <FormLabel
                                    htmlFor="playerVersion"
                                    textAlign="center">
                                    Version
                                </FormLabel>
                                <VersionRadioGroup
                                    name="playerVersion"
                                    value={playerVersion}
                                    onChange={handleVersionChange}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel
                                    htmlFor="playerNationalityId"
                                    textAlign="center">
                                    Nationality
                                </FormLabel>
                                <CustomSelect
                                    id="playerNationalityId"
                                    name="playerNationalityId"
                                    placeholder="Select nationality..."
                                    noOptionsMessage="No nationalities found."
                                    options={nationalityOptions}
                                    value={nationalityOption}
                                    onChange={(option) =>
                                        setNationalityId(option?.value)
                                    }
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel
                                    htmlFor="playerLeagueId"
                                    textAlign="center">
                                    League
                                </FormLabel>
                                <CustomSelect
                                    id="playerLeagueId"
                                    name="playerLeagueId"
                                    placeholder="Select league..."
                                    noOptionsMessage="No leagues found."
                                    options={leagueOptions}
                                    value={leagueOption}
                                    onChange={(option) =>
                                        setLeagueId(option?.value)
                                    }
                                    isDisabled={playerVersion === "icon"}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel
                                    htmlFor="playerClubId"
                                    textAlign="center">
                                    Club
                                </FormLabel>
                                <CustomSelect
                                    id="playerClubId"
                                    name="playerClubId"
                                    placeholder="Select club..."
                                    noOptionsMessage="No clubs found."
                                    options={clubOptions}
                                    value={clubOption}
                                    onChange={(option) =>
                                        setClubId(option.value)
                                    }
                                    isDisabled={
                                        playerVersion === "icon" ||
                                        playerVersion === "hero"
                                    }
                                    filterOption={(candidate, input) => {
                                        if (!input || input.length < 2) {
                                            return (
                                                candidate.leagueId === leagueId
                                            );
                                        }
                                        const re = new RegExp(
                                            String.raw`\b${removeDiacritics(
                                                input
                                            )}`,
                                            "i"
                                        );
                                        return re.test(
                                            removeDiacritics(candidate.label)
                                        );
                                    }}
                                />
                            </FormControl>
                        </VStack>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Flex w="100%" justifyContent="space-between">
                        <Button onClick={handleReset} variant="ghost">
                            Reset
                        </Button>
                        <Box>
                            <Button
                                onClick={handleCloseModal}
                                variant="ghost"
                                mr={3}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                form="addPlayer"
                                colorScheme="green"
                                onClick={handleAddPlayer}
                                leftIcon={
                                    isNewPlayer ? (
                                        <AddIcon />
                                    ) : (
                                        <Text className="bi bi-save2" />
                                    )
                                }>
                                {isNewPlayer ? "Add Player" : "Save"}
                            </Button>
                        </Box>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

interface VersionRadioGroupProps {
    name: string;
    onChange: (version: PlayerVersion) => any;
    value: PlayerVersion;
}

const VersionRadioGroup = ({
    name,
    onChange,
    value
}: VersionRadioGroupProps) => {
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: name,
        value: value,
        defaultValue: value,
        onChange: onChange
    });

    const group = getRootProps();

    const otherRadio = getRadioProps({ value: "other" });
    const iconRadio = getRadioProps({ value: "icon" });
    const heroRadio = getRadioProps({ value: "hero" });

    return (
        <Center>
            <ButtonGroup {...group} isAttached>
                <VersionRadio {...otherRadio}>Other</VersionRadio>
                <VersionRadio
                    {...iconRadio}
                    icon={
                        <Image
                            src={`/assets/img/clubs/${IconClubId}.png`}
                            alt="icon club"
                            width={20}
                            height={20}
                        />
                    }>
                    Icon
                </VersionRadio>
                <VersionRadio
                    {...heroRadio}
                    icon={
                        <Image
                            src={`/assets/img/clubs/${HeroClubId}.png`}
                            alt="hero club"
                            width={20}
                            height={20}
                        />
                    }>
                    Hero
                </VersionRadio>
            </ButtonGroup>
        </Center>
    );
};

const VersionRadio = (
    props: UseRadioProps & { children: React.ReactNode; icon?: ReactElement }
) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Button
            {...checkbox}
            as="label"
            leftIcon={props.icon}
            cursor="pointer"
            size="md"
            variant="outline"
            _checked={{
                bg: "green.600",
                color: "white",
                borderColor: "green.700"
            }}>
            {props.children}
            <input {...input} />
        </Button>
    );
};
