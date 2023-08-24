import "./Navbar.css";
import logo from "../assets/logo.png";
// Components
import { NavLink, Link } from "react-router-dom";
import {
	BsSearch,
	BsHouseDoorFill,
	BsFillPersonFill,
	BsFillCameraFill,
} from "react-icons/bs";

// hooks
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../slices/authSlice";
import { useState } from "react";

const Navbar = () => {
	const { auth } = useAuth();
	const { user } = useSelector((state) => state.auth);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [showMenu, setShowMenu] = useState(false);
	const [query, setQuery] = useState("");

	const handleMenu = () => {
		setShowMenu(!showMenu);
	};

	const handleLogout = () => {
		dispatch(logout());
		dispatch(reset());

		navigate("/login");
	};
	const handleSearch = (e) => {
		e.preventDefault();

		if (query) {
			return navigate(`/search?q=${query}`);
		}
		return;
	};

	return (
		<div>
			<nav id="nav" className={showMenu ? "active" : ""}>
				<div className="header">
				<Link to="/">
					<img src={logo} className="logo" alt="Lendas do Roblox" />
				</Link>
				<form id="search-form" onSubmit={handleSearch}>
					<BsSearch />
					<input
						type="text"
						placeholder="Buscar"
						onChange={(e) => setQuery(e.target.value)}
					/>
				</form>

				</div>
				<ul id="nav-links" role="menu">
					{auth ? (
						<>
							<li>
								<NavLink to="/">
									<BsHouseDoorFill /> {showMenu && "Home"}
								</NavLink>
							</li>
							{user && (
								<li>
									<NavLink to={`/users/${user._id}`}>
										<BsFillCameraFill /> {showMenu && "Minhas fotos"}
									</NavLink>
								</li>
							)}
							<li>
								<NavLink to="/profile">
									<BsFillPersonFill /> {showMenu && "Perfil"}
								</NavLink>
							</li>
							<li>
								<span onClick={handleLogout}>Sair</span>
							</li>
						</>
					) : (
						<>
							<li>
								<NavLink to="/login">Entrar</NavLink>
							</li>
							<li>
								<NavLink to="/register">Registar</NavLink>
							</li>
						</>
					)}
				</ul>
				<button
					id="btn-mobile"
					onClick={handleMenu}
					aria-expanded={showMenu}
					aria-haspopup="true"
					aria-label={showMenu ? "Fechar Menu" : "Abrir Menu"}
				>
					<span id="hamburguer"></span>
				</button>
				
			</nav>
		</div>
	);
};

export default Navbar;
