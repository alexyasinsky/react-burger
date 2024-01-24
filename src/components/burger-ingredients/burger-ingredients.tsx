import styles from './burger-ingredients.module.scss';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {selectIngredients} from '../../services/store/burger-ingredients/reducers';
import {useSelector} from 'react-redux';
import {JSX, MutableRefObject, useEffect, useMemo, useRef, useState} from "react";
import BurgerIngredientsGroup from "./burger-ingredients-group/burger-ingredients-group";
import {TIngredient} from "../../utils/types";

type TIngredientGroupRef = {
  [name: string] : MutableRefObject<HTMLElement | null>
}

export default function BurgerIngredients() : JSX.Element {

  const list: Array<TIngredient> = useSelector(selectIngredients);

  const buns = useMemo(
    () => list.filter((item) => item.type === 'bun'),
    [list]
  );

  const sauces = useMemo(
    () => list.filter((item) => item.type === 'sauce'),
    [list]
  );

  const main= useMemo(
    () => list.filter((item) => item.type === 'main'),
    [list]
  );

  const [currentTab, setCurrentTab] = useState<string>('buns');
  const [tabsRectY, setTabsRectY] = useState<number>(0);

  const tabsRef = useRef<HTMLDivElement | null>(null);

  const ingredientsGroupRef: TIngredientGroupRef = {
    buns: useRef<HTMLElement | null>(null),
    sauces: useRef<HTMLElement| null>(null),
    main: useRef<HTMLElement | null>(null),
  }
  function scrollHandler() {
    const bunY= ingredientsGroupRef.buns.current!.getBoundingClientRect().y || 0;
    const saucesY = ingredientsGroupRef.sauces.current!.getBoundingClientRect().y || 0;
    const mainY = ingredientsGroupRef.main.current!.getBoundingClientRect().y || 0;
    Math.abs(bunY) - tabsRectY <= 100  && setCurrentTab('buns');
    Math.abs(saucesY) - tabsRectY <= 100  && setCurrentTab('sauces');
    Math.abs(mainY) - tabsRectY <= 100  && setCurrentTab('main');
  }
  function saucesTabClickHandler(tab: string) {
    setCurrentTab(tab);
    ingredientsGroupRef[tab].current!.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setTabsRectY(tabsRef.current!.getBoundingClientRect().y || 0);
  }, []);

  return (
    <section className={`${styles.wrapper}`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <div className={`${styles.tabs} pb-5`} ref={tabsRef}>
        <Tab value="buns" active={currentTab === 'buns'} onClick={saucesTabClickHandler}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={saucesTabClickHandler}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={saucesTabClickHandler}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.list} custom-scroll`} onScroll={scrollHandler}>
        <BurgerIngredientsGroup title='Булки' ingredients={buns} ref={ingredientsGroupRef.buns}/>
        <BurgerIngredientsGroup title='Соусы' ingredients={sauces} ref={ingredientsGroupRef.sauces}/>
        <BurgerIngredientsGroup title='Начинки' ingredients={main} ref={ingredientsGroupRef.main}/>
      </div>
    </section>

  );
}
