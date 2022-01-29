//Next JS import
import Image from "next/image";

//Dependencies import
import { useState } from "react";
import { toast } from "react-toastify";

//Components import
import Modal from "./modal";

//Assets import
import NearLogo from "../public/near.svg";
import { AiOutlineCloseCircle } from "react-icons/ai";

//Near imports
import { wallet, callFunction , viewFunction } from "../near/near-setup";

//Redux import
import { useDispatch } from "react-redux";
import { setAllGames } from "../redux/general/general.actions";

const MyRoom = ({ gameID, gameState, initialBet, gameOwner }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentBet, setCurrentBet] = useState(null);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (wallet.getAccountId() !== gameOwner) {
      toast.error("Only the owner can delete a game!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (gameState === "JOINED") {
      toast.error("It is not possible to delete this game!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    callFunction("deleteGame", { gameId: gameID })
      .then((res) => {
        viewFunction("viewAllGames", {}).then((newGames) => {
          dispatch(setAllGames(newGames));
          toast.success("Game has been deleted", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full h-14 flex mt-5 justify-between items-center">
      <div>
        <div className="w-44 h-4 ">
          <span className="font-bold">Game ID : {gameID}</span>
        </div>
        <div className="flex gap-x-3 items-center justify-center mt-2 ">
          <div className="min-w-44 rounded-lg ">
            <span className="font-bold">Status : {gameState}</span>
          </div>
          <div className="min-w-10  rounded-lg  flex items-center gap-x-1">
            <span className="font-medium">{initialBet}</span>
            <Image src={NearLogo} alt="Near Tokens" width={10} height={10} />
          </div>
        </div>
      </div>
      <div className="flex gap-x-1">
        <div
          onClick={handleDelete}
          className="min-w-24 h-6 rounded-lg border-2 border-black text-black font-semibold cursor-pointer  mt-2 p-1 flex items-center justify-center transition-all duration-400 hover:border-transparent hover:bg-danger hover:text-white"
        >
          <span>Delete Game</span>
        </div>
        <div
          onClick={() => {
            if (gameState !== "FINISHED") {
              toast.error("Only finished games can be reactivated", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              return;
            }
            setShowModal(true);
          }}
          className="min-w-24 h-6 rounded-lg border-2 border-black text-black font-semibold cursor-pointer  mt-2 p-1 flex items-center justify-center transition-all duration-400 hover:border-transparent hover:bg-yellow-400  "
        >
          <span>Reactivate Game</span>
        </div>
      </div>
      <Modal setShowModal={setShowModal} showModal={showModal}>
        <div className="flex flex-col justify-between h-full w-full">
          <div className="flex items-center justify-between">
            <div></div>
            <span className="text-black font-bold text-xl opacity-100">
              Reactivate Room
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
                currentBet === null || parseFloat(currentBet) <= 0.0
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
                if (
                  currentBet == null ||
                  currentBet == "" ||
                  parseFloat(currentBet) <= 0.0
                )
                  return;
                callFunction(
                  "reactivateGame",
                  { gameId: gameID },
                  currentBet
                ).then(() => {
                  toast.success("Game has been created", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                });
              }}
              className={`w-1/2 h-10  bg-black text-white flex justify-center items-center rounded-lg transition-all duration-500  ${
                currentBet == null ||
                currentBet == "" ||
                parseFloat(currentBet) <= 0.0
                  ? "cursor-not-allowed bg-gray-300"
                  : " cursor-pointer"
              } `}
            >
              <span className="font-bold text-xl">Submit</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyRoom;
