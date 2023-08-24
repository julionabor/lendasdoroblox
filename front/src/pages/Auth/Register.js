import "./Auth.css";
// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";
// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { register, reset } from "../../slices/authSlice";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch();

	const { loading, error } = useSelector((state) => state.auth);

	const handleSubmit = (e) => {
		e.preventDefault();

		const user = {
			name,
			email,
			password,
			confirmPassword,
		};

		dispatch(register(user));
	};
	// Clean auth all states
	useEffect(() => {
		dispatch(reset());
		return;
	}, [dispatch]);

	return (
		<div id="register">
			<h2>És uma lenda do Roblox?</h2>
			<p className="subtitle">Registe-se para poder publicar suas mitagens!</p>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					onChange={(e) => setName(e.target.value)}
					value={name || ""}
					placeholder="Nome"
					autoComplete="Nome"
				/>
				<input
					type="text"
					onChange={(e) => setEmail(e.target.value)}
					value={email || ""}
					placeholder="Email"
					autoComplete="Email"
				/>
				<input
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password || ""}
					placeholder="Palavra Passe"
					autoComplete="Palavra Passe"
				/>
				<input
					type="password"
					onChange={(e) => setConfirmPassword(e.target.value)}
					value={confirmPassword || ""}
					placeholder="Confirme a Palavra Passe"
					autoComplete="Confirme a Palavra Passe"
				/>
				{ !loading && <input type="submit" value="Registar" /> }
				{ loading && <input type="submit" value="Aguarde..." disabled /> }
				{ error && <Message msg={error} type="error" /> }
				
			</form>
			<p>
				Já possui conta? <Link to="/login">Clique aqui </Link>para efectuar o
				Login
			</p>
		</div>
	);
};

export default Register;
