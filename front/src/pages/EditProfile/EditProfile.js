import "./EditProfile.css";
import { uploads } from "../../utils/config";
// Redux
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";
// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import Message from "../../components/Message";

const EditProfile = () => {
	const dispatch = useDispatch();

	const { user, message, error, loading } = useSelector((state) => state.user);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [profileImage, setProfileImage] = useState("");
	const [bio, setBio] = useState("");
	const [previewImage, setPreviewImage] = useState("");

	// load user data

	useEffect(() => {
		dispatch(profile());
	}, [dispatch]);

	// Fill form user data
	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setBio(user.bio);
		}
	}, [user]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		// Gather user data from states
		const userData = {
			name,
		};
		if (profileImage) {
			userData.profileImage = profileImage;
		}
		if (bio) {
			userData.bio = bio;
		}
		if (password) {
			userData.password = password;
		}
		// Build form data
		const formData = new FormData();

		const userFormData = Object.keys(userData).forEach((key) =>
			formData.append(key, userData[key])
		);
		formData.append("user", userFormData);
		await dispatch(updateProfile(formData));

		setTimeout(() => {
			dispatch(resetMessage());
		}, 2000);
	};
	const handleFile = (e) => {
		// Image preview
		const image = e.target.files[0];
		setPreviewImage(image);
		// update image state
		setProfileImage(image);
	};

	return (
		<div id="edit-profile">
			<h2>Edite seus dados</h2>
			<p className="subtitle">
				Adicione uma imagem de perfil e conte mais sobre você...
			</p>
			{(user.profileImage || previewImage) && (
				<img
					className="profile-image"
					src={
						previewImage
							? URL.createObjectURL(previewImage)
							: `${uploads}/users/${user.profileImage}`
					}
					alt={user.name}
				/>
			)}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Nome"
					onChange={(e) => setName(e.target.value)}
					value={name || ""}
				/>
				<input
					type="text"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
					value={email || ""}
					disabled
				/>
				<label>
					<span>Imagem do perfil:</span>
					<input type="file" onChange={handleFile} />
				</label>
				<label>
					<span>Descrição do perfil:</span>
					<input
						type="text"
						placeholder="Descrição do Perfil"
						onChange={(e) => setBio(e.target.value)}
						value={bio || ""}
					/>
				</label>
				<label>
					<span>Deseja alterar sua palavra passe?</span>
					<input
						type="text"
						placeholder="Digite sua nova palavra passe"
						onChange={(e) => setPassword(e.target.value)}
						value={password || ""}
					/>
				</label>
				{!loading && <input type="submit" value="Actualizar" />}
				{loading && <input type="submit" value="Aguarde..." disabled />}
				{error && <Message msg={error} type="error" />}
				{message && <Message msg={message} type="success" />}
			</form>
		</div>
	);
};

export default EditProfile;
