import { Link } from 'react-router-dom'

export const Navbar = () => {
    return <header>
        <div className=''>
            <Link to='/'>
                <img src="" alt="" />
            </Link>
            <nav>
                <Link to='/room'>Room</Link>
            </nav>
        </div>
    </header>
}