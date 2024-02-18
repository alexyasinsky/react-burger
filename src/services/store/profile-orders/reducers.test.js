import reducer, {initialState} from "./reducers";
import {
  profileOrdersWsClose,
  profileOrdersWsConnecting,
  profileOrdersWsError,
  profileOrdersWsMessage,
  profileOrdersWsOpen
} from "./actions";


describe('testing profile-orders reducer', () => {

  const orders = [{
    _id: '65d222ff97ede0001d05cb4f',
    ingredients: [
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2024-02-18T15:32:15.004Z',
    updatedAt: '2024-02-18T15:32:15.461Z',
    number: 34464
  }, {
    _id: '65d222ff97ede0001d05cb4f',
    ingredients: [
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2024-02-18T15:32:15.004Z',
    updatedAt: '2024-02-18T15:32:15.461Z',
    number: 34465
  }
  ]

  const reverseOrders = orders.reverse();

  test('should return initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState)
  });

  test("should set status to 'WebsocketStatus.CONNECTING' after profileOrdersWsConnecting action", () => {
    expect(reducer(undefined, profileOrdersWsConnecting())).toEqual({
      ...initialState,
      status: 'WebsocketStatus.CONNECTING'
    })
  })

  test("should set status to 'WebsocketStatus.ONLINE' after profileOrdersWsOpen action", () => {
    expect(reducer(undefined, profileOrdersWsOpen())).toEqual({...initialState, status: 'WebsocketStatus.ONLINE'})
  })

  test("should set status to 'WebsocketStatus.OFFLINE' after profileOrdersWsClose action", () => {
    expect(reducer(undefined, profileOrdersWsClose())).toEqual({...initialState, status: 'WebsocketStatus.OFFLINE'})
  })

  test("should set error to 'error' after profileOrdersWsError action", () => {
    expect(reducer(undefined, profileOrdersWsError('error'))).toEqual({...initialState, connectionError: 'error'})
  })

  test("should set orders, totalToday and total after profileOrdersWsMessage action", () => {
    expect(reducer(undefined, profileOrdersWsMessage({success: true, orders: orders})))
      .toEqual({
        ...initialState,
        orders: reverseOrders,
      })
  })

})