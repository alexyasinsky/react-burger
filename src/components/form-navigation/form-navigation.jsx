import styles from "./form-navigation.module.scss";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";


export default function FormNavigation({links}) {

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

FormNavigation.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    title:PropTypes.string.isRequired
  }))
}