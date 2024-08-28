import { useContext, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { FaEdit, FaEye, FaSearch, FaTrash } from "react-icons/fa";
import api from "./api";

function App() {
  const [data, setData] = useState([]);
  const [pesquisar, setPesquisar] = useState("");

  const getEquipamentos = async () => {
    try {
      const res = await api.get("/", {});
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  function filtrarEquipamentos() {
    if (pesquisar === "") {
      return data;
    } else {
      return data.filter((equipamento) =>
        equipamento.Nome?.toLowerCase().includes(pesquisar.toLowerCase())
      );
    }
  }

  return (
    <>
      <Header />
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="m-10 flex justify-between items-center">
          <h1 className="text-xl text-black font-semibold">Equipamentos</h1>
          <div className="flex flex-row items-center border px-6 py-1  bg-slate-100 border-gray-300 rounded-2xl">
            <input
              type="text"
              placeholder="Buscar equipamento"
              value={pesquisar}
              onChange={(text) => setPesquisar(text.target.value)}
              className=" text-slate-900 bg-slate-100 focus:outline-none focus:border-blue-500"
            />
            <FaSearch className="text-indigo-600" />
          </div>
        </div>
        <div className="w-full px-10 overflow-y-auto">
          {/* Card */}
          {filtrarEquipamentos().map((equipamento, i) => {
            return (
              <div
                key={i}
                className="flex flex-col bg-white rounded-lg shadow-md mb-4"
              >
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex flex-row items-center space-x-10">
                    <h1 className="text-black font-semibold">Proc.: 1234</h1>
                    <p className="text-black font-medium">Cliente: TEste</p>
                    <p className="text-black font-medium">Beneficio: BBBBB</p>
                    <p className="text-black font-medium">Status: Ativo</p>
                    <p className="text-black font-medium">Andamento: Parado</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-black font-medium mr-4">Valor: 123456</p>
                    <div className="flex">
                      <button className="text-gray-500 hover:text-gray-700 mr-2">
                        <FaEdit />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 mr-2">
                        <FaEye />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
