import { useState } from "react";
import { MdClose } from "react-icons/md";
import { app } from "../../../../api/api";
import Swal from "sweetalert2";
import { TypeOption } from "../../../../Hooks/TypeOption";

export function AddOption({ closeModal }) {
  const [name, setName] = useState("");
  const { isCategorias, isPrateleiras, isSecoes } = TypeOption();
  const finishForm = name.length !== 0;

  let typeUrl = isCategorias
    ? "/category"
    : isPrateleiras
    ? "/shelves"
    : isSecoes
    ? "/section"
    : "";

  let typeText = isCategorias
    ? "categoria"
    : isPrateleiras
    ? "prateleira"
    : isSecoes
    ? "seção"
    : "";

  const capitalizedTypeText =
    typeText.charAt(0).toUpperCase() + typeText.slice(1);

  const handleAddCategory = async (event) => {
    event.preventDefault();

    try {
      const response = await app.post(typeUrl, { name: name });
      if (response.status === 201) {
        Toast.fire({
          icon: "success",
          title: `${capitalizedTypeText} criada com sucesso`,
        });
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  return (
    <div className="flex flex-col h-full w-full justify-between">
      <div className="flex flex-row justify-between items-center font-semibold">
        <p>Adicionar {capitalizedTypeText}</p>
        <MdClose
          className="cursor-pointer hover:bg-color_grey_bg hover:rounded-full"
          onClick={closeModal}
        />
      </div>
      <p>Preencha o campo abaixo para adicionar uma nova {typeText}</p>

      {/* NOME */}
      <div className="flex flex-col justify-start items-start w-full space-y-1">
        <label htmlFor="Name">Nome</label>
        <input
          type="text"
          className="border border-0.5 border-color_grey rounded-md p-2 focus:outline-color_blue w-full text-sm"
          id="Name"
          placeholder={`Digite o nome da ${typeText}`}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* CANCELAR E SALVAR */}
      <div className="flex flex-row justify-end space-x-2">
        <button
          className="text-white bg-color_grey hover:opacity-80 rounded-md py-1 px-2"
          onClick={closeModal}
        >
          Cancelar
        </button>
        <button
          onClick={handleAddCategory}
          disabled={!finishForm}
          className={`text-white bg-color_blue rounded-md py-1 px-2 ${
            !finishForm ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
          }`}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
