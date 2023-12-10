import styles from './filling-item.module.scss';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {removeFilling, sortFilling} from "../../../services/store/burger-constructor/reducers";
import {useDispatch} from "react-redux";
import {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import {ingredientPropType} from "../../../services/prop-types";
import PropTypes from "prop-types";


export default function FillingItem ({ingredient, index, extraClass}) {

  const dispatch = useDispatch();
  function deleteButtonHandler(e){
    const index = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.index;
    dispatch(removeFilling(index));
  }
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'sortable',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      dispatch(sortFilling({from: dragIndex, to: hoverIndex, item: item.ingredient}));
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'sortable',
    item: () => {
      return { ingredient, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <div
      className={styles.item}
      data-index={index}
      style={{ opacity }} data-handler-id={handlerId}
    >
      <div ref={ref}>
        <DragIcon type="primary"/>
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        extraClass={extraClass}
        handleClose={deleteButtonHandler}
      />
    </div>
  )
}

FillingItem.propTypes = {
  ingredient: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired,
  extraClass: PropTypes.object.isRequired
}