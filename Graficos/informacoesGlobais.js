async function vizualizarInformacoesGlobais() {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Erro na requisição: ${res.status}`);
        }

        const dados = await res.json();

        if (!dados.total_pessoas_conectadas || !dados.total_pessoas_mundo || !dados.tempo_medio) {
            throw new Error('Dados insuficientes ou ausentes na resposta da API.');
        }

        const pessoasConectadas = (dados.total_pessoas_conectadas / 1e9).toFixed(2);
        const pessoasNoMundo = (dados.total_pessoas_mundo / 1e9).toFixed(2);
        const horas = parseInt(dados.tempo_medio);
        const minutos = Math.round((dados.tempo_medio - horas) * 100);
        const porcentagemConectada = ((pessoasConectadas / pessoasNoMundo) * 100).toFixed(2);

        const paragrafo = document.createElement('p');
        paragrafo.classList.add('graficos-container__texto');
        paragrafo.innerHTML = `
            Você sabia que o mundo tem <span>${pessoasNoMundo} bilhões</span> de pessoas e que aproximadamente 
            <span>${pessoasConectadas} bilhões</span> estão conectadas em alguma rede social e passam em média 
            <span>${horas} horas</span> e <span>${minutos} minutos</span> conectadas.<br>Isso significa que 
            aproximadamente <span>${porcentagemConectada}%</span> de pessoas estão conectadas em alguma rede social.
        `;

        const container = document.getElementById('graficos-container');
        if (!container) {
            throw new Error('Elemento com id "graficos-container" não encontrado no HTML.');
        }
        container.appendChild(paragrafo);
    } catch (error) {
        console.error('Erro ao visualizar informações globais:', error.message);
    }
}

vizualizarInformacoesGlobais();