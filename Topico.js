function Topico(idUsuario, conteudo) {
    const topico = Object.freeze({
        tipoRecurso: tipos.TOPICO,
        idTopico: new Date().valueOf(),
        idUsuario,
        conteudo
    });

    return postRecurso(idUsuario, topico);
}
