import styles from './filling-item.module.scss';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {removeFilling} from "../../../services/store/burger-constructor/reducers";
import {useDispatch} from "react-redux";


export default function FillingItem ({item, index, extraClass}) {

  const dispatch = useDispatch();
  function deleteButtonHandler(e){
    const index = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.index;
    dispatch(removeFilling(index));
  }

  return (
    <div
      className={styles.item}
      data-index={index}
    >
      <DragIcon type="primary"/>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        extraClass={extraClass}
        handleClose={deleteButtonHandler}
      />
    </div>
  )
}