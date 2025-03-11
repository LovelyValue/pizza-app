import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart.slice'; // исправлен импорт
import { saveState } from './storage';
import userReducer, { JWT_PERSISTENT_STATE } from './user.slice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		cart: cartReducer,
	},
});

store.subscribe(() => {
	saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
