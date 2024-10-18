import BottomCategory from "../components/BottomCategory";
import HeaderCategory from "../components/HeaderCategory";
import styles from "../css/routes/Home.module.css";
import DefaultMain from "./DefaultMain";
import useStore from "../../stores/useSignInStore";
import { useCookies } from "react-cookie";

function Home() {

    const signInUser = useStore();
    const [cookies] = useCookies();

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <HeaderCategory ></HeaderCategory>
                </div>
                <DefaultMain></DefaultMain>
                <div className={styles.bottom}>
                    <BottomCategory></BottomCategory>
                </div>
            </div>
        </>
    )
}

export default Home;