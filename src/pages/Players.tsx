import DotPulse from "@/components/Loading/DotPulse";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getPlayers } from "@/store/actions/players/playerActions";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import PlayersCard from "@/components/PlayersCard";
import { v4 as uuidv4 } from "uuid";
import PlayerCard from "@/components/Loading/PlayerCard";

const Players = () => {
  const dispatch = useAppDispatch();
  const { players, playLoading } = useAppSelector(
    (state: RootState) => state.players
  );

  // GET NEWS
  useEffect(() => {
    dispatch(getPlayers());
  }, [dispatch]);

  return (
    <>
      {!playLoading ? (
        <>
          <div className="py-[40px]">
            <h3 className="text-[32px] leading-[40px] text-[#333] font-[700]">
              {players.category}
            </h3>
            <div className="grid grid-cols-4 gap-[15px] py-[30px]">
              {players.player.map((play: any) => (
                <PlayersCard key={uuidv4()} player={play} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="py-[40px]">
            <div className="grid grid-cols-4 gap-[30px] py-[30px]">
              {Array.from({ length: 8 }, () => (
                <PlayerCard key={uuidv4()} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Players;
