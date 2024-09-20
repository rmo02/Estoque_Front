import React, { useEffect, useState } from 'react'
import { app } from '../../api/api'
import Modal from 'react-modal'
import Swal from 'sweetalert2'
import { EditItem } from '../Modals/EditItem'

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
    <div className="bg-color_blue w-1/4 flex flex-col text-white font-medium rounded-lg ">
      <div className="w-full h-48 flex items-center justify-center bg-color_blue rounded-t-lg">
        <img
          src={item.image}
          className="max-h-full max-w-full object-contain"
          alt="Foto do Equipamento"
        />
      </div>
      <div className="p-3">
        <div className="flex justify-end">
          <div
            className={`px-3 py-1 text-sm ${
              item.status === 'EM_USO'
                ? 'bg-color_yellow'
                : item.status === 'DISPONIVEL'
                ? 'bg-color_green'
                : 'bg-color_red'
            } rounded-2xl`}
          >
            {formatStatus(item.status)}
          </div>
        </div>
        <div>
          <p className="text-xl ">{item.name}</p>
          {item.inShelf ? (
            <p className="text-lg ">{item.shelf.name}</p>
          ) : (
            <p className="text-lg ">{item.section.name}</p>
          )}
          <p className="text-lg ">{item.category?.name}</p>
          <p className="text-lg ">{item.linha}</p>
          <p className="text-lg ">{item.column}</p>
        </div>
        <div className="flex flex-row items-center justify-center mt-2 space-x-2 ">
          <div
            className="cursor-pointer text-md bg-color_green rounded-2xl w-full flex items-center justify-center"
            onClick={openModal}
          >
            Editar
          </div>
          <div
            onClick={() => showConfirmationToDelete(item.id)}
            className="cursor-pointer text-md bg-color_red rounded-2xl w-full flex items-center justify-center"
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
