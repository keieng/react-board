import { Outlet, Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="navbar-start">
        <Link className="btn btn-ghost normal-case text-xl" to={`/`}>
          掲示板
        </Link>
      </div>
      <div className="navbar-end">
        <Link className="btn underline" to={`thread/new`}>
          スレッドをたてる
        </Link>
      </div>
    </div>
  )
}

export default Header
