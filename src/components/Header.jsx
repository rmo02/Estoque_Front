import { useState } from 'react'
import { MdMenu } from 'react-icons/md'
import Modal from 'react-modal'
import { Menu } from './Modals/Menu'

export function Header(closeModal) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  function openModal() {
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  const customStyles = {
    content: {
      top: '0',
      left: 'auto',
      right: '2%',
      transform: 'auto',
      width: '14%',
      height: '38%',
      borderRadius: '0.5rem'
    }
  }

  return (
    <div className="bg-color_blue w-full py-1 px-8 relative flex items-center justify-end">
      {/* Nome da aplicação */}
      <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center z-0">
        <h2 className="text-white font-normal text-xl select-none">Estoque</h2>
      </div>

      {/* Avatar */}
      <div className="z-10">
        <MdMenu
          className="text-white font-normal text-xl cursor-pointer"
          onClick={openModal}
        />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Menu"
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        <Menu closeModal={closeModal} />
      </Modal>
    </div>
  )
}
