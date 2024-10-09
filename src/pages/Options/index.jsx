import { Header } from "../../components/Header";
import { FaSearch } from "react-icons/fa";
import { Table } from "../../components/Table";
import { useState } from "react";
import { Breadcrumb } from "../../components/Breadcrumb";
import Modal from "react-modal";
import { AddOption } from "../../components/Modals/Option/AddOption";
import { TypeOption } from "../../Hooks/TypeOption";

export function Options() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { isCategorias, isPrateleiras, isSecoes } = TypeOption();

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      maxWidth: "600px",
      maxHeight: "600px",
      width: "80%",
      height: "40%",
      borderRadius: "0.5rem",
    },
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 font-poppins">
      <Header />

      {/* Barra de ações e busca */}
      <div className="flex flex-col md:flex-row items-center justify-between mx-4 my-2 space-y-2 md:space-y-0">
        {/* Botão Adicionar */}
        <div
          className="w-full md:w-56 cursor-pointer text-md px-6 py-1 bg-color_blue text-white rounded-2xl flex items-center justify-center mb-2 md:mb-0"
          onClick={openModal}
        >
          Adicionar
          {isCategorias
            ? " Categoria"
            : isPrateleiras
            ? " Prateleira"
            : isSecoes
            ? " Seção"
            : ""}
        </div>

        {/* Campo de busca */}
        <div className="flex flex-row items-center w-full md:w-auto border px-4 py-1 bg-slate-100 border-gray-300 rounded-2xl">
          <input
            type="text"
            placeholder={`Buscar ${
              isCategorias
                ? "Categoria"
                : isPrateleiras
                ? "Prateleira"
                : isSecoes
                ? "Seção"
                : ""
            }`}
            className="w-full md:w-[95%] mr-1 text-slate-900 bg-slate-100 focus:outline-none focus:border-blue-500"
            value={searchTerm} // Valor do campo de pesquisa
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="text-indigo-600" />
        </div>
      </div>

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Conteúdo principal */}
      <div className="w-full flex flex-col justify-between px-4 md:px-10 space-y-4">
        {/* Título */}
        <div className="text-xl font-semibold text-color_blue font-poppins">
          {isCategorias
            ? "Categorias"
            : isPrateleiras
            ? "Prateleiras"
            : isSecoes
            ? "Seções"
            : ""}
        </div>

        {/* Tabela */}
        <div className="w-full">
          <Table searchTerm={searchTerm} />
        </div>
      </div>

      {/* Modal Responsivo */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={`Adicionar Nova ${
          isCategorias
            ? " Categoria"
            : isPrateleiras
            ? " Prateleira"
            : isSecoes
            ? " Seção"
            : ""
        }`}
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
      >
        <AddOption closeModal={closeModal} />
      </Modal>
    </div>
  );
}
