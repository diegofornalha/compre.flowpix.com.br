# Visão geral do projeto

Use este guia para construir uma aplicação web onde usuários podem fornecer um prompt de texto resoltados e serado cobrado por isso.

# Requisitos de funcionalidades

- Utilizaremos Next.js, Shadcn, Lucid, Supabase, Clerk
- Criar um formulário onde usuários podem inserir o prompt e clicar em um botão que chama o modelo do Replicate para gerar o emoji
- Ter uma UI agradável e animação quando o emoji estiver em branco ou gerando
- Exibir todas as imagens já geradas em uma grade
- Ao passar o mouse sobre cada imagem de emoji, devem aparecer um botão de ícone para download e um botão de ícone para curtir

## Como FlowPix

# Estrutura atual de arquivos (você DEVE seguir a estrutura abaixo)

EMOJI-MAKER
├── .next
├── app
│ ├── fonts
│ ├── favicon.ico
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
├── components
│ └── ui
│ ├── button.tsx
│ ├── card.tsx
│ └── input.tsx
├── lib
├── node_modules
├── requirements
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
├── tsconfig.json
├── yarn.lock
└── .gitattributes

# Regras

- Todos os novos componentes devem ir em /components e ser nomeados como exemplo-componente.tsx, a menos que especificado o contrário
- Todas as novas páginas vão em /app
