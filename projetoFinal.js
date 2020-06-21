const MATRICULA = 110683;
let total = -1;

function topicoToDom(topico) {
    appendElementsContainer(
        document.getElementById('publicacoes'),
        createDOMElement('section'),
        [
            appendElements(createDOMElement('article'), [
                createDOMElement('p', { textContent: topico.conteudo }),
                createDOMElement('button', {
                    textContent: '\u00D7',
                    onClick: e =>
                        deletarTopico(e, topico.idUsuario, topico.index)
                })
            ]),
            appendElements(createDOMElement('form'), [
                createDOMElement('input', {
                    placeHolder: 'adicione um comentário...'
                }),
                createDOMElement('button', { textContent: 'enviar' })
            ])
        ]
    );
}

function updateCounter(topicos) {
    total = topicos.length - 1;
    return topicos;
}

function listaTopicos() {
    getRecursos(110683)
        .then(updateCounter)
        .then(topicos =>
            topicos.map((topico, index) => {
                topico.index = index;
                return topico;
            })
        )
        .then(topicos => topicos.forEach(topicoToDom));
}

const adicionarTopico = e => {
    e && e.preventDefault();
    const topicoDOM = document.getElementById('topico');
    Topico(110683, topicoDOM.value).then(() => {
        total++;
        getRecurso(110683, total)
            .then(topico => {
                topico.index = total;
                return topico;
            })
            .then(topicoToDom)
            .then(() => (topicoDOM.value = ''));
    });
};

const deletarTopico = (e, idUsuario, idRecurso) => {
    const topicoDeletado = e.target.parentNode.parentNode;
    deleteRecurso(idUsuario, idRecurso).then(() => topicoDeletado.remove());
};

listaTopicos();

document
    .getElementById('formulario')
    .addEventListener('submit', adicionarTopico);
