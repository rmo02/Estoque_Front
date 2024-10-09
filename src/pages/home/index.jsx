import { useEffect, useState } from "react";
import { app } from "../../api/api";
import { Header } from "../../components/Header";
import { FaSearch } from "react-icons/fa";
import Modal from "react-modal";
import { Card } from "../../components/Card";
import { AddItem } from "../../components/Modals/Equipments/AddItem";

export function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [pesquisar, setPesquisar] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");

  useEffect(() => {
    const getData = async () => {
      const response = await app.get("/equipment");
      setCards(response.data);
    };
    getData();
  }, []);

  useEffect(() => {
    let filtered = [];

    if (activeFilter === "Prateleira") {
      filtered = cards.filter((item) => item.inShelf);
    } else if (activeFilter === "Seção") {
      filtered = cards.filter((item) => !item.inShelf);
    } else {
      filtered = cards;
    }

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
      width: "90%",
      maxWidth: "600px",
      height: "75%",
      borderRadius: "0.5rem",
    },
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 font-poppins">
      <Header />

      <div className="mx-4 my-2 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div
          className="w-full md:w-auto cursor-pointer text-md px-6 py-1 bg-color_blue text-white rounded-2xl flex items-center justify-center"
          onClick={openModal}
        >
          Adicionar Item
        </div>

        <div className="bg-color_grey_bg flex flex-row items-center justify-between w-full md:w-1/3 rounded-2xl ">
          <button
            className={`cursor-pointer w-1/3 flex items-center justify-center py-1 select-none ${
              activeFilter === "Prateleira"
                ? "bg-color_blue text-white rounded-2xl"
                : "text-color_blue"
            }`}
            onClick={() => setActiveFilter("Prateleira")}
          >
            Prateleira
          </button>
          <button
            className={`cursor-pointer w-1/3 flex items-center justify-center py-1 select-none ${
              activeFilter === "Todos"
                ? "bg-color_blue text-white rounded-2xl"
                : "text-color_blue"
            }`}
            onClick={() => setActiveFilter("Todos")}
          >
            Todos
          </button>
          <button
            className={`cursor-pointer w-1/3 flex items-center justify-center py-1 select-none ${
              activeFilter === "Seção"
                ? "bg-color_blue text-white rounded-2xl"
                : "text-color_blue"
            }`}
            onClick={() => setActiveFilter("Seção")}
          >
            Seção
          </button>
        </div>

        <div className="w-full md:w-56 flex flex-row items-center border px-4 py-1 bg-slate-100 border-gray-300 rounded-2xl">
          <input
            type="text"
            placeholder="Buscar equipamento"
            value={pesquisar}
            onChange={(e) => setPesquisar(e.target.value)}
            className="w-full text-slate-900 bg-slate-100 focus:outline-none"
          />
          <FaSearch className="text-indigo-600 ml-2" />
        </div>
      </div>

      <div className="overflow-y-auto px-10">
        {activeFilter === "Todos" || activeFilter === "Prateleira" ? (
          <div className="mb-4">
            <p className="text-lg font-semibold">Prateleira</p>
            {filteredCards.filter((item) => item.inShelf).length === 0 ? (
              <p className="text-base font-medium text-red-600">
                Nenhum item disponível em prateleiras.
              </p>
            ) : (
              <div className="mb-4 flex overflow-x-auto space-x-4">
                {filteredCards
                  .filter((item) => item.inShelf)
                  .map((item, index) => (
                    <div key={index} className="flex-none w-56">
                      {" "}
                      {/* Define a largura dos cards */}
                      <Card item={item} />
                    </div>
                  ))}
              </div>
            )}
          </div>
        ) : null}

        {activeFilter === "Todos" || activeFilter === "Seção" ? (
          <div>
            <p className="text-lg font-semibold">Seção</p>
            {filteredCards.filter((item) => !item.inShelf).length === 0 ? (
              <p className="text-base font-medium text-red-600">
                Nenhum item disponível em seções.
              </p>
            ) : (
              <div className="mb-4 flex overflow-x-auto space-x-4">
                {filteredCards
                  .filter((item) => !item.inShelf)
                  .map((item, index) => (
                    <div key={index} className="flex-none w-52">
                      {" "}
                      {/* Define a largura dos cards */}
                      <Card item={item} />
                    </div>
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
