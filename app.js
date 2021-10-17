//localStorage

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];

const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco))


//criação dos itens no HTML

const criarItem = (tarefa, status, indice) => {
  const item = document.createElement("label");
  item.classList.add('item');
  item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input class="button" type="button" value="x" data-indice=${indice}>`
  document.getElementById('todoList').appendChild(item);
}

//atualização de tela

const atualizarTela = () => {
  limparTarefas()
  const banco = getBanco();
  banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const limparTarefas = () => {
  const todoList = document.getElementById('todoList');
  while(todoList.firstChild){
    todoList.removeChild(todoList.lastChild);
  }
}

//função de adicionar itens atraves do input

const addItem = (event) => {
  const tecla = event.key;
  const texto = event.target.value;
  if(tecla === 'Enter'){
    const banco = getBanco();
    banco.push({'tarefa': texto, 'status': ''});
    setBanco(banco);
    atualizarTela();
    event.target.value = '';
  }
}

//remover itens

const removerItem = (indice) => {
  const banco = getBanco();
  banco.splice(indice, 1);
  setBanco(banco);
  atualizarTela();
}

//identificar itens e remover itens

const clickItem = (event) => {
  const elemento = event.target;
  if(elemento.type === 'button'){
    const indice = elemento.dataset.indice;
    removerItem(indice);
  }else if(elemento.type === 'checkbox'){
    const indice = elemento.dataset.indice;
    atualizarItem(indice);
  }

}

const clickRemove = (event) => {
  const elemento = event.target;
  if(elemento.type === 'button'){
    const banco = getBanco();
    const todos = banco;
    banco.splice(todos);
    setBanco(banco);
    atualizarTela();
  }
}

//atualizar status do item

const atualizarItem = (indice) => {
  const banco = getBanco();
  banco[indice].status = banco[indice].status === '' ? 'checked' : '';
  setBanco(banco);
  atualizarTela();
}


//pegando elementos do HTML

document.getElementById('newItem').addEventListener('keypress', addItem);
document.getElementById('todoList').addEventListener('click', clickItem);
document.getElementById('removeAll').addEventListener('click', clickRemove);

atualizarTela();