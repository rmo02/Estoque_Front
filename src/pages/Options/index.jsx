import { Header } from "../../components/Header";
import { FaSearch } from "react-icons/fa";
import { Table } from "../../components/Table";
import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import Modal from "react-modal";
import { AddOption } from "../../components/Modals/Option/AddOption";
import { TypeOption } from "../../Hooks/TypeOption";

export function Options() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { options, isCategorias, isPrateleiras, isSecoes } = TypeOption();

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
      width: "50%",
      height: "35%",
      borderRadius: "0.5rem",
    },
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 font-poppins">
      <Header />
      <div className="flex flex-row items-center justify-between mx-4 my-2">
        <div
          className="w-56 cursor-pointer text-md px-6 py-1 bg-color_blue text-white rounded-2xl flex items-center justify-center mb-2 md:mb-0"
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
        <div className="flex flex-row items-center border px-4 py-1  bg-slate-100 border-gray-300 rounded-2xl">
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
            className="w-[95%] mr-1 text-slate-900 bg-slate-100 focus:outline-none focus:border-blue-500"
            value={searchTerm} // Valor do campo de pesquisa
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="text-indigo-600" />
        </div>
      </div>
      <Breadcrumb />
      <div className="w-full flex flex-col justify-between px-4 md:px-10">
        <div className="flex flex-col text-xl font-semibold text-color_blue font-poppins relative select-none">
          {isCategorias
            ? "Categorias"
            : isPrateleiras
            ? "Prateleiras"
            : isSecoes
            ? "Seçãos"
            : ""}
        </div>
        <div className="w-full ">
          <Table options={options} searchTerm={searchTerm} />
        </div>
      </div>
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
