import BurgerConstructorTotal from './burger-constructor-total/burger-constructor-total';

import Fillings from "./fillings/fillings";
import Bun from "./bun/bun";
import {useDrop} from "react-dnd";
import {setBun} from "../../services/store/burger-constructor/reducers";
import {JSX} from "react";
import {TIngredient} from "../../utils/types";
import {useAppDispatch} from "../../services/store/hooks";

type TTopBunDropCollectedProps = {
  isTopBunHover: boolean
}

type TBottomBunDropCollectedProps = {
  isBottomBunHover: boolean
}
export default function BurgerConstructor(): JSX.Element {

  const dispatch = useAppDispatch();

  const [{isTopBunHover}, topBunDropTarget] = useDrop<TIngredient, unknown, TTopBunDropCollectedProps>({
    accept: "bun",
    drop(ingredient) {
      bunDropHandler(ingredient);
    },
    collect: monitor => ({
      isTopBunHover: monitor.isOver(),
    })
  });

  const [{isBottomBunHover}, bottomBunDropTarget] = useDrop<TIngredient, unknown, TBottomBunDropCollectedProps>({
    accept: "bun",
    drop(ingredient) {
      bunDropHandler(ingredient);
    },
    collect: monitor => ({
      isBottomBunHover: monitor.isOver(),
    })
  });
  function bunDropHandler(ingredient: TIngredient) {
    dispatch(setBun(ingredient));
  }

  const isBunHover = isTopBunHover || isBottomBunHover;

  return (
    <section>
      <Bun viewType="top" ref={topBunDropTarget} isHover={isBunHover}/>
      <Fillings/>
      <Bun viewType="bottom" ref={bottomBunDropTarget} isHover={isBunHover}/>
      <BurgerConstructorTotal/>
    </section>
  )
}
