import { MdArrowForwardIos } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { TypeOption } from '../../Hooks/TypeOption'

export function Breadcrumb() {
  const { isCategorias, isPrateleiras, isSecoes } = TypeOption()

  let typeUrl = isCategorias
    ? '/categorias'
    : isPrateleiras
    ? '/prateleiras'
    : isSecoes
    ? '/secoes'
    : ''

  let typeText = isCategorias
    ? 'Categorias'
    : isPrateleiras
    ? 'Prateleiras'
    : isSecoes
    ? 'Seções'
    : ''

  return (
    <nav className="flex flex-row py-1  text-color_grey">
      <ol className="inline-flex items-center">
        <li className="px-4 inline-flex items-center">
          <Link
            to="/"
            className="text-color_grey hover:text-color_blue flex-row items-center hover:underline"
          >
            Estoque
          </Link>
        </li>
        <MdArrowForwardIos />
        <li>
          <div className="flex flex-row items-center">
            <Link
              to={typeUrl}
              className="ml-1 text-color_grey hover:text-color_blue md:ml-2"
            >
              {`${typeText}`}
            </Link>
          </div>
        </li>
      </ol>
    </nav>
  )
}
