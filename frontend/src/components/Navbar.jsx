import { useSelector } from "react-redux"
import CreateBtn from "./CreateBtn";

const Navbar = () => {
    const { user } = useSelector(state => state.user);

    return (
        <header className="sticky-top shadow-sm">
            <nav className="navbar bg-primary">
                <div className="container d-flex align-items-center px-3">
                    <div className="col-3">
                        <a className="navbar-brand text-white" href="/">Deep</a>
                    </div>
                    <div className="col-6">
                        <input className="form-control rounded-pill" placeholder="Search on Deep" />
                    </div>
                    <div className="col-3 d-flex align-items-center justify-content-center">
                        <CreateBtn />
                        {user ? (
                            <span className="text-white">{user.username}</span>
                        ) : ''}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar