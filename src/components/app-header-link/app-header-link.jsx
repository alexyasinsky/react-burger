import {NavLink} from "react-router-dom";
import styles from "./app-header-link.module.scss";
import {cloneElement} from "react";


export default function AppHeaderLink({href, icon, title}) {
  return (
    <NavLink to={href} className={`${styles.link} pl-5 pr-5 pb-4 pt-4`} >
      {({isActive}) => {
        return (
          <>
          {cloneElement(icon, { type: isActive ? 'primary' : 'secondary' })}
          <p className={`text text_type_main-default ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}>{title}</p>
          </>
        )
      }}
    </NavLink>
  )
}