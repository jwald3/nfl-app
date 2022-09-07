import type { GetStaticProps, NextPage } from "next";
import prisma from "../lib/prisma";
import PlayerCard, { CardProps } from "../components/PlayerCard";
import { useEffect, useState } from "react";
import CheckboxFilter from "../components/CheckboxFilter";
import styles from "../styles/Home.module.css";
import SearchFilters from "../components/SearchFilters";

export const getStaticProps: GetStaticProps = async () => {
    const players = await prisma.all_stats_2021_season.findMany({
        where: {
            position: {
                in: ["QB", "WR", "RB", "TE"],
            },
        },
    });

    return {
        props: {
            players: JSON.parse(
                JSON.stringify(players, (_, v) =>
                    typeof v === "bigint" ? v.toString() : v
                )
            ),
        },
        revalidate: 10,
    };
};

type Props = {
    players: CardProps[];
};

const Home: NextPage<Props> = ({ players }) => {
    const [data, setData] = useState(players);
    const [sortingMethod, setSortMethod] = useState<string>("");
    const [searchInput, setSearchInput] = useState<string>("");
    const [positionFilter, setPositionFilter] = useState([
        "QB",
        "WR",
        "TE",
        "RB",
    ]);

    // HELPER FUNCTIONS

    const handleFilters = (filters: []) => {
        const newFilters: [] = [...filters];
        setPositionFilter(newFilters);
    };

    const filterSearchResults = (datasource: CardProps[]) => {
        const trimmedQuery = searchInput.trim();
        let newData = [...players];

        if (trimmedQuery !== "") {
            newData = newData.filter((player) => {
                const first = trimmedQuery.split(" ")[0];
                const last = trimmedQuery.split(" ")[1];
                const player_full = (
                    player.first_name +
                    " " +
                    player.last_name
                ).trim();

                return (
                    player_full.toLowerCase().includes(first.toLowerCase()) &&
                    (!last ||
                        player_full.toLowerCase().includes(last.toLowerCase()))
                );
            });
        } else {
            newData = players;
        }

        return newData;
    };

    const sortData = (datasource: CardProps[], sorting: string) => {
        let sorted;

        switch (sorting) {
            case "passing-yards-desc":
                sorted = [...datasource].sort(
                    (a, b) => b.passing_yards - a.passing_yards
                );

                break;
            case "passing-yards-asc":
                sorted = [...datasource].sort(
                    (a, b) => a.passing_yards - b.passing_yards
                );

                break;
            case "passing-tds-desc":
                sorted = [...datasource].sort(
                    (a, b) => b.passing_tds - a.passing_tds
                );

                break;
            case "passing-tds-asc":
                sorted = [...datasource].sort(
                    (a, b) => a.passing_tds - b.passing_tds
                );

                break;
            case "rushing-yards-desc":
                sorted = [...datasource].sort(
                    (a, b) => b.rushing_yards - a.rushing_yards
                );

                break;
            case "rushing-yards-asc":
                sorted = [...datasource].sort(
                    (a, b) => a.rushing_yards - b.rushing_yards
                );

                break;
            case "rushing-tds-desc":
                sorted = [...datasource].sort(
                    (a, b) => b.rushing_tds - a.rushing_tds
                );

                break;
            case "rushing-tds-asc":
                sorted = [...datasource].sort(
                    (a, b) => a.rushing_tds - b.rushing_tds
                );

                break;
            case "receiving-yards-desc":
                sorted = [...datasource].sort(
                    (a, b) => b.receiving_yards - a.receiving_yards
                );

                break;
            case "receiving-yards-asc":
                sorted = [...datasource].sort(
                    (a, b) => a.receiving_yards - b.receiving_yards
                );

                break;
            case "receiving-tds-desc":
                sorted = [...datasource].sort(
                    (a, b) => b.receiving_tds - a.receiving_tds
                );

                break;
            case "receiving-tds-asc":
                sorted = [...datasource].sort(
                    (a, b) => a.receiving_tds - b.receiving_tds
                );
                break;
            default:
                sorted = [...datasource].sort((a, b) =>
                    a.last_name.localeCompare(b.last_name)
                );
        }

        setData(sorted);
    };

    // USE EFFECTS

    useEffect(() => {
        sortData(players, sortingMethod);
    }, []);

    useEffect(() => {
        // create copy using spread
        let newData = [...players];

        newData = filterSearchResults(newData);

        newData = newData.filter(
            (d) => positionFilter.indexOf(d.position) !== -1
        );
        sortData(newData, sortingMethod);
    }, [positionFilter]);

    useEffect(() => {
        let newData = filterSearchResults(data);
        newData = newData.filter(
            (d) => positionFilter.indexOf(d.position) !== -1
        );
        sortData(newData, sortingMethod);
    }, [sortingMethod]);

    useEffect(() => {
        let newData = filterSearchResults(data);
        newData = newData.filter(
            (d) => positionFilter.indexOf(d.position) !== -1
        );
        sortData(newData, sortingMethod);
    }, [searchInput]);

    return (
        <div className={styles.App}>
            <SearchFilters
                setSortMethod={setSortMethod}
                setSearchInput={setSearchInput}
            />
            <CheckboxFilter handleFilters={handleFilters} />
            {data.map((player, idx) => (
                <PlayerCard
                    playerCard={player}
                    key={player.player_id}
                    idx={idx}
                />
            ))}
        </div>
    );
};

export default Home;
