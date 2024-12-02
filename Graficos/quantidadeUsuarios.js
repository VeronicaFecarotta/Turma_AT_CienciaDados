async function quantidadeUsuariosPorRede() {
    try {
        const url = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/numero-usuarios.json';
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Erro ao acessar a API: ${res.status}`);
        }

        const dados = await res.json();
        const nomeDasRedes = Object.keys(dados);
        const quantidadeDeUsuarios = Object.values(dados);

        const data = [
            {
                x: nomeDasRedes,
                y: quantidadeDeUsuarios,
                type: 'bar',
                marker: {
                    color: getCSS('--primary-color')
                }
            }
        ];

        const layout = {
            plot_bgcolor: getCSS('--bg-color'),
            paper_bgcolor: getCSS('--bg-color'),
            title: {
                text: 'Redes sociais com mais usuários',
                x: 0,
                font: {
                    color: getCSS('--primary-color'),
                    size: 30,
                    family: getCSS('--font')
                }
            },
            xaxis: {
                tickfont: tickConfig,
                title: {
                    text: 'Nome das redes',
                    font: {
                        color: getCSS('--secondary-color')
                    }
                }
            },
            yaxis: {
                tickfont: tickConfig,
                title: {
                    text: 'Bilhões de usuários ativos',
                    font: {
                        color: getCSS('--secondary-color')
                    }
                }
            }
        };

        const grafico = document.createElement('div');
        grafico.className = 'grafico';
        const container = document.getElementById('graficos-container');

        if (!container) {
            throw new Error('Elemento com id "graficos-container" não encontrado no HTML.');
        }

        container.appendChild(grafico);
        Plotly.newPlot(grafico, data, layout);
    } catch (error) {
        console.error('Erro ao carregar gráfico:', error.message);
    }
}

quantidadeUsuariosPorRede();