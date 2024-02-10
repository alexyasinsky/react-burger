import {JSX} from "react";
import {PacmanLoader} from "react-spinners";
import styles from './loader.module.scss';
import {createPortal} from "react-dom";

export default function Loader (): JSX.Element {

  const loaderRoot = document.getElementById('react-loader')!;
  return createPortal(
    (<section className={styles.wrapper}>
      <div>
        <PacmanLoader
          loading={true}
          color="#F2F2F3"
          size={100}
          aria-label="Loading Spinner"
        />
      </div>
    </section>)
    ,
    loaderRoot
);
}