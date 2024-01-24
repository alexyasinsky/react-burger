import styles from './ingredient-details.module.scss';
import {useSelector} from "react-redux";
import {selectIngredients} from "../../services/store/burger-ingredients/reducers";
import {useParams} from "react-router-dom";
import {JSX} from "react";
import {TIngredient} from "../../utils/types";

export default function IngredientDetails(): JSX.Element {

    const ingredients: Array<TIngredient> = useSelector(selectIngredients);

    const {id} = useParams();

    const ingredient = ingredients.find(ingredient => ingredient._id === id);

    return (

        <div>
            <header>
                <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
            </header>
            {
                ingredient && (
                    <article className={styles.card}>
                        <img src={ingredient.image} alt={ingredient.name}/>
                        <h3 className="text text_type_main-medium mt-4 mb-8">
                            {ingredient.name}
                        </h3>
                        <div className={styles.details}>
                            <div className="mb-5">
                                <h6 className="text text_type_main-small text_color_inactive">
                                    Калории, ккал
                                </h6>
                                <p className="text text_type_digits-default text_color_inactive">
                                    {ingredient.calories}
                                </p>
                            </div>
                            <div>
                                <h6 className="text text_type_main-small text_color_inactive">
                                    Белки, г
                                </h6>
                                <p className="text text_type_digits-default text_color_inactive">
                                    {ingredient.proteins}
                                </p>
                            </div>
                            <div>
                                <h6 className="text text_type_main-small text_color_inactive">
                                    Жиры, г
                                </h6>
                                <p className="text text_type_digits-default text_color_inactive">
                                    {ingredient.fat}
                                </p>
                            </div>
                            <div>
                                <h6 className="text text_type_main-small text_color_inactive">
                                    Углеводы, г
                                </h6>
                                <p className="text text_type_digits-default text_color_inactive">
                                    {ingredient.carbohydrates}
                                </p>
                            </div>
                        </div>
                    </article>
                )
            }

        </div>
    );
}
