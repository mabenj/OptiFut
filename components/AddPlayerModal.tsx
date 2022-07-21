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
import Image from "next/image";
import React, { FormEvent, ReactElement, useState } from "react";
import { HeroClubId, IconClubId, IconLeagueId } from "../data/constants";
import { useClub } from "../hooks/player-options/useClub";
import { useLeague } from "../hooks/player-options/useLeague";
import { useNationality } from "../hooks/player-options/useNationality";
import { usePlayerPosition } from "../hooks/player-options/usePlayerPosition";
import { PlayerDto } from "../types/player-dto.interface";
import { PlayerPosition } from "../types/player-position.type";
import { PlayerVersion } from "../types/player-version";
import { Player } from "../utils/db";
import { removeDiacritics } from "../utils/utils";
import PlayerNameAutocomplete from "./PlayerNameAutocomplete";
import CustomSelect from "./ui/CustomSelect";
import CustomTooltip from "./ui/CustomTooltip";

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

interface AddPlayerModalProps {
    onPlayerAdded: (player: PlayerDto) => any;
    disabled: boolean;
}

export default function AddPlayerModal({
    onPlayerAdded,
    disabled
}: AddPlayerModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [playerName, setPlayerName] = useState(DEFAULT_VALUES.playerName);
    const [playerPosition, setPlayerPosition, positionOptions] =
        usePlayerPosition(DEFAULT_VALUES.playerPosition);
    const [playerVersion, setPlayerVersion] = useState(
        DEFAULT_VALUES.playerVersion
    );
    const [hasLoyalty, setHasLoyalty] = useBoolean(
        DEFAULT_VALUES.playerHasLoyalty
    );
    const {
        nationalityId,
        setNationalityId,
        nationalityOption,
        nationalityOptions
    } = useNationality(DEFAULT_VALUES.playerNationalityId);
    const { leagueId, setLeagueId, leagueOption, leagueOptions } = useLeague(
        DEFAULT_VALUES.playerLeagueId
    );
    const { clubId, setClubId, clubOption, clubOptions } = useClub(
        DEFAULT_VALUES.playerClubId
    );

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
        onClose();
    };

    const handleReset = () => {
        setPlayerName(DEFAULT_VALUES.playerName);
        setPlayerVersion(DEFAULT_VALUES.playerVersion);
        setPlayerPosition(DEFAULT_VALUES.playerPosition);
        setNationalityId(DEFAULT_VALUES.playerNationalityId);
        setLeagueId(DEFAULT_VALUES.playerLeagueId);
        setClubId(DEFAULT_VALUES.playerClubId);
        if (DEFAULT_VALUES.playerHasLoyalty) {
            setHasLoyalty.on();
        } else {
            setHasLoyalty.off();
        }
    };

    const populateFieldsWith = (player: Player) => {
        setPlayerName(player.playerName);
        setPlayerPosition(player.position);
        setPlayerVersion(player.version);
        setNationalityId(player.nationId);
        setLeagueId(player.leagueId);
        setClubId(player.clubId);
    };

    return (
        <>
            <Button onClick={onOpen} leftIcon={<AddIcon />} disabled={disabled}>
                Add player
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size={["full", "xl"]}>
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
                                                <PlayerNameAutocomplete
                                                    id="playerName"
                                                    name="playerName"
                                                    placeholder="Enter name"
                                                    value={playerName}
                                                    onChange={setPlayerName}
                                                    onPlayerSelected={
                                                        populateFieldsWith
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
                                                    <CustomTooltip label="Current position in card">
                                                        <MenuButton as={Button}>
                                                            {playerPosition.toUpperCase()}{" "}
                                                            <ChevronDownIcon />
                                                        </MenuButton>
                                                    </CustomTooltip>
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
                                                    candidate.leagueId ===
                                                    leagueId
                                                );
                                            }
                                            const re = new RegExp(
                                                String.raw`\b${removeDiacritics(
                                                    input
                                                )}`,
                                                "i"
                                            );
                                            return re.test(
                                                removeDiacritics(
                                                    candidate.label
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
