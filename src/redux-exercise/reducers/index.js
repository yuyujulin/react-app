/**
 * Created by pjl on 2016/11/29/0029.
 */
export default (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }

}
