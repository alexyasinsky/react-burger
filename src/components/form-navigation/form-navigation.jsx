import styles from "./form-navigation.module.scss";


export default function FormNavigation({links}) {

  return (
    <div className={`${styles.wrapper} mt-20`}>
      {
        links.map(({href, question}, ind) => {

          let title;

          switch (href) {
            case '/register':
              title = 'Зарегистрироваться'
              break
            default:
              title = 'Войти'
              break
          }

          return (
            <p
              className="text text_type_main-default text_color_inactive"
              key={ind}
            >
              {question}
              <a href={href} className={`${styles.link} text text_type_main-default ml-2`}>
                {title}
              </a>
            </p>
          )
        })}
    </div>
  )

}