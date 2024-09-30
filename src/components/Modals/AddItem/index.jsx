import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { app } from "../../../api/api";
import Swal from "sweetalert2";

export function AddItem({ closeModal }) {
  const [name, setName] = useState("");
  const [categoria, setCategoria] = useState([]);
  const [category, setCategory] = useState("");
  const [naPrateleira, setNaPrateleira] = useState(true);
  const [prateleira, setPrateleira] = useState([]);
  const [shelf, setShelf] = useState("");
  const [secao, setSecao] = useState([]);
  const [section, setSection] = useState("");
  const [linha, setLinha] = useState("");
  const [coluna, setColuna] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const getShelves = async () => {
      const response = await app.get("/shelves");
      setPrateleira(response.data);
    };
    const getSections = async () => {
      const response = await app.get("/section");
      setSecao(response.data);
    };
    const getCategory = async () => {
      const response = await app.get("/category");
      setCategoria(response.data);
    };
    getCategory();
    getShelves();
    getSections();
  }, []);

  const finishForm =
    name.length !== 0 &&
    linha.length !== 0 &&
    coluna.length !== 0 &&
    status.length !== 0 &&
    ((section.length !== 0 && shelf === "") ||
      (shelf.length !== 0 && section === ""));

  const handleAddItem = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const formData = new FormData();
    formData.append("name", name);
    formData.append("categoryId", category);
    formData.append("inShelf", naPrateleira);
    formData.append("linha", linha);
    formData.append("column", coluna);
    formData.append("status", status);
    formData.append("image", file);
    {
      shelf === ""
        ? formData.append("sectionId", section)
        : formData.append("shelfId", shelf);
    }

    try {
      const response = await app.post("/equipment", formData);
      if (response.status === 201) {
        Toast.fire({
          icon: "success",
          title: "Equipamento criado com sucesso",
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

  const handleStorageTypeChange = (e) => {
    const value = e.target.value === "true"; // converte o valor para boolean
    setNaPrateleira(value);

    if (value) {
      setSection(""); // Limpa a seção quando for prateleira
    } else {
      setShelf(""); // Limpa a prateleira quando for seção
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

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setStatus(value); // Atualiza o estado com o valor do checkbox selecionado
    } else {
      setStatus(""); // Desmarca todos (opcional)
    }
  };

  return (
    <div className="flex flex-col h-full w-full justify-between">
      <div className="flex flex-row justify-between items-center font-semibold">
        <p>Adicionar item</p>
        <MdClose
          className="cursor-pointer hover:bg-color_grey_bg hover:rounded-full"
          onClick={closeModal}
        />
      </div>
      <p>Preencha os campos abaixo para adicionar um novo item ao estoque</p>
      <form className="flex flex-col space-y-2">
        <div className="flex flex-row justify-between items-center space-x-4 w-full">
          {/* NOME */}
          <div className="flex flex-col justify-start items-start w-1/2 space-y-1">
            <label htmlFor="Name">Nome</label>
            <input
              type="name"
              className="border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue w-full text-sm"
              id="Name"
              placeholder="Digite o nome do item"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-start items-start w-1/2 space-y-1">
            <label htmlFor="inputState">Categoria</label>
            <select
              id="inputState"
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue text-sm"
              value={category === null ? "" : category}
            >
              <option value="" disabled>
                Selecione a Categoria
              </option>
              {categoria
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item, index) => {
                  return (
                    <option key={index + 1} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center space-x-4 w-full">
          {/* TIPO DE ARMAZENAMENTO */}
          <div className="flex flex-col justify-start items-start w-1/2 space-y-1">
            <label htmlFor="inputState">Tipo de Armazenamento</label>
            <select
              id="inputState"
              onChange={handleStorageTypeChange}
              className="w-full border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue text-sm"
              value={naPrateleira} // Garante que o valor correto está refletido
            >
              <option value="" disabled>
                Selecione o Tipo de Armazenamento
              </option>
              <option value="true">Prateleira</option>
              <option value="false">Seção</option>
            </select>
          </div>
          {naPrateleira ? (
            // PRATELEIRA
            <div className="flex flex-col justify-start items-start w-1/2 space-y-1">
              <label htmlFor="inputState">Prateleira</label>
              <select
                onChange={(e) => setShelf(e.target.value)}
                id="inputState"
                className="w-full border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue text-sm"
                value={shelf === null ? "" : shelf} // Garante que o valor de shelf é refletido corretamente
              >
                <option value="" disabled>
                  Selecione a Prateleira
                </option>
                {prateleira
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item, index) => {
                    return (
                      <option key={index + 1} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          ) : (
            // SEÇÃO
            <div className="flex flex-col justify-start items-start w-1/2 space-y-1">
              <label htmlFor="inputState">Seção</label>
              <select
                onChange={(e) => setSection(e.target.value)}
                id="inputState"
                className="w-full border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue text-sm"
                value={section === null ? "" : section} // Garante que o valor de section é refletido corretamente
              >
                <option value="" disabled>
                  Selecione a Seção
                </option>
                {secao
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item, index) => {
                    return (
                      <option key={index + 1} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}
        </div>

        {/* COLUNA E LINHA */}
        <div className="flex flex-row justify-between items-center space-x-4 w-full">
          <div className="flex flex-col justify-start items-start w-1/2 space-y-1">
            <label htmlFor="inputState">Coluna</label>
            <select
              id="inputState"
              onChange={(e) => setColuna(e.target.value)}
              className="w-full border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue text-sm"
              value={coluna}
            >
              <option value="" disabled>
                Selecione a Coluna
              </option>
              {[...Array(8)].map((item, index) => (
                <option key={index + 1} value={index + 1}>
                  Coluna {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-start items-start w-1/2 space-y-1">
            <label htmlFor="inputState">Linha</label>
            <select
              id="inputState"
              onChange={(e) => setLinha(e.target.value)}
              className="w-full border border-0.5 border-color_grey rounded-md p-1 focus:outline-color_blue text-sm"
              value={linha}
            >
              <option value="" disabled>
                Selecione a Linha
              </option>
              {[...Array(8)].map((item, index) => (
                <option key={index + 1} value={index + 1}>
                  Linha {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* STATUS */}
        <div className="flex flex-col justify-start items-start w-full space-y-1">
          <label>Status</label>
          <div className="flex flex-row w-full space-x-4 text-base ">
            <label className="flex  items-center">
              <input
                className="w-4 h-4 rounded-full appearance-none border border-gray-400 checked:bg-blue-600 checked:border-transparent focus:outline-none"
                type="checkbox"
                value="DISPONIVEL"
                checked={status === "DISPONIVEL"}
                onChange={(e) => handleCheckboxChange(e)}
              />
              <span className="ml-2">Disponível</span>
            </label>

            <label>
              <input
                className="w-4 h-4 rounded-full appearance-none border border-gray-400 checked:bg-blue-600 checked:border-transparent focus:outline-none"
                type="checkbox"
                value="EM_USO"
                checked={status === "EM_USO"}
                onChange={(e) => handleCheckboxChange(e)}
              />
              <span className="ml-2">Em Uso</span>
            </label>
            <label>
              <input
                className="w-4 h-4 rounded-full appearance-none border border-gray-400 checked:bg-blue-600 checked:border-transparent focus:outline-none"
                type="checkbox"
                value="EM_MANUTENCAO"
                checked={status === "EM_MANUTENCAO"}
                onChange={(e) => handleCheckboxChange(e)}
              />
              <span className="ml-2">Em Manutenção</span>
            </label>
          </div>
        </div>

        {/* ADICIONAR IMAGEM */}
        <div className="flex flex-col justify-start w-full space-y-1">
          <label htmlFor="Image">Imagem</label>
          <input
            type="file"
            className="cursor-pointer"
            id="Image"
            onChange={(e) => setFile(e.target.files[0])}
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
            onClick={handleAddItem}
            disabled={!finishForm}
            className={`text-white bg-color_blue rounded-md py-1 px-2 ${
              !finishForm ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
            }`}
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
