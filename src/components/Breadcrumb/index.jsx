import { MdArrowForwardIos } from 'react-icons/md'
import { Link } from 'react-router-dom'

function Breadcrumb() {
  return (
    <nav className="flex flex-row py-1  text-color_grey">
      <ol className="inline-flex items-center">
        <li className="px-4 inline-flex items-center">
          <Link
            to="/"
            className="text-color_grey hover:text-color_blue flex-row items-center"
          >
            Estoque
          </Link>
        </li>
        <MdArrowForwardIos />
        <li>
          <div className="flex flex-row items-center">
            <Link
              to="/categorias"
              className="ml-1 text-color_grey hover:text-color_blue md:ml-2"
            >
              Categorias
            </Link>
          </div>
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrumb
