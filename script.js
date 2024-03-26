function adicionaTarefaNaLista() {

    // seleciona o elemento de input text que tem o texto da nova tarefa
    const novaTarefa = document.getElementById('input_nova_tarefa').value

    if (novaTarefa == '') {
        alert('A tarefa precisa de uma descrição.')
    } else {
        criaNovoItemDaLista(novaTarefa)
        document.getElementById('input_nova_tarefa').value = ''
    } 
}


function criaNovoItemDaLista(textoDaTarefa) {
    
    // recupera a lista de tarefas
    const listaTarefas = document.getElementById('lista_de_tarefas')
    
    // guarda o tamanho da lista de tarefas
    let qtdTarefas = listaTarefas.children.length + lista_de_tarefas_ocultas.children.length

    // cria um novo elemento do tipo li e um do tipo p
    const novoItem = document.createElement('li')
    const textoTarefa = document.createElement('p')

    // adiciona o texto digitado no texto da tarefa
    textoTarefa.innerText = textoDaTarefa
    novoItem.appendChild(textoTarefa)
    
    // adiciona um ID no novo elemento
    novoItem.id = `tarefa_id_${qtdTarefas++}`

    // cria os botões de interação
    novoItem.appendChild(criaBtnCheck(novoItem.id))
    novoItem.appendChild(criaBtnEdit(novoItem.id))
    novoItem.appendChild(criaBtnEye(novoItem.id))
    novoItem.appendChild(criaBtnTrash(novoItem.id))

    // adiciona o novo item na lista de tarefas
    listaTarefas.appendChild(novoItem)
}


function criaBtnCheck(idTarefa) {

    const inputCheck = document.createElement('button')
    inputCheck.setAttribute('class', 'btn')

    const imgCheck = document.createElement('img')
    imgCheck.setAttribute('src', './assets/imgs/check.png')
    imgCheck.setAttribute('class', 'imgTarefa')
    imgCheck.setAttribute('style', 'width: 30px; height:30px;')

    inputCheck.appendChild(imgCheck)

    inputCheck.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`)
    return inputCheck
}


function criaBtnEdit(idTarefa) {

    const inputEdit = document.createElement('button')
    inputEdit.setAttribute('class', 'btn')

    const imgEdit = document.createElement('img')
    imgEdit.setAttribute('src', './assets/imgs/pencil.png')
    imgEdit.setAttribute('class', 'imgTarefa')

    inputEdit.appendChild(imgEdit)

    inputEdit.setAttribute('onclick', `editaTarefa('${idTarefa}')`)
    return inputEdit
}


function criaBtnEye(idTarefa) {

    const inputEye = document.createElement('button')
    inputEye.setAttribute('class', 'btn')

    const imgEye = document.createElement('img')
    imgEye.setAttribute('src', './assets/imgs/eye.png')
    imgEye.setAttribute('class', 'imgTarefa')

    inputEye.appendChild(imgEye)

    inputEye.setAttribute('onclick', `alteraVisibilidadeTarefa('${idTarefa}')`)
    return inputEye
}


function criaBtnTrash(idTarefa) {

    const inputTrash = document.createElement('button')
    inputTrash.setAttribute('class', 'btn')

    const imgTrash = document.createElement('img')
    imgTrash.setAttribute('src', './assets/imgs/trash.png')
    imgTrash.setAttribute('class', 'imgTarefa')

    inputTrash.appendChild(imgTrash)

    inputTrash.setAttribute('onclick', `excluiTarefa('${idTarefa}')`)
    return inputTrash
}


function mudaEstadoTarefa(idTarefa) {

    const tarefaSelecionada = document.getElementById(idTarefa)

    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style = 'text-decoration: none;'
    } else {
        tarefaSelecionada.style = 'text-decoration: line-through;'
    }
}


function editaTarefa(idTarefa) {

    const tarefaSelecionada = document.getElementById(idTarefa)

    novoTexto = prompt('Nova descrição:')

    if (novoTexto == '' || novoTexto == null) {
        alert('A tarefa precisa de uma descrição.')
        editaTarefa(idTarefa)
    } else {
        tarefaSelecionada.children[0].innerText = novoTexto;
    }  
}


function excluiTarefa(idTarefa) {

    const tarefaSelecionada = document.getElementById(idTarefa)
    const confirmacao = confirm('Confirma exclusão?')
    
    if (confirmacao) {
        tarefaSelecionada.remove()
    }

}


function alteraVisibilidadeTarefa(idTarefa) {

    const tarefaSelecionada = document.getElementById(idTarefa)
    const listaTarefasOcultas = document.getElementById('lista_de_tarefas_ocultas')

    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        listaTarefasOcultas.appendChild(tarefaSelecionada)
    } else {
        alert('A tarefa precisa ser concluída para ser ocultada.')
    }

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
