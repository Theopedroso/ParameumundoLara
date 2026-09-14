# Para o meu mundo, Lara 💗

Site estilo Spotify (vermelho e branco) feito para a Lara, com playlist, fotos e curiosidades.

## Como publicar (GitHub Pages)

1. Vá em **Settings → Pages** neste repositório.
2. Em "Source", selecione a branch `main` e a pasta `/ (root)`.
3. Salve. Em alguns minutos o site estará em `https://theopedroso.github.io/ParameumundoLara/`.

## Como editar o conteúdo

Tudo foi deixado com comentários `EDITE AQUI` nos arquivos:

- **Data de início do relacionamento** → `js/main.js`, constante `START_DATE`.
- **Cartinha surpresa** (mensagem da tela inicial) → `index.html`, dentro da `div id="letterModal"`.
- **Músicas** → `playlist.html`. Pegue o link do Spotify (Compartilhar → Copiar link do música),
  copie o ID que vem depois de `/track/` e troque no `src` do iframe correspondente.
- **Fotos** → salve os arquivos em `/fotos/` com os nomes `foto1.jpg`, `foto2.jpg`, etc.
  (pode ajustar nomes/legendas/quantidade em `js/fotos.js`). Enquanto a foto não existir,
  aparece um cartão de placeholder no lugar — sem erro quebrado.
- **Curiosidades** (cartas "Você sabia?") → `js/curiosidades.js`, array `CURIOSIDADES`.
- **Quiz do casal** → `js/curiosidades.js`, array `QUIZ` (marque a resposta certa em `correct`).

## Funcionalidades incluídas

- Contador ao vivo de "tempo juntos" (dias/horas/min/seg).
- Playlist com os players oficiais do Spotify (toca de verdade).
- Galeria de fotos com lightbox (setas do teclado também funcionam).
- Cartas viráveis de curiosidades + quiz interativo com pontuação.
- Corações flutuantes de fundo e confete de corações em momentos especiais.
- Easter egg: clique 3x rápido no coração do menu 💗
- Layout responsivo (menu lateral no desktop, barra inferior no celular).
- `noindex` no `<head>` para o site não aparecer em buscas do Google.
