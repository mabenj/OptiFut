import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Stack,
    Switch,
    useBoolean,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {
    chakraComponents,
    OptionBase,
    OptionProps,
    Select,
    ValueContainerProps
} from "chakra-react-select";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Clubs } from "../optimizer/data/clubs";
import { Leagues } from "../optimizer/data/leagues";
import { Nations } from "../optimizer/data/nations";

interface SelectOption extends OptionBase {
    label: string;
    value: number;
    image: string;
}

type PlayerVersion = "other" | "icon" | "hero";

interface AddPlayerValues {
    playerName: string;
    playerVersion: PlayerVersion;
    playerNationalityId: number | null;
    playerLeagueId: number | null;
    playerClubId: number | null;
    playerHasLoyalty: boolean;
}

const SELECT_IMG_WIDTH = 35;
const FLAG_IMG_RATIO = 70 / 42;

const DEFAULT_VALUES: AddPlayerValues = {
    playerName: "Jari Avanto",
    playerVersion: "icon",
    playerNationalityId: null,
    playerLeagueId: null,
    playerClubId: null,
    playerHasLoyalty: true
};

const Home: NextPage = () => {
    return (
        <Flex justifyContent="center" height="100vh">
            <Box width="80%">
                <Stack spacing={10}>
                    <Heading>OptiFut</Heading>
                    <AddPlayer />
                </Stack>
            </Box>
        </Flex>
    );
};

const AddPlayer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [playerName, setPlayerName] = useState(DEFAULT_VALUES.playerName);
    const [playerVersion, setPlayerVersion] = useState(
        DEFAULT_VALUES.playerVersion
    );
    const [playerNationalityId, setPlayerNationalityId] = useState(
        DEFAULT_VALUES.playerNationalityId
    );
    const [playerLeagueId, setPlayerLeagueId] = useState(
        DEFAULT_VALUES.playerLeagueId
    );
    const [playerClubId, setPlayerClubId] = useState(
        DEFAULT_VALUES.playerClubId
    );
    const [playerHasLoyalty, setPlayerHasLoyalty] = useBoolean(
        DEFAULT_VALUES.playerHasLoyalty
    );

    const handleAddPlayer = () => {};

    return (
        <>
            <Button onClick={onOpen} leftIcon={<AddIcon />}>
                Add player
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Player</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form id="addPlayer" onSubmit={handleAddPlayer}>
                            <VStack spacing={10}>
                                <FormControl>
                                    <FormLabel htmlFor="playerName">
                                        Player Name
                                    </FormLabel>
                                    <Input
                                        id="playerName"
                                        name="playerName"
                                        placeholder="Enter name"
                                        variant="filled"
                                        value={playerName}
                                        onChange={(e) =>
                                            setPlayerName(e.target.value)
                                        }
                                    />
                                    <FormHelperText>
                                        The player name does not have to be a
                                        name of a real player necessarily
                                    </FormHelperText>
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor="playerVersion">
                                        Version
                                    </FormLabel>
                                    <RadioGroup
                                        name="playerVersion"
                                        value={playerVersion}
                                        onChange={(val) =>
                                            setPlayerVersion(
                                                val as PlayerVersion
                                            )
                                        }>
                                        <Stack spacing={5} direction="row">
                                            <Radio value="other">Other</Radio>
                                            <Radio value="icon">Icon</Radio>
                                            <Radio value="hero">Hero</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor="playerNationalityId">
                                        Nationality (Selected:{" "}
                                        {playerNationalityId})
                                    </FormLabel>
                                    <Select
                                        useBasicStyles
                                        id="playerNationalityId"
                                        name="playerNationalityId"
                                        placeholder="Select nationality..."
                                        options={NATIONALITY_OPTIONS}
                                        onChange={(option) =>
                                            setPlayerNationalityId(
                                                option?.value || null
                                            )
                                        }
                                        components={customSelectComponents}
                                        selectedOptionColor="green"
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor="playerHasLoyalty">
                                        Loyalty
                                    </FormLabel>
                                    <Switch
                                        id="playerHasLoyalty"
                                        name="playerHasLoyalty"
                                        size="lg"
                                        isChecked={playerHasLoyalty}
                                        onChange={setPlayerHasLoyalty.toggle}
                                    />
                                </FormControl>
                            </VStack>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} variant="outline" mr={3}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            form="addPlayer"
                            onClick={handleAddPlayer}>
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

const customSelectComponents = {
    Option: ({ children, ...props }: OptionProps<SelectOption, false>) => (
        <chakraComponents.Option {...props}>
            <Box mr={5}>
                <CustomImage
                    src={props.data.image}
                    fallbackSrc="/assets/img/nations/placeholder.svg"
                    alt={props.data.label}
                    width={SELECT_IMG_WIDTH}
                    ratio={FLAG_IMG_RATIO}
                />
            </Box>
            {children}
        </chakraComponents.Option>
    ),
    ValueContainer: ({
        children,
        ...props
    }: ValueContainerProps<SelectOption>) => {
        const { getValue, hasValue } = props;
        const flagSrc = getValue().at(0)?.image || "";

        if (!hasValue) {
            return (
                <chakraComponents.ValueContainer {...props}>
                    {children}
                </chakraComponents.ValueContainer>
            );
        }

        return (
            <>
                <Flex alignItems="center" justifyContent="center" p={2}>
                    <CustomImage
                        src={flagSrc}
                        fallbackSrc="/assets/img/nations/placeholder.svg"
                        alt={props.getValue().at(0)?.label!}
                        width={SELECT_IMG_WIDTH}
                        ratio={FLAG_IMG_RATIO}
                    />
                </Flex>
                <chakraComponents.ValueContainer {...props}>
                    {children}
                </chakraComponents.ValueContainer>
            </>
        );
    }
};

const CustomImage = ({
    src,
    fallbackSrc,
    alt,
    width,
    ratio
}: {
    src: string;
    fallbackSrc: string;
    alt: string;
    width: number;
    ratio: number;
}) => {
    const [imageSrc, setImageSrc] = useState(src);

    useEffect(() => setImageSrc(src), [src]);

    return (
        <Image
            src={imageSrc}
            alt={alt}
            width={width}
            height={width / ratio}
            onError={() => setImageSrc(fallbackSrc)}
            placeholder="blur"
            blurDataURL={fallbackSrc}
        />
    );
};

const NATIONALITY_OPTIONS: SelectOption[] = Nations.map((nation) => ({
    label: nation.displayName,
    value: nation.id,
    image: `/assets/img/nations/${nation.id}.png`
})).slice(0, 20);
const LEAGUE_OPTIONS: SelectOption[] = Leagues.map((league) => ({
    label: league.displayName,
    value: league.id,
    image: `/assets/img/leagues/${league.id}.png`
}));
const CLUB_OPTIONS: SelectOption[] = Clubs.map((club) => ({
    label: club.displayName,
    value: club.id,
    image: `/assets/img/clubs/${club.id}.png`
}));

export default Home;
