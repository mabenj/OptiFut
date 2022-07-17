import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
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
    Text,
    useBoolean,
    useDisclosure,
    useRadio,
    useRadioGroup,
    UseRadioProps,
    VStack
} from "@chakra-ui/react";
import {
    chakraComponents,
    OptionProps,
    Select,
    ValueContainerProps
} from "chakra-react-select";
import Image from "next/image";
import React, { ReactElement, useState } from "react";
import { HeroClubId, IconClubId, IconLeagueId } from "../data/constants";
import { useClub } from "../hooks/useClub";
import { useLeague } from "../hooks/useLeague";
import { useNationality } from "../hooks/useNationality";
import { usePlayerPosition } from "../hooks/usePlayerPosition";
import { PlayerPosition } from "../types/player-position.type";
import { PlayerVersion } from "../types/player-version";
import { SelectOption } from "../types/select-option.interface";
import { Player } from "../utils/db";
import { removeDiacritics } from "../utils/utils";
import PlayerNameAutocompleteInput from "./PlayerNameAutocompleteInput";

interface AddPlayerValues {
    playerName: string;
    playerPosition: PlayerPosition;
    playerVersion: PlayerVersion;
    playerNationalityId: number | null;
    playerLeagueId: number | null;
    playerClubId: number | null;
    playerHasLoyalty: boolean;
}

const DEFAULT_VALUES: AddPlayerValues = {
    playerName: "",
    playerPosition: "CAM",
    playerVersion: "other",
    playerNationalityId: null,
    playerLeagueId: null,
    playerClubId: null,
    playerHasLoyalty: true
};

