import styles from "./form-navigation.module.scss";
import {Link} from "react-router-dom";
import {JSX} from "react";


type TProps = {
  links: Array<{
    href: string,
    question: string,
    title: string
  }>
}
export default function FormNavigation({links}: TProps): JSX.Element{

  return (
    <div className={`${styles.wrapper} mt-20`}>
      {
        links.map(({href, question, title}, ind) => {
          return (
            <p
              className="text text_type_main-default text_color_inactive"
              key={ind}
            >
              {question}
              <Link to={href} className={`${styles.link} text text_type_main-default ml-2`}>
                {title}
              </Link>
            </p>
          )
        })}
    </div>
  )
}