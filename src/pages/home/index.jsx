import { useEffect, useState } from "react";
import { app } from "../../api/api";
import { Header } from "../../components/Header";
import { FaSearch } from "react-icons/fa";
import Modal from "react-modal";
import { Card } from "../../components/Card";
import { AddItem } from "../../components/Modals/Equipments/AddItem";

export function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cards, setCards] = useState([]); //Todos itens
  const [filteredCards, setFilteredCards] = useState([]); // Itens filtrados
  const [pesquisar, setPesquisar] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos"); // Controla a opção selecionada: 'Prateleira', 'Seção', 'Todos'

  useEffect(() => {
    const getData = async () => {
      const response = await app.get("/equipment");
      setCards(response.data);
    };
    getData();
  }, []);

  // Filtra os itens sempre que mudar o filtro ou o termo de busca
  useEffect(() => {
    let filtered = [];

    if (activeFilter === "Prateleira") {
      filtered = cards.filter((item) => item.inShelf); // Filtro para prateleira
    } else if (activeFilter === "Seção") {
      filtered = cards.filter((item) => !item.inShelf); // Filtro para seção
    } else {
      filtered = cards; // Mostra todos
    }

    // Aplica o filtro de busca
    if (pesquisar) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(pesquisar.toLowerCase())
      );
    }

    setFilteredCards(filtered);
  }, [cards, activeFilter, pesquisar]);

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
      height: "75%",
      borderRadius: "0.5rem",
    },
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 font-poppins">
      <Header />

      <div className="mx-4 my-2 flex flex-col md:flex-row justify-between items-center">
        <div
          className="w-56 cursor-pointer text-md px-6 py-1 bg-color_blue text-white rounded-2xl flex items-center justify-center "
          onClick={openModal}
        >
          Adicionar Item
        </div>

        {/* Botões de filtro (Prateleira, Todos, Seção) */}
        <div className="bg-color_grey_bg flex flex-row items-center justify-between w-full md:w-1/3 rounded-2xl ">
          <div
            className={`cursor-pointer w-1/3 flex items-center justify-center text-color_blue py-1 select-none ${
              activeFilter === "Prateleira"
                ? "bg-color_blue text-white rounded-2xl"
                : ""
            }`}
            onClick={() => setActiveFilter("Prateleira")}
          >
            Prateleira
          </div>
          <div
            className={`cursor-pointer w-1/3 flex items-center justify-center text-color_blue py-1 select-none ${
              activeFilter === "Todos"
                ? "bg-color_blue text-white rounded-2xl"
                : ""
            }`}
            onClick={() => setActiveFilter("Todos")}
          >
            Todos
          </div>
          <div
            className={`cursor-pointer w-1/3 flex items-center justify-center text-color_blue py-1 select-none ${
              activeFilter === "Seção"
                ? "bg-color_blue text-white rounded-2xl"
                : ""
            }`}
            onClick={() => setActiveFilter("Seção")}
          >
            Seção
          </div>
        </div>

        {/* Campo de busca */}
        <div className="w-56 flex flex-row items-center border px-4 py-1 bg-slate-100 border-gray-300 rounded-2xl">
          <input
            type="text"
            placeholder="Buscar equipamento"
            value={pesquisar}
            onChange={(e) => setPesquisar(e.target.value)}
            className="w-[95%] mr-1 text-slate-900 bg-slate-100 focus:outline-none focus:border-blue-500"
          />
          <FaSearch className="text-indigo-600" />
        </div>
      </div>

      {/* Listagem dos itens filtrados */}
      <div className="overflow-y-auto flex-grow px-4 md:px-10">
        {/* Prateleira e Todos */}
        {activeFilter === "Todos" || activeFilter === "Prateleira" ? (
          <div className="mb-2">
            <p className="text-lg font-semibold">Prateleira</p>

            {/* Listar os itens */}
            {filteredCards.filter((item) => item.inShelf).length === 0 ? (
              // Exibe a mensagem se não houver itens na prateleira
              <p className="text-base font-medium text-red-600">
                Nenhum item disponível em prateleiras.
              </p>
            ) : (
              // Exibe os itens se houverem
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {filteredCards
                  .filter((item) => item.inShelf)
                  .slice(0, 6) // Limita a exibição a 6 itens
                  .map((item, index) => (
                    <Card key={index} item={item} />
                  ))}
              </div>
            )}
          </div>
        ) : null}

        {/* Seção e Todos */}
        {activeFilter === "Todos" || activeFilter === "Seção" ? (
          <div>
            <p className="text-lg font-semibold">Seção</p>
            {filteredCards.filter((item) => !item.inShelf).length === 0 ? (
              // Exibe a mensagem se não houver itens na prateleira
              <p className="text-base font-medium text-red-600">
                Nenhum item disponível em seções.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {filteredCards
                  .filter((item) => !item.inShelf)
                  .slice(0, 6) // Limita a exibição a 6 itens
                  .map((item, index) => (
                    <Card key={index} item={item} />
                  ))}
              </div>
            )}
          </div>
        ) : null}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Adicionar Novo Item"
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
      >
        <AddItem closeModal={closeModal} />
      </Modal>
    </div>
  );
}
