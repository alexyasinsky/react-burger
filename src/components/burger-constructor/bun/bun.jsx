import styles from './bun.module.scss';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {selectBun} from "../../../services/store/burger-constructor/reducers";
import {forwardRef} from "react";
import PropTypes from "prop-types";


const Bun = forwardRef(({viewType, isHover}, ref) => {

  const bun = useSelector(selectBun);

  const hoverClass = isHover ? styles.ingredient_hovered : styles.ingredient;

  const borderClass = viewType === 'top' ? styles.empty_top : styles.empty_bottom;

  return (
    <>
      {bun === null ?
        (<div className={`${styles.empty} ${borderClass} ${hoverClass} ml-8 mr-4`} ref={ref}>
          <p className="text text_type_main-default">Выберите булку</p>
        </div>)
        :
        (<div
          ref={ref}
        >
          <ConstructorElement
            type={viewType}
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            extraClass={`${hoverClass} mr-4 ml-8`}
          />
        </div>)
      }
    </>
  )})

Bun.propTypes = {
  viewType : PropTypes.string.isRequired,
  isHover: PropTypes.bool.isRequired
}

export default Bun;