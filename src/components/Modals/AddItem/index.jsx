import { MdClose } from 'react-icons/md'

export function AddItem({ closeModal }) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-center">
        <p>Adicionar Ítem</p>
        <MdClose onClick={closeModal} />
      </div>
      <p>Preencha os campos abaixo para adicionar um novo item ao estoque</p>
      <form>
        <div>
          <div className="flex flex-row justify-start items-center py-4 w-full">
            <div className="flex flex-col justify-start items-start w-1/2 space-y-1">
              <label for="Name">Nome</label>
              <input
                type="name"
                className="border border-0.5 border-black rounded-lg p-1 focus:outline-color_blue w-full"
                id="Name"
                placeholder="Digite o nome do ítem"
              />
            </div>
            <div className="flex flex-col justify-start items-start w-1/2 space-y-1">
              <label for="inputState">Tipo de Armazenamento</label>
              <select
                id="inputState"
                className="w-full border border-0.5 border-black rounded-lg p-1 focus:outline-color_blue"
              >
                <option selected>Selecione o Tipo de Armazenamento</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
          </div>
          <div>
            <div className="form-col py-2">
              <div className="flex flex-col space-y-1">
                <label for="Colum">Coluna</label>
                <input
                  type="text"
                  className="w-1/2 border border-0.5 border-black rounded-lg p-1 focus:outline-color_blue"
                  id="Colum"
                  placeholder="Digite a coluna do ítem"
                />
              </div>
              <div className="flex flex-col py-2 space-y-1">
                <label for="Line">Linha</label>
                <input
                  type="text"
                  className="w-1/2 border border-0.5 border-black rounded-lg p-1 focus:outline-color_blue"
                  id="Line"
                  placeholder="Digite a seção do ítem"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start w-full space-y-1">
          <label for="Image">Imagem</label>
          <input type="file" className="" id="Image" />
        </div>
        <div className="flex flex-col justify-start py-2 space-y-1 w-full">
          <p>Status</p>

          <div className="flex flex-row justify-start items-center  w-full">
            <div className="flex flex-row w-1/4">
              <input
                class="form-check-input"
                type="checkbox"
                id="checkboxDisponivel"
                value="disponivel"
              />
              <label className="form-check-label" for="checkboxDisponivel">
                Disponível
              </label>
            </div>
            <div className="flex flex-row w-1/4">
              <input
                class="form-check-input"
                type="checkbox"
                id="checkboxEmUso"
                value="emUso"
              />
              <label class="form-check-label" for="checkboxEmUso">
                Em Uso
              </label>
            </div>
            <div className="flex flex-row w-1/4">
              <input
                class="form-check-input"
                type="checkbox"
                id="checkboxEmManutencao"
                value="emManutencao"
              />
              <label class="form-check-label" for="checkboxEmUso">
                Manutenção
              </label>
            </div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={closeModal}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
      </form>
    </div>
  )
}
