import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
	photos: [],
	photo: {},
	error: false,
	loading: false,
	message: null,
};

// Publish an user photo
export const publishPhoto = createAsyncThunk(
	"photo/publish",
	async (photo, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await photoService.publishPhoto(photo, token);

		if (data.errors) {
			return thunkAPI.rejectWithValue(data.errors[0]);
		}
		return data;
	}
);
// Get user photos
export const getUserPhotos = createAsyncThunk(
	"photo/userphotos",
	async (id, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await photoService.getUserPhotos(id, token);

		return data;
	}
);
// Delete a photo

export const deletePhoto = createAsyncThunk(
	"photo/delete",
	async (id, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await photoService.deletePhoto(id, token);

		if (data.errors) {
			return thunkAPI.rejectWithValue(data.errors[0]);
		}

		return data;
	}
);
// Update a photo
export const updatePhoto = createAsyncThunk(
	"photo/update",
	async (photoData, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;
		const data = await photoService.updatePhoto(
			{ title: photoData.title },
			photoData.id,
			token
		);
		// Check for errors
		if (data.errors) {
			return thunkAPI.rejectWithValue(data.errors[0]);
		}
		return data;
	}
);
// Get a photo by Id
export const getPhoto = createAsyncThunk(
	"photo/getPhoto",
	async (id, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;
		const data = await photoService.getPhoto(id, token);
		return data;
	}
);
// Like a like
export const like = createAsyncThunk("photo/like", async (id, thunkAPI) => {
	const token = thunkAPI.getState().auth.user.token;
	const data = await photoService.like(id, token);

	if (data.errors) {
		return thunkAPI.rejectWithValue(data.errors[0]);
	}

	return data;
});
// Add comment
export const comment = createAsyncThunk(
	"photo/comment",
	async (commentData, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await photoService.comment(
			{ comment: commentData.comment },
			commentData.id,
			token
		);

		if (data.errors) {
			return thunkAPI.rejectWithValue(data.errors[0]);
		}

		return data;
	}
);
// Get all photos
export const getPhotos = createAsyncThunk(
	"photo/getall",
	async (_, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await photoService.getPhotos(token);

		return data;
	}
);
// Search photo
export const searchPhotos = createAsyncThunk(
	"photos/search",
	async (query, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await photoService.searchPhotos(query, token);

		return data;
	}
);
export const photoSlice = createSlice({
	name: "publish",
	initialState,
	reducers: {
		resetMessage: (state) => {
			state.message = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(publishPhoto.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(publishPhoto.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.error = null;
				state.photo = action.payload;
				state.photos.unshift(state.photo);
				state.message = "Foto publicada com sucesso!";
			})
			.addCase(publishPhoto.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.photo = null;
			})
			.addCase(getUserPhotos.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getUserPhotos.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.error = null;
				state.photos = action.payload;
			})
			.addCase(deletePhoto.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deletePhoto.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.error = null;

				state.photos = state.photos.filter((photo) => {
					return photo._id !== action.payload.id;
				});
				state.message = action.payload.message;
			})
			.addCase(deletePhoto.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.photo = {};
			})
			.addCase(updatePhoto.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updatePhoto.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.error = null;

				state.photos.map((photo) => {
					if (photo._id === action.payload.photo._id) {
						return (photo.title = action.payload.photo.title);
					}
					return photo;
				});
				state.message = action.payload.message;
			})
			.addCase(updatePhoto.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.photo = {};
			})
			.addCase(getPhoto.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getPhoto.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.error = null;
				state.photo = action.payload;
			})
			.addCase(like.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			.addCase(like.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.error = null;

				if (state.photo.likes) {
					state.photo.likes.push(action.payload.userId);
				}

				state.photos.map((photo) => {
					if (photo._id === action.payload.photoId) {
						return photo.likes.push(action.payload.userId);
					}
					return photo;
				});
				state.message = action.payload.message;
			})
			.addCase(comment.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			.addCase(comment.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.error = null;

				state.photo.comments.push(action.payload.comment);

				state.message = action.payload.message;
			})
			.addCase(getPhotos.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getPhotos.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.error = null;
				state.photos = action.payload;
			})
			.addCase(searchPhotos.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(searchPhotos.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.error = null;
				state.photos = action.payload;
			})
	},
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
