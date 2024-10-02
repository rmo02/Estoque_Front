import React, { useState } from 'react'
import Modal from 'react-modal'
import Swal from 'sweetalert2'
import { app } from '../../api/api'
import { EditItem } from '../Modals/Equipments/EditItem'
import noPhoto from '../../assets/noPhoto.png'
import { MdNoPhotography } from 'react-icons/md'

export function Card({ item }) {

  const [modalIsOpen, setModalIsOpen] = useState(false)

  function formatStatus(status) {
    switch (status) {
      case 'DISPONIVEL':
        return 'Disponível'
      case 'EM_USO':
        return 'Em Uso'
      case 'EM_MANUTENCAO':
        return 'Em Manutenção'
      default:
        return status
    }
  }

  function deleteItem(id) {
    try {
      const response = app.delete(`/equipment/${id}`)

      Toast.fire({
        icon: 'error',
        title: 'Equipamento excluído com sucesso'
      })
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      console.error(error)
    }
  }

  const showConfirmationToDelete = id => {
    Swal.fire({
      title: 'Excluir item',
      text: 'Você tem certeza que deseja excluir este item? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          deleteItem(id)
        } catch (error) {
          console.error('Erro ao excluir item:', error)
          Toast.fire({
            icon: 'error',
            title: 'Ocorreu um erro ao excluir o item. Tente novamente.'
          })
        }
      }
    })
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: toast => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    }
  })

  function openModal() {
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '40%',
      height: '75%',
      borderRadius: '0.5rem'
    }
  }

  return (
    <div className="bg-color_blue w-full max-w-xs flex flex-col text-white font-normal rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="w-full h-28 bg-color_blue rounded-t-lg overflow-hidden">
        {item.image !== null ? (
          <img
            src={item.image}
            className="w-full h-full object-cover"
            alt={item.name}
          />
        ) : (
          <MdNoPhotography className="w-full h-full" />
        )}
      </div>
      <div className="p-2 sm:p-4 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-end">
            <div
              className={`px-2 py-1 text-xs sm:text-sm ${
                item.status === 'EM_USO'
                  ? 'bg-color_yellow'
                  : item.status === 'DISPONIVEL'
                  ? 'bg-color_green'
                  : 'bg-color_red'
              } rounded-2xl select-none`}
            >
              {formatStatus(item.status)}
            </div>
          </div>
          <div className="mt-1 sm:mt-2">
            <p className="text-base sm:text-lg font-semibold">{item.name}</p>
            <p className="text-sm sm:text-base">
              {item.inShelf ? item.shelf?.name : item.section?.name}
            </p>
            <p className="text-sm sm:text-base">{item.category?.name}</p>
            <p className="text-sm sm:text-base">
              Linha {item.linha} | Coluna {item.column}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between mt-2 space-x-2">
          <div
            className="cursor-pointer text-xs sm:text-sm bg-color_green rounded-2xl w-full flex items-center justify-center py-0.5 transition duration-200 hover:bg-green-600 select-none"
            onClick={openModal}
          >
            Editar
          </div>
          <div
            onClick={() => showConfirmationToDelete(item.id)}
            className="cursor-pointer text-xs sm:text-sm bg-color_red rounded-2xl w-full flex items-center justify-center py-0.5 transition duration-200 hover:bg-red-600 select-none"
          >
            Excluir
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Editar Item"
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
      >
        <EditItem closeModal={closeModal} item={item} />
      </Modal>
    </div>
  )
}
