import reducer, {initialState} from "./reducers";
import {
  feedOrdersWsClose,
  feedOrdersWsConnecting,
  feedOrdersWsError,
  feedOrdersWsMessage,
  feedOrdersWsOpen
} from "./actions";


describe('testing feed-orders reducer', () => {

  const order= {
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
  }

  test('should return initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState)
  });

  test("should set status to 'WebsocketStatus.CONNECTING' after feedOrdersWSConnecting action", () => {
    expect(reducer(undefined, feedOrdersWsConnecting())).toEqual({
      ...initialState,
      status: 'WebsocketStatus.CONNECTING'
    })
  })

  test("should set status to 'WebsocketStatus.ONLINE' after feedOrdersWsOpen action", () => {
    expect(reducer(undefined, feedOrdersWsOpen())).toEqual({...initialState, status: 'WebsocketStatus.ONLINE'})
  })

  test("should set status to 'WebsocketStatus.OFFLINE' after feedOrdersWsClose action", () => {
    expect(reducer(undefined, feedOrdersWsClose())).toEqual({...initialState, status: 'WebsocketStatus.OFFLINE'})
  })

  test("should set error to 'error' after feedOrdersWsError action", () => {
    expect(reducer(undefined, feedOrdersWsError('error'))).toEqual({...initialState, connectionError: 'error'})
  })

  test("should set orders, totalToday and total after feedOrdersWsMessage action", () => {
    expect(reducer(undefined, feedOrdersWsMessage({success: true, orders: [order], total: 2, totalToday: 1})))
      .toEqual({
        ...initialState,
        orders: [order],
        total: 2,
        totalToday: 1
      })
  })

})