import Image from "next/image";
import styles from "../styles/PlayerCard.module.css";

export type CardProps = {
    idx: number;
    player_id: string;
    team: string;
    player_name_abbrev: string;
    jersey_number: number;
    position: string;
    player_name_full: string;
    first_name: string;
    last_name: string;
    exp: number;
    height: number;
    weight: number;
    birth_date: Date;
    headshot_url: string;
    rushing_yards: number;
    passing_yards: number;
    receiving_yards: number;
    pass_attempts: number;
    passing_tds: number;
    rushing_tds: number;
    receptions: number;
    rush_attempts: number;
    receiving_tds: number;
};

const PlayerCard: React.FC<{ playerCard: CardProps; idx: number }> = ({
    playerCard,
    idx,
}) => {
    return (
        <div className={styles.playerCard}>
            <div className={styles.topBar}>
                <div className={styles.cardRank}>
                    <div className="rank-label">Rank</div>
                    <div className="rank-body">{idx + 1}</div>
                </div>
                <div className={styles.bio}>
                    <div className={styles.imgContainer}>
                        <Image
                            className={styles.playerAvatar}
                            src={
                                playerCard?.headshot_url !== "0"
                                    ? playerCard?.headshot_url
                                    : "https://b.fssta.com/uploads/application/fs-app/default-headshot.vresize.280.280.medium.0.png"
                            }
                            alt={playerCard.player_name_full}
                            height="100%"
                            width="100%"
                            objectFit="cover"
                        />
                    </div>
                    <div className={styles.nameContainer}>
                        <div className={styles.firstName}>
                            {playerCard.player_name_full.split(" ")[0]}
                        </div>
                        <div className={styles.lastName}>
                            {playerCard.last_name.toUpperCase()}
                        </div>
                    </div>
                </div>
                <div className={styles.tags}>
                    <div className={styles.tag}>{playerCard.position}</div>
                    <div className={styles.tag}>{playerCard.team}</div>
                    <div className={styles.tag}>{playerCard.jersey_number}</div>
                </div>
            </div>
            <div className={styles.cardBottom}>
                <div className={styles.statContainter}>
                    <div className={styles.statHeader}>Passing</div>
                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <div className="stat-label">ATTS</div>
                            <div className="stat-value">
                                {playerCard.pass_attempts}
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <div className="stat-label">YDS</div>
                            <div className="stat-value">
                                {playerCard.passing_yards}
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <div className="stat-label">TDS</div>
                            <div className="stat-value">
                                {playerCard.passing_tds}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.statContainter}>
                    <div className={styles.statHeader}>Rushing</div>
                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <div className="stat-label">ATTS</div>
                            <div className="stat-value">
                                {playerCard.rush_attempts}
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <div className="stat-label">YDS</div>
                            <div className="stat-value">
                                {playerCard.rushing_yards}
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <div className="stat-label">TDS</div>
                            <div className="stat-value">
                                {playerCard.rushing_tds}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.statContainter}>
                    <div className={styles.statHeader}>Receiving</div>
                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <div className="stat-label">RECS</div>
                            <div className="stat-value">
                                {playerCard.receptions}
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <div className="stat-label">YDS</div>
                            <div className="stat-value">
                                {playerCard.receiving_yards}
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <div className="stat-label">TDS</div>
                            <div className="stat-value">
                                {playerCard.receiving_tds}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;
