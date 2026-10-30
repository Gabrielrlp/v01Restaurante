# Revisão — nex7step, protótipo 3

## Resultado

Código revisado: HTML, CSS e todos os scripts da versão 2 entregue nesta conversa. Não foram encontrados erros de sintaxe nos JavaScript. Os fluxos de entrada, busca, modal, tamanho/preço e lista foram verificados no navegador após as alterações. Isso é uma revisão de código e funcionamento, não um teste de invasão nem uma garantia de ausência de vulnerabilidades.

## Alterações solicitadas

- `index.html` na raiz encaminha para `public/pages/index.html`, com link alternativo e redirecionamento HTML para quando o JavaScript estiver desativado. O catálogo ainda precisa de JavaScript para renderizar os produtos.
- Caminhos relativos de CSS, scripts, imagens e logos ajustados. Compatíveis com o subdiretório de repositórios no GitHub Pages.
- Pasta duplicada removida no pacote. Envie o conteúdo de `nex7step` à raiz do repositório.
- No desktop acima de 900 px, foto principal de 340 para 395 px; título principal com máximo de 65 para 74 px; marca no header de 26 para 28 px. Regras móveis preservadas.

## Problemas e correções

| Achado | Tratamento |
| --- | --- |
| Nome, descrição e outros campos do catálogo eram interpolados diretamente em HTML | Escape de caracteres em texto e atributos. A origem atual é um arquivo controlado pelo desenvolvedor; não havia evidência de uma exploração externa. A correção previne interpretação de marcação se esses dados mudarem de origem no futuro. |
| Caminhos de imagens montados a partir de nomes livres | Nomes de fotos limitados a letras, números, hífen e sublinhado. Logo restrito a arquivos locais de assets. |
| Lista local sem validade e validação incompleta | IDs e variantes conferidos contra catálogo, quantidades limitadas a 1–99, tamanho da leitura limitado, duplicatas agrupadas e registros aceitos por até 24h desde a última alteração. A verificação ocorre ao carregar a página, não por um timer. |
| Dados numéricos inválidos podiam resultar em erro ou preço inadequado | Formatação converte e valida números; inválidos exibem “Preço sob consulta”. Os preços devem continuar sendo números no cadastro. |
| Campo de quantidade vazio não explicava por que não adicionava | Campo obrigatório e validação nativa. |
| Reconstrução da lista perdia foco de alguns botões | Foco restaurado após alteração e remoção de itens. |
| Ausência de política explícita de recursos | CSP via meta restringindo scripts, estilos e imagens; bloqueia conexões fetch/XHR, objetos e envio de formulários. |
| Links de contato aceitavam HTTP | Links externos somente HTTPS, sem credenciais na URL, mantendo noopener/noreferrer. |

## Proteções e seus limites

- CSP não substitui tratamento de dados. O HTML continua usando templates com trechos fixos e valores escapados. Em uma futura API, prefira construir campos com `textContent` e valide também no servidor.
- A CSP atual não permite CDN, fontes remotas, widgets, analytics ou API externa. Se adicionar uma integração real, reveja a política por domínio, sem liberar tudo indiscriminadamente.
- `frame-ancestors` e `X-Frame-Options` não são configurados por uma meta tag. Proteções desse tipo exigem cabeçalhos HTTP definidos pela hospedagem/proxy. Não foi prometida proteção contra enquadramento em iframe.
- `localStorage` pode ser alterado pelo visitante. Não serve como fonte confiável de preço, pedido ou pagamento. A lista é apenas uma anotação local e não contém cadastro de cliente.
- Os arquivos de front-end são públicos. Nunca inserir senha, token privado, credenciais do banco ou segredo de pagamento em JS, HTML, commits ou arquivos enviados ao Pages.
- Proteja a conta GitHub com autenticação forte, limite quem pode alterar a branch publicada e revise mudanças antes de publicar. Não foi feita alteração na sua conta/repositório.
- Ative Enforce HTTPS no Pages. O arquivo entregue não consegue ativar essa opção por você.
- QR impresso deve apontar à URL estável e HTTPS do restaurante; confira também as placas físicas para evitar substituição por adesivos maliciosos.

## Melhorias sugeridas, ainda não implementadas

1. Fotos reais, nomes claros, tamanhos e informações de alergênicos confirmadas pelo restaurante; substituir todos os dados demonstrativos antes da venda.
2. Mais vendidos e recomendações da casa com critérios do restaurante, sem inventar popularidade.
3. Ordenação por preço e filtros alimentares adicionais apenas quando o estabelecimento tiver dados confiáveis. Vegetarianismo não implica ausência de alergênicos.
4. Botão para alternar entre grade e lista, útil para cardápios grandes e telas pequenas.
5. Galeria por produto com imagens de tamanhos/acompanhamentos reais.
6. Melhorias de acessibilidade: testes em aparelhos reais com VoiceOver/TalkBack, teclado, zoom e contraste das cores escolhidas por cada restaurante.
7. Dados estruturados de restaurante, título/descrição e imagem de compartilhamento com endereço e domínio reais. Evitar publicar metadados falsos do protótipo.
8. Validação automática do catálogo antes de publicar: IDs únicos, preços positivos, imagens existentes e variantes válidas.
9. Refatorar o CSS para consolidar regras repetidas de V1/V2/V3 e separar os scripts por responsabilidade. Atualmente funciona, mas depende da ordem indicada no HTML.
10. Página simples de indisponibilidade e política de atualização dos preços com o cliente. Cache offline/PWA somente depois de definir como evitar cardápio desatualizado.
11. Antes do backend, decidir a API e o modelo de dados. Quando existir compra real, preço, disponibilidade, permissões e pagamento devem ser validados no servidor.

## Referências consultadas

A ferramenta de busca retornou erro. Foi possível consultar diretamente estas fontes primárias; as sugestões de produto acima são avaliação do projeto, não uma comparação exaustiva de mercado.

- GitHub Docs — HTTPS no Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
- OWASP — DOM Based XSS Prevention Cheat Sheet, consultada no repositório oficial: https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.md
- Square — experiência de cardápio/pedido móvel por QR: https://squareup.com/us/en/online-ordering/qr-code-ordering

A Square inclui envio de pedidos e pagamento. Aqui a referência é a navegação pelo celular e acesso via QR; nenhuma integração de venda foi adicionada.