export default function AddPlayerModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [playerName, setPlayerName] = useState(DEFAULT_VALUES.playerName);
    const [playerPosition, setPlayerPosition, positionOptions] =
        usePlayerPosition(DEFAULT_VALUES.playerPosition);
    const [playerVersion, setPlayerVersion] = useState(
        DEFAULT_VALUES.playerVersion
    );
    const [playerHasLoyalty, setPlayerHasLoyalty] = useBoolean(
        DEFAULT_VALUES.playerHasLoyalty
    );
    const [playerNationality, setPlayerNationalityId, nationalityOptions] =
        useNationality(DEFAULT_VALUES.playerNationalityId);
    const [playerLeague, setPlayerLeagueId, leagueOptions] = useLeague(
        DEFAULT_VALUES.playerLeagueId
    );
    const [playerClub, setPlayerClubId, clubOptions] = useClub(
        DEFAULT_VALUES.playerClubId
    );

    const handleVersionChange = (version: PlayerVersion) => {
        if (version === "icon") {
            setPlayerLeagueId(IconLeagueId);
            setPlayerClubId(IconClubId);
        }
        if (version === "hero") {
            setPlayerClubId(HeroClubId);
        }
        if (version === "other") {
            setPlayerLeagueId(null);
            setPlayerClubId(null);
        }
        setPlayerVersion(version);
    };

    const handleAddPlayer = () => {};

    const handleReset = () => {
        setPlayerName(DEFAULT_VALUES.playerName);
        setPlayerVersion(DEFAULT_VALUES.playerVersion);
        setPlayerNationalityId(DEFAULT_VALUES.playerNationalityId);
        setPlayerLeagueId(DEFAULT_VALUES.playerLeagueId);
        setPlayerClubId(DEFAULT_VALUES.playerClubId);
        if (DEFAULT_VALUES.playerHasLoyalty) {
            setPlayerHasLoyalty.on();
        } else {
            setPlayerHasLoyalty.off();
        }
    };

    const populateFieldsWith = (player: Player) => {
        setPlayerName(player.playerName);
        setPlayerPosition(player.position);
        setPlayerVersion(player.version);
        setPlayerNationalityId(player.nationId);
        setPlayerLeagueId(player.leagueId);
        setPlayerClubId(player.clubId);
    };

    return (
        <>
            <Button onClick={onOpen} leftIcon={<AddIcon />}>
                Add player
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Player</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody my={5}>
                        <form id="addPlayer" onSubmit={handleAddPlayer}>
                            <VStack spacing={10}>
                                <Grid templateColumns="5fr 2fr" w="100%">
                                    <GridItem>
                                        <FormControl>
                                            <FormLabel
                                                htmlFor="playerName"
                                                textAlign="center">
                                                Player Name
                                            </FormLabel>
                                            <InputGroup>
                                                <PlayerNameAutocompleteInput
                                                    id="playerName"
                                                    name="playerName"
                                                    placeholder="Enter name"
                                                    value={playerName}
                                                    onChange={setPlayerName}
                                                    onPlayerSelected={
                                                        populateFieldsWith
                                                    }
                                                />
                                                <InputRightAddon
                                                    p={0}
                                                    title="Loyalty">
                                                    <Menu>
                                                        <MenuButton
                                                            as={IconButton}
                                                            icon={
                                                                playerHasLoyalty ? (
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
                                                        <MenuList>
                                                            <MenuOptionGroup
                                                                value={playerHasLoyalty.toString()}
                                                                type="radio">
                                                                <MenuItemOption
                                                                    value="true"
                                                                    onClick={
                                                                        setPlayerHasLoyalty.on
                                                                    }>
                                                                    Has loyalty
                                                                </MenuItemOption>
                                                                <MenuItemOption
                                                                    value="false"
                                                                    onClick={
                                                                        setPlayerHasLoyalty.off
                                                                    }>
                                                                    No loyalty
                                                                </MenuItemOption>
                                                            </MenuOptionGroup>
                                                        </MenuList>
                                                    </Menu>
                                                </InputRightAddon>
                                            </InputGroup>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem>
                                        <FormControl>
                                            <FormLabel
                                                htmlFor="playerPosition"
                                                textAlign="center">
                                                Position
                                            </FormLabel>
                                            <Menu>
                                                <Flex justifyContent="center">
                                                    <MenuButton as={Button}>
                                                        {playerPosition.toUpperCase()}{" "}
                                                        <ChevronDownIcon />
                                                    </MenuButton>
                                                    <MenuList w="50px">
                                                        <MenuOptionGroup
                                                            type="radio"
                                                            value={
                                                                playerPosition
                                                            }
                                                            onChange={(
                                                                position
                                                            ) =>
                                                                setPlayerPosition(
                                                                    position as PlayerPosition
                                                                )
                                                            }>
                                                            {positionOptions.map(
                                                                (pos) => (
                                                                    <MenuItemOption
                                                                        key={
                                                                            pos
                                                                        }
                                                                        value={
                                                                            pos
                                                                        }>
                                                                        {pos}
                                                                    </MenuItemOption>
                                                                )
                                                            )}
                                                        </MenuOptionGroup>
                                                    </MenuList>
                                                </Flex>
                                            </Menu>
                                        </FormControl>
                                    </GridItem>
                                </Grid>

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
                                    <Select
                                        useBasicStyles={true}
                                        hasStickyGroupHeaders={true}
                                        id="playerNationalityId"
                                        name="playerNationalityId"
                                        placeholder="Select nationality..."
                                        options={nationalityOptions}
                                        value={playerNationality}
                                        onChange={(option) =>
                                            setPlayerNationalityId(
                                                option?.value
                                            )
                                        }
                                        components={customSelectComponents}
                                        selectedOptionColor="green"
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel
                                        htmlFor="playerLeagueId"
                                        textAlign="center">
                                        League
                                    </FormLabel>
                                    <Select
                                        useBasicStyles={true}
                                        hasStickyGroupHeaders={true}
                                        id="playerLeagueId"
                                        name="playerLeagueId"
                                        placeholder="Select league..."
                                        options={leagueOptions}
                                        value={playerLeague}
                                        onChange={(option) =>
                                            setPlayerLeagueId(option?.value)
                                        }
                                        components={customSelectComponents}
                                        selectedOptionColor="green"
                                        isDisabled={playerVersion === "icon"}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel
                                        htmlFor="playerClubId"
                                        textAlign="center">
                                        Club
                                    </FormLabel>
                                    <Select
                                        useBasicStyles={true}
                                        hasStickyGroupHeaders={true}
                                        id="playerClubId"
                                        name="playerClubId"
                                        placeholder="Select club..."
                                        options={clubOptions}
                                        value={playerClub}
                                        onChange={(option) =>
                                            setPlayerClubId(option?.value)
                                        }
                                        components={customSelectComponents}
                                        selectedOptionColor="green"
                                        isDisabled={
                                            playerVersion === "icon" ||
                                            playerVersion === "hero"
                                        }
                                        filterOption={(candidate, input) => {
                                            if (!input) {
                                                return (
                                                    candidate.data
                                                        .leagueId22 ===
                                                    playerLeague?.value
                                                );
                                            }
                                            return removeDiacritics(
                                                candidate.data.label.toLowerCase()
                                            ).includes(
                                                removeDiacritics(
                                                    input.trim().toLowerCase()
                                                )
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
                                    onClick={onClose}
                                    variant="outline"
                                    mr={3}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    form="addPlayer"
                                    onClick={handleAddPlayer}>
                                    Add
                                </Button>
                            </Box>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
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

const VersionRadioGroup = ({
    name,
    onChange,
    value
}: {
    name: string;
    onChange: (version: PlayerVersion) => any;
    value: PlayerVersion;
}) => {
    const options = ["other", "icon", "hero"];

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: name,
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
                bg: "teal.600",
                color: "white",
                borderColor: "teal.600"
            }}>
            {props.children}
            <input {...input} />
        </Button>
    );
};
