import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { app } from "../../../../api/api";
import Swal from "sweetalert2";
import { IoMdTrash } from "react-icons/io";

export function EditItem({ closeModal, item }) {
  console.log(item);

  const [name, setName] = useState(item.name || "");
  const [category, setCategory] = useState(item.category?.id || "");
  const [categoria, setCategoria] = useState([]);
  const [naPrateleira, setNaPrateleira] = useState(item.inShelf);
  const [prateleira, setPrateleira] = useState([]);
  const [shelf, setShelf] = useState(item.shelf?.id || "");
  const [secao, setSecao] = useState([]);
  const [section, setSection] = useState(item.section?.id || "");
  const [linha, setLinha] = useState(item.linha || "");
  const [coluna, setColuna] = useState(item.column || "");
  const [status, setStatus] = useState(item.status || "");
  const [file, setFile] = useState(item.image || null);

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

  const handleEditItem = async (event) => {
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
        ? formData.append("sectionId", section) && setShelf(null)
        : formData.append("shelfId", shelf) && setSection(null);
    }

    try {
      const response = await app.put(`/equipment/${item.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Equipamento editado com sucesso",
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

  function clearFile() {
    setFile(null);
    // Limpa o valor do input para permitir o upload do mesmo arquivo novamente
    document.getElementById("Image").value = null;
  }

  return (
    <div className="flex flex-col h-full w-full justify-between">
      <div className="flex flex-row justify-between items-center font-semibold mb-4">
        <p>Editar Item</p>
        <MdClose
          className="cursor-pointer hover:bg-color_grey_bg hover:rounded-full"
          onClick={closeModal}
        />
      </div>

      <p className="mb-4 text-sm md:text-base">
        Preencha os campos abaixo para editar o item do estoque
      </p>

      <form className="flex flex-col space-y-4">
        {/* NOME E CATEGORIA */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
          {/* Nome */}
          <div className="flex flex-col w-full sm:w-1/2 space-y-1">
            <label htmlFor="Name">Nome</label>
            <input
              type="text"
              className="border border-0.5 border-color_grey rounded-md p-2 focus:outline-color_blue w-full text-sm"
              id="Name"
              placeholder="Digite o nome do item"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* Categoria */}
          <div className="flex flex-col w-full sm:w-1/2 space-y-1">
            <label htmlFor="inputState">Categoria</label>
            <select
              id="inputState"
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-0.5 border-color_grey rounded-md p-2 focus:outline-color_blue text-sm"
              value={category || ""}
            >
              <option value="" disabled>
                Selecione a Categoria
              </option>
              {categoria
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* TIPO DE ARMAZENAMENTO E PRATELEIRA/SEÇÃO */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
          {/* Tipo de Armazenamento */}
          <div className="flex flex-col w-full sm:w-1/2 space-y-1">
            <label htmlFor="inputState">Tipo de Armazenamento</label>
            <select
              id="inputState"
              onChange={handleStorageTypeChange}
              className="w-full border border-0.5 border-color_grey rounded-md p-2 focus:outline-color_blue text-sm"
              defaultValue={item.inShelf}
            >
              <option value="" disabled>
                Selecione o Tipo de Armazenamento
              </option>
              <option value="true">Prateleira</option>
              <option value="false">Seção</option>
            </select>
          </div>

          {naPrateleira ? (
            <div className="flex flex-col w-full sm:w-1/2 space-y-1">
              <label htmlFor="inputState">Prateleira</label>
              <select
                onChange={(e) => setShelf(e.target.value)}
                id="inputState"
                className="w-full border border-0.5 border-color_grey rounded-md p-2 focus:outline-color_blue text-sm"
                value={shelf || ""}
              >
                <option value="" disabled>
                  Selecione a Prateleira
                </option>
                {prateleira
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          ) : (
            <div className="flex flex-col w-full sm:w-1/2 space-y-1">
              <label htmlFor="inputState">Seção</label>
              <select
                onChange={(e) => setSection(e.target.value)}
                id="inputState"
                className="w-full border border-0.5 border-color_grey rounded-md p-2 focus:outline-color_blue text-sm"
                value={section || ""}
              >
                <option value="" disabled>
                  Selecione a Seção
                </option>
                {secao
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        {/* LINHA E COLUNA */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
          {/* Coluna */}
          <div className="flex flex-col w-full sm:w-1/2 space-y-1">
            <label htmlFor="inputState">Coluna</label>
            <select
              id="inputState"
              onChange={(e) => setColuna(e.target.value)}
              className="w-full border border-0.5 border-color_grey rounded-md p-2 focus:outline-color_blue text-sm"
              value={coluna || ""}
            >
              <option value="" disabled>
                Selecione a Coluna
              </option>
              {[...Array(8)].map((_, index) => (
                <option key={index} value={index + 1}>
                  Coluna {index + 1}
                </option>
              ))}
            </select>
          </div>
          {/* Linha */}
          <div className="flex flex-col w-full sm:w-1/2 space-y-1">
            <label htmlFor="inputState">Linha</label>
            <select
              id="inputState"
              onChange={(e) => setLinha(e.target.value)}
              className="w-full border border-0.5 border-color_grey rounded-md p-2 focus:outline-color_blue text-sm"
              value={linha || ""}
            >
              <option value="" disabled>
                Selecione a Linha
              </option>
              {[...Array(8)].map((_, index) => (
                <option key={index} value={index + 1}>
                  Linha {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* STATUS */}
        <div className="flex flex-col w-full space-y-2">
          <label>Status</label>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
            {/* Disponível */}
            <label className="flex items-center">
              <input
                className="w-4 h-4 rounded-full appearance-none border border-gray-400 checked:bg-blue-600 checked:border-transparent focus:outline-none"
                type="checkbox"
                value="DISPONIVEL"
                checked={status === "DISPONIVEL"}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">Disponível</span>
            </label>
            {/* Em Uso */}
            <label className="flex items-center">
              <input
                className="w-4 h-4 rounded-full appearance-none border border-gray-400 checked:bg-blue-600 checked:border-transparent focus:outline-none"
                type="checkbox"
                value="EM_USO"
                checked={status === "EM_USO"}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">Em Uso</span>
            </label>
            {/* Em Manutenção */}
            <label className="flex items-center">
              <input
                className="w-4 h-4 rounded-full appearance-none border border-gray-400 checked:bg-blue-600 checked:border-transparent focus:outline-none"
                type="checkbox"
                value="EM_MANUTENCAO"
                checked={status === "EM_MANUTENCAO"}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">Em Manutenção</span>
            </label>
          </div>
        </div>

        {/* IMAGEM */}
        <div className="flex flex-col sm:flex-row justify-start items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="Image"
              className="cursor-pointer w-fit h-fit bg-color_blue text-white py-1 px-2 rounded-2xl"
            >
              {file ? "Arquivo escolhido" : "Escolher arquivo"}
            </label>
            <input
              type="file"
              id="Image"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {file && (
            <div className="w-full sm:w-1/4 relative">
              <img
                className="w-full"
                src={file.name ? URL.createObjectURL(file) : file}
                alt="file"
              />
              <IoMdTrash
                onClick={clearFile}
                className="text-red-600 absolute top-0 right-0 cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* BOTÕES */}
        <div className="flex flex-row justify-end space-x-2 pb-2">
          <button
            className="text-white bg-color_grey hover:opacity-80 rounded-md py-1 px-2"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            onClick={handleEditItem}
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
