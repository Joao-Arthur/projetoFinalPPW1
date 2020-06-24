const MATRICULA = 110683;
let totalRecursos = -1;

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
                    placeHolder: 'Adicione um comentário...'
                }),
                createDOMElement('button', {
                    textContent: 'enviar',
                    onClick: e =>
                        adicionarComentario(
                            e,
                            topico.idUsuario,
                            topico.idTopico
                        )
                })
            ]),
            appendElements(
                createDOMElement('div', { id: topico.idTopico }),
                topico.comentarios ? comentariosToDom(topico.comentarios) : []
            )
        ].filter(Boolean)
    );
}

const comentariosToDom = comentarios =>
    comentarios.map(comentario =>
        createDOMElement('p', {
            textContent: comentario.conteudo,
            id: comentario.idComentario
        })
    );

const adicionarTopico = e => {
    e && e.preventDefault();
    const topicoDOM = document.getElementById('topico');
    const topicoValue = topicoDOM.value;
    topicoDOM.value = '';
    Topico(110683, topicoValue).then(() => {
        totalRecursos++;
        setTimeout(
            () =>
                getRecurso(110683, totalRecursos)
                    .then(topico => {
                        topico.index = totalRecursos;
                        return topico;
                    })
                    .then(topicoToDom),
            1000
        );
    });
};

const adicionarComentario = (e, idUsuario, idRecurso) => {
    e && e.preventDefault();
    const comentarioDOM = e.target.parentNode.getElementsByTagName('input')[0];
    const comentarioValue = comentarioDOM.value;
    comentarioDOM.value = '';
    Comentario(idUsuario, idRecurso, 0, comentarioValue).then(() => {
        totalRecursos++;
        setTimeout(
            () =>
                getRecurso(110683, totalRecursos)
                    .then(comentario => {
                        comentario.index = totalRecursos;
                        return comentario;
                    })
                    .then(comentario =>
                        appendElements(
                            document.getElementById(comentario.idTopico),
                            comentariosToDom([comentario])
                        )
                    ),
            1000
        );
    });
};

const deletarTopico = (e, idUsuario, idRecurso) => {
    const topicoDeletado = e.target.parentNode.parentNode;
    deleteRecurso(idUsuario, idRecurso).then(() => topicoDeletado.remove());
};

function listaRecursos() {
    getRecursos(110683).then(recursos => {
        recursos = recursos.map((recurso, index) => {
            recurso.index = index;
            return recurso;
        });
        totalRecursos = recursos.length - 1;
        const topicos = recursos.filter(
            recurso => recurso.tipoRecurso === tipos.TOPICO
        );
        const comentarios = recursos.filter(
            recurso => recurso.tipoRecurso === tipos.COMENTARIO
        );
        topicos
            .map(topico => {
                topico.comentarios = comentarios.filter(
                    comentario => comentario.idTopico === topico.idTopico
                );
                return topico;
            })
            .forEach(topicoToDom);
    });
}

listaRecursos();

document
    .getElementById('formulario')
    .addEventListener('submit', adicionarTopico);

let scrollTimeout;

window.onscroll = function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        document.querySelector('header').className =
            document.body.scrollTop >= 100 ||
            document.documentElement.scrollTop >= 100
                ? 'headerScroll'
                : '';
    }, 100);
};
