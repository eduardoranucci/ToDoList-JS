const tarefasArmazenadas = localStorage.getItem('tarefas')
let listaTarefas

if (tarefasArmazenadas == '' || tarefasArmazenadas == null) {
    localStorage.setItem('tarefas', '[]')
    listaTarefas = JSON.parse('[]')
} else {
    listaTarefas = JSON.parse(tarefasArmazenadas)
}

for (let i in listaTarefas) {
    item = listaTarefas[i]
    criaNovoItem(item.descricao, item.id, item.oculta, item.concluida, salvaTarefa = false)
}


function adicionaTarefa() {

    const inputNovaTarefa = document.getElementById('input_nova_tarefa')
    const novaTarefa = inputNovaTarefa.value;

    if (novaTarefa == '') {
        alert('A tarefa precisa de uma descrição.')
    } else {
        criaNovoItem(novaTarefa)
        inputNovaTarefa.value = ''
    } 
}


function criaNovoItem(textoTarefa, id = 0, oculta = false, concluida = false , salvaTarefa = true) {

    // guarda o tamanho da lista de tarefas
    let qtdTarefas = listaTarefas.length

    const liListaTarefas = document.getElementById('lista_de_tarefas')
    const liListaTarefasOcultas = document.getElementById('lista_de_tarefas_ocultas')

    // cria um novo elemento do tipo li e um do tipo p
    const novoItem = document.createElement('li')
    const pTarefa = document.createElement('p')

    // adiciona o texto digitado no texto da tarefa
    pTarefa.innerText = textoTarefa
    novoItem.appendChild(pTarefa)
    
    // adiciona um ID no novo elemento
    if (salvaTarefa) {
        novoItem.id = `${qtdTarefas++}`
        salvaNovoItem(novoItem.id, textoTarefa)
    } else {
        novoItem.id = id
    }

    // cria os botões de interação
    novoItem.appendChild(criaBtnCheck(novoItem.id))
    novoItem.appendChild(criaBtnEdit(novoItem.id))
    novoItem.appendChild(criaBtnEye(novoItem.id))
    novoItem.appendChild(criaBtnTrash(novoItem.id))

    if (concluida) {
        novoItem.className = 'tarefaConcluida'
    }

    if (oculta) {
        liListaTarefasOcultas.appendChild(novoItem)
    } else {
        liListaTarefas.appendChild(novoItem)
    }
    
}


function salvaNovoItem(idTarefa, textoTarefa) {

    const novoItem = {'id': idTarefa, 'descricao': textoTarefa, 'concluida': false, 'oculta': false}
    listaTarefas.push(novoItem)
    listaJson = JSON.stringify(listaTarefas) 
    localStorage.setItem('tarefas', listaJson)

}


function criaBotao(idTarefa, iconeSrc, onclickFunction) {
    const botao = document.createElement('button');
    botao.setAttribute('class', 'btn');

    const imgIcone = document.createElement('img');
    imgIcone.setAttribute('src', iconeSrc);
    imgIcone.setAttribute('class', 'imgTarefa');

    botao.appendChild(imgIcone);

    botao.setAttribute('onclick', `${onclickFunction}('${idTarefa}')`);
    return botao;
}

function criaBtnCheck(idTarefa) {
    return criaBotao(idTarefa, './assets/imgs/check.png', 'mudaEstadoTarefa');
}

function criaBtnEdit(idTarefa) {
    return criaBotao(idTarefa, './assets/imgs/pencil.png', 'editaTarefa');
}

function criaBtnEye(idTarefa) {
    return criaBotao(idTarefa, './assets/imgs/eye.png', 'alteraVisibilidadeTarefa');
}

function criaBtnTrash(idTarefa) {
    return criaBotao(idTarefa, './assets/imgs/trash.png', 'excluiTarefa');
}


function mudaEstadoTarefa(idTarefa) {

    const tarefaSelecionada = document.getElementById(idTarefa)
    const itemSelecionado = listaTarefas[idTarefa]

    if (itemSelecionado.concluida) {
        tarefaSelecionada.className = ''
        itemSelecionado.concluida = false
    } else {
        tarefaSelecionada.className = 'tarefaConcluida'
        itemSelecionado.concluida = true
    }

    localStorage.setItem('tarefas', JSON.stringify(listaTarefas))
    
}


function editaTarefa(idTarefa) {

    const tarefaSelecionada = document.getElementById(idTarefa)
    const itemSelecionado = listaTarefas[idTarefa]

    novoTexto = prompt('Nova descrição:')

    if (novoTexto == '' || novoTexto == null) {
        alert('A tarefa precisa de uma descrição.')
        editaTarefa(idTarefa)
    } else {
        tarefaSelecionada.children[0].innerText = novoTexto;
        itemSelecionado.descricao = novoTexto;
    }
    
    localStorage.setItem('tarefas', JSON.stringify(listaTarefas))
}


function excluiTarefa(idTarefa) {

    const tarefaSelecionada = document.getElementById(idTarefa)
    const confirmacao = confirm('Confirma exclusão?')
    
    if (confirmacao) {
        tarefaSelecionada.remove()
        const incice = listaTarefas.findIndex(item => item.id === idTarefa);
        listaTarefas.splice(incice, 1)
    }

    localStorage.setItem('tarefas', JSON.stringify(listaTarefas))

}


function alteraVisibilidadeTarefa(idTarefa) {

    const tarefaSelecionada = document.getElementById(idTarefa)
    const itemSelecionado = listaTarefas[idTarefa]
    const liListaTarefasOcultas = document.getElementById('lista_de_tarefas_ocultas')
    const liListaTarefas = document.getElementById('lista_de_tarefas')

    if (itemSelecionado.concluida == true && itemSelecionado.oculta == false) {
        liListaTarefasOcultas.appendChild(tarefaSelecionada)
        itemSelecionado.oculta = true
    } else if (itemSelecionado.oculta == true) {
        liListaTarefas.appendChild(tarefaSelecionada)
        itemSelecionado.oculta = false
    } else {
        alert('A tarefa precisa ser concluída para ser ocultada.')
    }

    localStorage.setItem('tarefas', JSON.stringify(listaTarefas))
    
}


function alteraVisibilidadeDiv() {

    const divTarefasOcultas = document.getElementById('div_tarefas_ocultas')
    const btn = document.getElementById('btnTarefasOcultas')

    if (divTarefasOcultas.style.display == 'none') {
        divTarefasOcultas.style.display = 'block'
        btn.innerText = 'Parar de mostrar tarefas ocultas'
    } else {
        divTarefasOcultas.style.display = 'none'
        btn.innerText = 'Mostrar tarefas ocultas'
    }

}
