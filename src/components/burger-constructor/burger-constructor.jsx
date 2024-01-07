import BurgerConstructorTotal from './burger-constructor-total/burger-constructor-total';

import Fillings from "./fillings/fillings";
import Bun from "./bun/bun";
import {useDispatch} from "react-redux";
import {useDrop} from "react-dnd";
import {setBun} from "../../services/store/burger-constructor/reducers";

export default function BurgerConstructor() {

  const dispatch = useDispatch();

  const [{isTopBunHover}, topBunDropTarget] = useDrop({
    accept: "bun",
    drop(ingredient) {
      bunDropHandler(ingredient);
    },
    collect: monitor => ({
      isTopBunHover: monitor.isOver(),
    })
  });

  const [{isBottomBunHover}, bottomBunDropTarget] = useDrop({
    accept: "bun",
    drop(ingredient) {
      bunDropHandler(ingredient);
    },
    collect: monitor => ({
      isBottomBunHover: monitor.isOver(),
    })
  });
  function bunDropHandler(ingredient) {
    dispatch(setBun(ingredient));
  }

  const isBunHover = isTopBunHover || isBottomBunHover;

  return (
    <section className="pt-10">
      <Bun viewType="top" ref={topBunDropTarget} isHover={isBunHover}/>
      <Fillings/>
      <Bun viewType="bottom" ref={bottomBunDropTarget} isHover={isBunHover}/>
      <BurgerConstructorTotal/>
    </section>
  )
}
