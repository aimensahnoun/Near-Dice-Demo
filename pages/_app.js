//Importing Css
import "../styles/globals.css";

//Dependencies imports
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

//Near imports
import { initNear, wallet } from "../near/near-setup";

//Redux import
import { wrapper } from "../redux/store";
import { setCurrentUser } from "../redux/general/general.actions";
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  //Loading the NEAR API and setting up the wallet and contract
  //At the start of the app
  useEffect(() => {
    initNear();
    if (wallet) {
      let user = wallet.getAccountId();
      dispatch(setCurrentUser(user));
    }
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <div className="w-screen h-screen flex justify-center items-center">
      <ClipLoader color={"#000"} loading={true} size={50} />
    </div>
  ) : (
    <Component {...pageProps} />
  );
}

export default wrapper.withRedux(MyApp);
