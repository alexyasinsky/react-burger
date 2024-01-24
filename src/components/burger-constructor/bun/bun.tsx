import styles from './bun.module.scss';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {selectBun} from "../../../services/store/burger-constructor/reducers";
import {forwardRef, JSX} from "react";
import {TIngredient} from "../../../utils/types";


type TBunProps = {
  viewType: 'top' | 'bottom',
  isHover: boolean
}

const Bun = forwardRef<HTMLDivElement, TBunProps>(({viewType, isHover} : TBunProps, ref) : JSX.Element => {

  const bun: TIngredient | null = useSelector(selectBun);

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
            text={`${bun['name']} (верх)`}
            price={Number(bun['price'])}
            thumbnail={bun['image']}
            extraClass={`${hoverClass} mr-4 ml-8`}
          />
        </div>)
      }
    </>
  )})

export default Bun;