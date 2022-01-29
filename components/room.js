//Next JS import
import Image from "next/image";

//Dependencies import
import { useState, useEffect } from "react";

//Components import
import Modal from "./modal";

//Near imports
import { wallet, callFunction, viewFunction } from "../near/near-setup";

//Redux import
import { useDispatch } from "react-redux";
import { setAllGames } from "../redux/general/general.actions";

//Assets import
import NearLogo from "../public/near.svg";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Room({ gameID, gameOwner, initialBet, gamePlayer }) {
  const [currentBet, setCurrentBet] = useState(null);
  const [guess, setGuess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPlayModal, setShowPlayModal] = useState(false);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (guess <= 0) {
      setGuess(1);
    } else if (guess > 6) {
      setGuess(6);
    }
  }, [guess]);

  return (
    <div className="w-full h-14 flex mt-5 justify-between items-center">
      <div>
        <div className="w-44 h-4 ">
          <span className="font-bold">Game ID : {gameID}</span>
        </div>
        <div className="flex gap-x-3 items-center justify-center mt-2 ">
          <div className="min-w-44 rounded-lg ">
            <span className="font-bold">Owner : {gameOwner}</span>
          </div>
          <div className="min-w-10  rounded-lg  flex items-center gap-x-1">
            <span className="font-medium">{initialBet}</span>
            <Image src={NearLogo} alt="Near Tokens" width={10} height={10} />
          </div>
        </div>
      </div>
      <div className="flex gap-x-1">
        <div className="w-24 h-6 rounded-lg border-2 border-black text-black font-semibold cursor-pointer   mt-2 p-1 flex items-center justify-center transition-all duration-300 hover:border-transparent hover:bg-success hover:text-white">
          <span
            onClick={() => {
              if (gamePlayer === wallet.getAccountId()) {
                setShowPlayModal(true);
              } else {
                setShowModal(true);
              }
            }}
          >
            {gamePlayer === wallet.getAccountId() ? "Play Game" : "Join Game"}
          </span>
        </div>
      </div>
      <Modal setShowModal={setShowModal} showModal={showModal}>
        <div className="flex flex-col justify-between h-full w-full">
          <div className="flex items-center justify-between">
            <div></div>
            <span className="text-black font-bold text-xl opacity-100">
              Join a Game
            </span>
            <AiOutlineCloseCircle
              className="text-2xl cursor-pointer"
              onClick={() => {
                setShowModal(false);
              }}
            />
          </div>
          <div className="flex w-full flex-col justify-center items-center">
            <div
              className={`w-1/2 h-10  border-2 border-black rounded-lg flex self-center gap-x-1 transition-all duration-500 ${
                !currentBet || parseFloat(currentBet) <= 0.0
                  ? "border-danger"
                  : "border-success"
              }`}
            >
              <input
                onChange={(e) => setCurrentBet(e.target.value)}
                type="number"
                placeholder="Enter the new bet"
                className="w-11/12 h-full px-2 focus:outline-none rounded-lg"
              />
              <Image src={NearLogo} alt="Near Tokens" width={15} height={15} />
            </div>
          </div>
          <div className="flex justify-center">
            <div
              onClick={() => {
                if (!currentBet || parseFloat(currentBet) <= 0.0) return;
                callFunction("joinGame", { gameId: gameID }, currentBet).then(
                  () => {
                    toast.success("Game has Joined", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }
                );
              }}
              className={`w-1/2 h-10  bg-black text-white flex justify-center items-center rounded-lg transition-all duration-500  ${
                !currentBet || parseFloat(currentBet) <= 0.0
                  ? "cursor-not-allowed bg-gray-300"
                  : " cursor-pointer"
              } `}
            >
              <span className="font-bold text-xl">Submit</span>
            </div>
          </div>
        </div>
      </Modal>

      <Modal setShowModal={setShowPlayModal} showModal={showPlayModal}>
        <div className="flex flex-col justify-between h-full w-full">
          <div className="flex items-center justify-between">
            <div></div>
            <span className="text-black font-bold text-xl opacity-100">
              Play Game
            </span>
            <AiOutlineCloseCircle
              className="text-2xl cursor-pointer"
              onClick={() => {
                viewFunction("viewAllGames", {}).then((newGames) => {
                  dispatch(setAllGames(newGames));
                });
                setShowPlayModal(false);
                setIsLoading(false);
                setGuess(null);
                setResult(null);
              }}
            />
          </div>
          <div className="flex w-full flex-col justify-center items-center">
            <div
              className={`w-1/2 h-10  border-2 border-black rounded-lg flex self-center gap-x-1 transition-all duration-500 `}
            >
              <input
                onChange={(e) => {
                  setGuess(parseInt(e.target.value));
                }}
                type="number"
                value={guess}
                placeholder="Enter the guess (1-6)"
                onKeyPress={(e) => {}}
                className="w-full h-full px-2 focus:outline-none rounded-lg"
              />
            </div>
          </div>
          <div className="flex w-full justify-center">
            <span
              className={
                !result
                  ? "hidden"
                  : `block font-bold ${
                      result.includes(wallet.getAccountId())
                        ? "text-success"
                        : "text-danger"
                    } `
              }
            >
              {result}
            </span>
          </div>
          <div className="flex justify-center">
            <div
              onClick={async () => {
                setIsLoading(true);
                if (!guess || guess > 6 || guess <= 0) return;
                callFunction("playGame", {
                  gameId: gameID,
                  guess,
                }).then(() => {
                  viewFunction("viewGame", {
                    gameId: gameID,
                  }).then((res) => {
                    setResult(
                      `The dice number was ${res.winningGuess} , Winner is ${res.winner}`
                    );
                  });
                });
                setIsLoading(false);
              }}
              className={`w-1/2 h-10  bg-black text-white flex justify-center items-center rounded-lg transition-all duration-500  ${
                !guess || guess > 6 || guess <= 0
                  ? "cursor-not-allowed bg-gray-300"
                  : " cursor-pointer"
              } `}
            >
              <span className="font-bold text-xl">
                {isLoading ? "Loading..." : "Submit"}
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Room;
