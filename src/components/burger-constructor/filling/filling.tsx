import styles from './filling.module.scss';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {removeFilling, sortFilling} from "../../../services/store/burger-constructor/reducers";
import {JSX, useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import {TFillingIngredient} from "../../../utils/types";
import {Identifier} from 'dnd-core';
import {useAppDispatch} from "../../../services/store/hooks";

type TProps = {
  ingredient: TFillingIngredient;
  index: number;
  extraClass: string;
}

type TDnDDragObject = {
  ingredient: TFillingIngredient;
  index: number;
}

type TDragCollectedProps = {
  isDragging: boolean
}

type TDropCollectedProps = {
  handlerId: Identifier | null
}

export default function Filling ({ingredient, index, extraClass}: TProps) : JSX.Element {

  const dispatch = useAppDispatch();
  function deleteButtonHandler(){
    dispatch(removeFilling(index));
  }
  const ref = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag<TDnDDragObject, unknown, TDragCollectedProps>({
    type: 'sortable',
    item: () => {
      return { ingredient, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1

  const [{ handlerId }, drop] = useDrop<TDnDDragObject, unknown, TDropCollectedProps>({
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
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

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

  drag(drop(ref))

  return (
    <div
      className={styles.item}
      style={{ opacity }}
      data-handler-id={handlerId}
      data-test-filling-id={ingredient._id}
    >
      <div ref={ref}>
        <DragIcon type="primary"/>
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={+ingredient.price}
        thumbnail={ingredient.image}
        extraClass={extraClass}
        handleClose={deleteButtonHandler}
      />
    </div>
  )
}