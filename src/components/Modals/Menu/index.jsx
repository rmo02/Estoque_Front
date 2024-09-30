import {
  MdClose,
  MdCropSquare,
  MdOutlineCategory,
  MdSpaceBar
} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export function Menu({ closeModal }) {
  const navigate = useNavigate()
  
  function navigateTo(route) {
    navigate(`/${route}`)
    closeModal()
  }

  return (
    <div className="flex flex-col text-lg text-color_blue font-poppins relative select-none">
      <div className="absolute top-0 right-0">
        <MdClose
          className="cursor-pointer hover:bg-color_grey_bg hover:rounded-full"
          onClick={closeModal}
        />
      </div>
      <div className="py-2">
        <p>Menu</p>
      </div>
      <div
        className="flex flex-row items-center py-2 space-x-2 border-b-2 border-gray-300 hover:cursor-pointer
      "
        onClick={() => navigateTo('categorias')}
      >
        <MdOutlineCategory />
        <p>Categorias</p>
      </div>
      <div
        className="flex flex-row items-center py-2 space-x-2 border-b-2 border-gray-300 hover:cursor-pointer
      "
        onClick={() => navigateTo('prateleiras')}
      >
        <MdSpaceBar />
        <p>Prateleiras</p>
      </div>
      <div
        className="flex flex-row items-center py-2 space-x-2 hover:cursor-pointer"
        onClick={() => navigateTo('secoes')}
      >
        <MdCropSquare />
        <p>Seções</p>
      </div>
    </div>
  )
}
