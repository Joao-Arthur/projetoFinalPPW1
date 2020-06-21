function Comentario(idUsuario, conteudo, idComentarioPai) {
    const comentario = Object.freeze({
        tipoRecurso: tipos.COMENTARIO,
        idComentario: new Date().valueOf(),
        idComentarioPai,
        conteudo,
        idUsuario
    });

    return postRecurso(idUsuario, comentario);
}
