import {NavLink} from "react-router-dom";
import styles from "./app-header-link.module.scss";
import {cloneElement, ReactElement, JSX} from "react";

type TProps = {
  href: string,
  icon?: ReactElement,
  title: string
}
export default function AppHeaderLink({href, icon, title} : TProps) : JSX.Element {
  return (
    <NavLink
      to={href}
      className={`${styles.link} pl-5 pr-5 pb-4 pt-4`}
      data-test-link={href}
    >
      {({isActive}) => {
        return (
          <>
          {icon && cloneElement(icon, { type: isActive ? 'primary' : 'secondary' })}
          <p className={`text text_type_main-default ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}>{title}</p>
          </>
        )
      }}
    </NavLink>
  )
}