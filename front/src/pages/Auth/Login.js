import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.auth);
	const handleSubmit = (e) => {
		e.preventDefault();

		const user = {
			email,
			password,
		};
		dispatch(login(user));
	};
	// Clean all auth states
	useEffect(() => {
		dispatch(reset());
	}, [dispatch]);
	return (
		<div id="login">
			<h2>Lendas do Roblox</h2>
			<p className="subtitle">
				Faça o login para ver as publicações das lendas do Roblox.
			</p>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
					value={email || ""}
				/>
				<input
					type="password"
					placeholder="Password"
					autoComplete="Password"
					onChange={(e) => setPassword(e.target.value)}
					value={password || ""}
				/>
				{!loading && <input type="submit" value="Entrar" />}
				{loading && <input type="submit" value="Aguarde..." disabled />}
				{error && <Message msg={error} type="error" />}

				<p>
					Não possui uma conta? <Link to="/register">Clique aqui</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
