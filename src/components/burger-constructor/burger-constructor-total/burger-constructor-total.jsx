import styles from './burger-constructor-total.module.scss';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../../modal/modal';
import OrderDetails from '../../order-details/order-details';
import PropTypes from "prop-types";
import { useModal } from '../../../hooks/useModal';

export default function BurgerConstructorTotal({sum = 0}) {

  const { isModalOpen, openModal, closeModal } = useModal();  

  return (
    <>
      <div className={`${styles.total} mt-10 pr-4`}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{sum}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={openModal}
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10" 
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

BurgerConstructorTotal.propTypes = {
  sum : PropTypes.number
}
