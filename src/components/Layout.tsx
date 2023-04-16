import styles from "./layout.module.css";

export default (props: { children?: JSX.Element | JSX.Element[] }) => {
  return <div className={styles.main}>{props.children}</div>;
};
