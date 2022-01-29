//Next import
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

//Dependencies import
import { useEffect, useState } from "react";

//Redux import
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser, setAllGames } from "../redux/general/general.actions";

//Near import
import { signOut, viewFunction, callFunction, utils } from "../near/near-setup";

//Component Import
import AllRoomsSkeleton from "../components/allRoomSkeleton";
import Room from "../components/room";
import MyRoom from "../components/myRoom";
import Modal from "../components/modal";

//Assets import
import AvatarImage from "../public/avatar.png";
import NearLogo from "../public/near.svg";
import { CgGames } from "react-icons/cg";
import { MdOutlineGames } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.general.currentUser);
  const allGames = useSelector((state) => state.general.allGames);
  const [currentTab, setCurrentTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentBet, setCurrentBet] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    } else {
      viewFunction("viewAllGames", {}).then((res) => {
        dispatch(setAllGames(res));
      });
    }
  }, [currentUser]);

  return (
    <div className="w-screen h-screen flex">
      <Head>
        <title>Near Dice Game | Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="w-3/12 h-full bg-black flex flex-col py-12 items-center">
        <span className="text-white font-bold text-2xl mb-8">
          Near Dice Game
        </span>
        <div className="rounded-lg w-20 h-20 bg-white relative mb-3">
          <Image
            src={AvatarImage}
            layout="fill"
            objectFit="contain"
            alt="profile-pic"
            width="100%"
            height="100%"
            className="rounded-lg"
          />
        </div>
        <span className="font-semibold text-white mb-10">{currentUser}</span>
        <div
          onClick={() => setCurrentTab(0)}
          className={`flex cursor-pointer justify-center items-center gap-x-2 mb-4 opacity-50 transition-all duration-400 hover:opacity-100 text-white ${
            currentTab === 0
              ? "text-yellow-400 opacity-100 font-bold text-xl"
              : ""
          }`}
        >
          <CgGames />
          <span>All Rooms</span>
        </div>
        <div
          onClick={() => setCurrentTab(1)}
          className={`flex cursor-pointer justify-center items-center gap-x-2 mb-4 opacity-50 transition-all duration-300 hover:opacity-100 text-white ${
            currentTab === 1
              ? "text-yellow-400 opacity-100 font-bold text-xl"
              : ""
          }`}
        >
          <MdOutlineGames />
          <span>My Rooms</span>
        </div>

        <div
          onClick={() => {
            signOut();
            dispatch(setCurrentUser(null));
          }}
          className={`flex font-bold text-xl mt-auto opacity-50 cursor-pointer justify-center items-center gap-x-2 mb-4  transition-all duration-300 hover:opacity-100  text-white 
          `}
        >
          <div className="bg-white  rounded-full p-1 flex justify-center items-center">
            <BiLogOut className="text-red-500 text-xl" />
          </div>
          <span>Sign Out</span>
        </div>
      </nav>

      <section className="w-9/12 py-12 px-8">
        <div className="flex w-full items-center justify-between">
          <span className="font-bold text-2xl ">
            {currentTab === 0 ? "All Rooms" : "My Rooms"}
          </span>
          {currentTab == 1 ? (
            <div
              onClick={() => {
                setShowModal(true);
              }}
              className="min-w-24 h-6 rounded-lg border-2 border-black text-black font-semibold cursor-pointer  mt-2 p-1 flex items-center justify-center  "
            >
              <span>Create Game</span>
            </div>
          ) : null}
        </div>
        {allGames.length > 0 && currentTab === 0 ? (
          allGames
            .filter(
              (game) => game.owner !== currentUser && game.state !== "FINISHED"
            )
            .map((game) => (
              <Room
                key={game.id}
                gameID={game.gameId}
                gameOwner={game.owner}
                gamePlayer={game.player}
                initialBet={utils.format.formatNearAmount(game.startingBet)}
              />
            ))
        ) : allGames.length > 0 && currentTab === 1 ? (
          allGames
            .filter((game) => game.owner === currentUser)
            .map((game) => (
              <MyRoom
                key={game.id}
                gameID={game.gameId}
                gameState={game.state}
                gameOwner={game.owner}
                initialBet={utils.format.formatNearAmount(game.startingBet)}
              />
            ))
        ) : (
          <>
            <AllRoomsSkeleton isMyRoom={currentTab === 1} />
            <AllRoomsSkeleton isMyRoom={currentTab === 1} />
            <AllRoomsSkeleton isMyRoom={currentTab === 1} />
            <AllRoomsSkeleton isMyRoom={currentTab === 1} />
            <AllRoomsSkeleton isMyRoom={currentTab === 1} />
          </>
        )}
        <ToastContainer />
      </section>
      <Modal setShowModal={setShowModal} showModal={showModal}>
        <div className="flex flex-col justify-between h-full w-full">
          <div className="flex items-center justify-between">
            <div></div>
            <span className="text-black font-bold text-xl opacity-100">
              Create a Game
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
                callFunction("initGame", {}, currentBet).then(() => {
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
    </div>
  );
}

export default Dashboard;