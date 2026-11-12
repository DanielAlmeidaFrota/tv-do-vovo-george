# 📺 TV do Vovô

Tela inicial personalizada para a TV LG (webOS) do vovô George: os apps que ele usa
em blocos grandes, os jogos do Palmeiras e do Botafogo, a tabela do Brasileirão,
os remédios do dia e fotos da família.

É uma versão adaptada do [Free My TV for webOS](https://github.com/danielthejoker18/FreeMyTvWebOS)
e roda como um app comum da TV, instalado pelo Modo Desenvolvedor da LG (sem root).

## O que aparece na tela

- **Saudação** com o nome e a hora do dia: "Bom dia, vovô George!"
- **Botões do topo:** ⚙️ Configurações (abre as configurações da própria TV) e
  ✏️ Personalizar (ajustes deste app), além do clima do Gama e do relógio.
- **Tabela do Brasileirão:** 9 times por vez. Selecione a caixa, aperte OK e use
  ▲▼ para rolar; OK ou Voltar para sair. Palmeiras e Botafogo ficam destacados.
- **Remédios das próximas 6 horas:** ligou a TV às 10:00, aparecem os das 10:00 às 16:00.
  O próximo fica em amarelo, com quanto tempo falta. É um painel fixo, não um alarme.
- **Porta-retrato** com as fotos da família, trocando a cada 45 segundos.
- **Apps:** TV Aberta, Globoplay, Netflix, YouTube, Prime Video, Disney+, HDMI 1 e Navegador.
- **Seus Times (aba ⚽ Futebol):** próximo jogo e último resultado de cada time, com
  placar ao vivo durante o jogo. OK num jogo abre a agenda completa.
  As abas Filmes e Séries continuam disponíveis.

Os dados dos jogos e da tabela vêm da API pública da ESPN, e o clima do Open-Meteo.
Nenhum dos dois pede chave.

## Configurar

Tudo o que é da família fica em [`app/config.js`](app/config.js):

| Campo | Para quê |
|---|---|
| `nome` | Nome na saudação |
| `cidade`, `latitude`, `longitude` | Cidade do clima (Gama-DF). Com as coordenadas o app não procura a cidade pelo nome nem usa o IP |
| `times` | Times acompanhados, pelo id da ESPN ([lista da Série A](https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/teams)) |
| `remedios` | `{ hora: '08:00', nome: 'Losartana' }`, um por remédio |
| `trocarFotoSegundos` | Tempo de cada foto no porta-retrato |
| `focoFotos` | Onde mirar o recorte de cada foto (`'50% 10%'` = centro, perto do topo), para não cortar rostos |

Nome, cidade e remédios também podem ser mudados na própria TV, em ✏️ Personalizar.
O que for salvo na TV vale mais do que o `config.js`.

### Fotos

Coloque os arquivos `.jpg`, `.png` ou `.webp` em `app/fotos/`. Fotos na horizontal
ficam melhores; o ideal é ter menos de 1 MB cada. O `build.py` monta a lista sozinho.

> As fotos **não vão para o git**. A pasta `app/fotos/` e o pacote `dist/*.ipk`
> (que leva as fotos dentro) estão no `.gitignore`.

## Gerar e instalar na TV

### 1. Preparar a TV (uma vez)

1. Na LG Content Store, instale o app **Developer Mode**.
2. Entre com uma conta gratuita de [desenvolvedor LG](https://webostv.developer.lge.com)
   e ligue **Dev Mode Status** (a TV reinicia).
3. Abra o Developer Mode de novo e ligue o **Key Server**. Anote o **IP** e a **senha**.

### 2. Gerar o pacote e instalar

```bash
python scripts/build.py   # gera dist/org.webos.tvdovovo_<versão>_all.ipk
```

O instalador precisa da biblioteca `cryptography`. Com o [uv](https://docs.astral.sh/uv/),
sem instalar nada de vez (PowerShell):

```powershell
$env:FMTV_PASSPHRASE = "SENHA"   # a senha do Key Server
uv run --no-project --with cryptography python scripts/install.py IP_DA_TV
Remove-Item Env:FMTV_PASSPHRASE
```

Depois da primeira vez, a chave fica salva em `~/.ssh/webos_tv_rsa_decrypted` e as
próximas instalações não pedem senha nem precisam do Key Server.
**Desligue o Key Server** na TV depois de instalar.

Alternativa sem terminal: [webOS Dev Manager](https://github.com/webosbrew/dev-manager-desktop/releases)
(`winget install webosbrew.webOSDevManager`) → conectar com IP e senha → **Install .ipk**.

### 3. Atualizar

Mudou algo (código, remédios, fotos)? Rode `python scripts/build.py` e o mesmo comando
de instalação. A TV precisa estar ligada e no mesmo Wi-Fi.

### Atalho no controle

Com o TV do Vovô aberto, **segure o botão 1** do controle e escolha o app.
Depois, segurar o 1 abre ele de qualquer lugar.

## Ver no computador

Abra `app/index.html` no navegador. A tela é montada em 1920×1080 e se ajusta ao tamanho
da janela; as setas e o Enter fazem o papel do controle, e o Esc é o Voltar. Abrir outros
apps só funciona na TV. A ESPN pode bloquear alguns navegadores de teste; na TV funciona.

## Avisos

- **O Developer Mode expira.** Quando o prazo acaba, a TV apaga o app. De tempos em tempos
  abra o app Developer Mode na TV e renove a sessão.
- **Abrir sozinho ao ligar a TV** não é possível sem root, e a TV do vovô (LG 32LR600BPSA,
  webOS 23, firmware 13.50.46) não tem root disponível. Use o atalho do botão 1.
- **TV de entrada:** o visual foi deixado leve de propósito (sem desfoques em tempo real,
  escudos em tamanho pequeno) para a navegação não travar.
- **Privacidade:** a localização vem da cidade configurada, não do GPS nem do IP
  (a localização por IP existe nos ajustes, mas vem desligada). Os serviços de clima e
  futebol veem o IP da casa, como qualquer site; fotos e remédios ficam só na TV.

## Desenvolvimento

- O app inteiro está em [`app/index.html`](app/index.html), em **JavaScript ES5**
  (sem `let`/`const`, arrow functions ou template strings), para rodar em webOS antigo.
- Depois de editar: `python scripts/sync_docs.py` (espelha o app em `docs/`) e
  `python scripts/check.py`.
- Teste no navegador, nos 5 idiomas: `python scripts/browser_test.py --chrome CAMINHO_DO_CHROME_OU_EDGE`.
- Textos novos: escreva em inglês no código e coloque a tradução em `I18N.pt`.

## Créditos e licenças

- Base: [Free My TV for webOS](https://github.com/danielthejoker18/FreeMyTvWebOS), licença MIT ([LICENSE](LICENSE)).
- Fonte [Lexend](https://github.com/googlefonts/lexend), SIL Open Font License ([app/assets/fonts/OFL.txt](app/assets/fonts/OFL.txt)).
- Logos dos apps: [Simple Icons](https://simpleicons.org) ([app/assets/brands/SIMPLE-ICONS-LICENSE.md](app/assets/brands/SIMPLE-ICONS-LICENSE.md)).
- Dados de futebol: ESPN. Clima: [Open-Meteo](https://open-meteo.com).
