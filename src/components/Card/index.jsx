import React, { useEffect } from 'react'
import logo from '../../assets/logo.png'
import { app } from '../../api/api'
import Swal from 'sweetalert2'

export function Card({ item }) {
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

  // function deleteItem(id) {
  //   console.log(id)
  //   // try {
  //   //   let response
  //   //   response = app.delete('/equipment', id)
  //   //   console.log(response.status)
  //   //   // if (response.status === 201) {
  //   //   //   Toast.fire({
  //   //   //     icon: 'success',
  //   //   //     title: 'Equipamento criado com sucesso'
  //   //   //   })
  //   //   //   closeModal()
  //   //   //   setTimeout(() => {
  //   //   //     window.location.reload()
  //   //   //   }, 1750)
  //   //   // }
  //   // } catch (error) {
  //   //   console.error(error)
  //   // }
  // }

  function deleteItem(id) {
    console.log(id)
    try {
      const response = app.delete(`/equipment/${id}`)
      console.log(response)

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

  return (
    <div className="bg-color_blue w-1/4 flex flex-col text-white font-medium rounded-lg ">
      <img src={item.image} alt="Foto do Equipamento" />
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
        <p className="text-xl ">{item.name}</p>
        {item.inShelf ? (
          <p className="text-lg ">{item.shelf.name}</p>
        ) : (
          <p className="text-lg ">{item.section.name}</p>
        )}

        <div className="flex flex-row items-center justify-center mt-2 space-x-2 ">
          <div className="cursor-pointer text-md bg-color_green rounded-2xl w-full flex items-center justify-center">
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
    </div>
  )
}
