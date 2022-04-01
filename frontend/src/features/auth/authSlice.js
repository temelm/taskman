import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage.
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user || null,
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  message: ''
}

// Create user.
export const createUser = createAsyncThunk('auth/signup', async (user, thunkAPI) => {
  try {
    return await authService.createUser(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Login user.
export const loginUser = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.loginUser(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message)
      || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Logout user.
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await authService.logoutUser()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isFailure = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false
        state.isFailure = true
        state.message = action.payload
        state.user = null
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isFailure = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
      })
  }
})

export const {
  reset
} = authSlice.actions
export default authSlice.reducer