import "./Profile.css";

import { uploads } from "../../utils/config";

// Components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../slices/userSlice";
import {
	publishPhoto,
	getUserPhotos,
	deletePhoto,
	updatePhoto,
} from "../../slices/photoSlice";

import ResetComponentMessage from "../../components/ResetComponentMessage";

const Profile = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { user, loading } = useSelector((state) => state.user);
	const { user: userAuth } = useSelector((state) => state.auth);
	const {
		photos,
		loading: loadingPhoto,
		message: messagePhoto,
		error: errorPhoto,
	} = useSelector((state) => state.photo);

	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");

	const [editId, setEditId] = useState("");
	const [editTitle, setEditTitle] = useState("");
	const [editImage, setEditImage] = useState("");

	// New form and edit form refs
	const newPhotoForm = useRef();
	const editPhotoForm = useRef();

	useEffect(() => {
		dispatch(getUserDetails(id));
		dispatch(getUserPhotos(id));
		return;
	}, [dispatch, id]);

	const handleFile = (e) => {
		// Image preview
		const image = e.target.files[0];
		setImage(image);
	};

	if (loading) {
		return <p>A carregar</p>;
	}
	// const resetComponentMessage = () => {
	// 	setTimeout(() => {
	// 		dispatch(resetMessage());
	// 	}, 2000);
	// };
	const submitHandle = (e) => {
		e.preventDefault();
		// Build form data
		const photoData = {
			title,
			image,
		};

		const formData = new FormData();

		const photoFormData = Object.keys(photoData).forEach((key) =>
			formData.append(key, photoData[key])
		);

		formData.append("photo", photoFormData);

		dispatch(publishPhoto(formData));
		setTitle("");
		ResetComponentMessage();
		return;
		// resetComponentMessage();
	};

	// Delete a photo
	const handleDelete = (id) => {
		dispatch(deletePhoto(id));
		ResetComponentMessage();
		// resetComponentMessage();
	};

	// Update a photo
	const handleUpdate = (e) => {
		e.preventDefault();

		const photoData = {
			title: editTitle,
			id: editId,
		};
		dispatch(updatePhoto(photoData));

		ResetComponentMessage();
		// resetComponentMessage();
	};
	// Show or hide forms
	const hideOrShowForms = () => {
		newPhotoForm.current.classList.toggle("hide");
		editPhotoForm.current.classList.toggle("hide");
	};
	// Open Edit Form
	const handleEdit = (photo) => {
		if (editPhotoForm.current.classList.contains("hide")) {
			hideOrShowForms();
		}
		setEditId(photo._id);
		setEditTitle(photo.title);
		setEditImage(photo.image);
	};
	// Cancel Edit
	const handleCancelEdit = () => {
		hideOrShowForms();

		if (loading) {
			return <p>A carregar</p>;
		}
		return;
	};

	return (
		<div id="profile">
			<div className="profile-header">
				{user.profileImage && (
					<img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
				)}
				<div className="profile-description">
					<h2>{user.name}</h2>
					<p>{user.bio}</p>
				</div>
			</div>
			{id === userAuth._id && (
				<>
					<div className="new-photo" ref={newPhotoForm}>
						<h3>Partilhe uma nova mitagem:</h3>
						<form onSubmit={submitHandle}>
							<label>
								<span>Título para a imagem:</span>
								<input
									type="text"
									placeholder="Insira um título"
									onChange={(e) => setTitle(e.target.value)}
									value={title || ""}
								/>
							</label>
							<label>
								<span>Imagem:</span>
								<input type="file" onChange={handleFile} />
							</label>
							{!loadingPhoto ? (
								<input type="submit" value="Publicar" />
							) : (
								<input type="submit" value="Aguarde..." disabled />
							)}
						</form>
					</div>
					<div className="edit-photo hide" ref={editPhotoForm}>
						<p>Editando</p>
						{editImage && (
							<img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
						)}
						<form onSubmit={handleUpdate}>
							<input
								type="text"
								placeholder="Insira um novo título"
								onChange={(e) => setEditTitle(e.target.value)}
								value={editTitle || ""}
							/>
							<input type="submit" value="Actualizar" />
						</form>
						<button className="cancel-btn" onClick={handleCancelEdit}>
							Cancelar Edição
						</button>
					</div>
					{errorPhoto && <Message msg={errorPhoto} type="error" />}
					{messagePhoto && <Message msg={messagePhoto} type="success" />}
				</>
			)}

			<div className="user-photos">
				<h2>Fotos publicadas:</h2>
				<div className="photos-container">
					{photos &&
						photos.map((photo) => (
							<div className="photo" key={photo._id}>
								{photo.image && (
									<img
										src={`${uploads}/photos/${photo.image}`}
										alt={photo.title}
									/>
								)}
								{id === userAuth._id ? (
									<div className="actions">
										<Link to={`/photos/${photo._id}`}>
											<BsFillEyeFill />
										</Link>
										<BsPencilFill onClick={() => handleEdit(photo)} />
										<BsXLg onClick={() => handleDelete(photo._id)} />
									</div>
								) : (
									<Link className="btn" to={`/photos/${photo._id}`}>
										Ver
									</Link>
								)}
							</div>
						))}

					{photos.length === 0 && <p>Ainda não há fotos publicadas!</p>}
				</div>
			</div>
		</div>
	);
};

export default Profile;
