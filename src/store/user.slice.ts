import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PREFIX } from '../helpers/API';
import { LoginResponse } from '../interfaces/auth.interface';
import { Profile } from '../interfaces/user.interface';
import { loadState } from './storage';
import { RootState } from './store';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
	jwt: string | null;
}

export interface UserState {
	jwt: string | null;
	loginErrorMessage?: string;
	profile?: Profile;
}

const initialState: UserState = {
	jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const login = createAsyncThunk(
	'user/login',
	async (params: { email: string; password: string }, { rejectWithValue }) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password,
			});

			return data;
		} catch (e) {
			if (axios.isAxiosError(e)) {
				return rejectWithValue(
					e.response?.data?.message || 'Ошибка авторизации'
				);
			}
			return rejectWithValue('Неизвестная ошибка');
		}
	}
);

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
	'user/profile',
	async (_, thunkApi) => {
		const jwt = thunkApi.getState().user.jwt;
		const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});

		return data;
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: state => {
			state.jwt = null;
		},
		clearLoginError: state => {
			state.loginErrorMessage = undefined;
		},
	},
	extraReducers: builder => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
			state.loginErrorMessage = undefined; // Очищаем ошибку при успешном входе
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.payload as string;
		});
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.profile = action.payload;
		});
	},
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
