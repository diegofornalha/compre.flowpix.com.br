# Visão geral do projeto

Use este guia para construir uma aplicação web onde usuários podem fornecer um prompt de texto para gerar emojis usando um modelo hospedado no Replicate.

# Requisitos de funcionalidades

- Utilizaremos Next.js, Shadcn, Lucid, Supabase, Clerk
- Criar um formulário onde usuários podem inserir o prompt e clicar em um botão que chama o modelo do Replicate para gerar o emoji
- Ter uma UI agradável e animação quando o emoji estiver em branco ou gerando
- Exibir todas as imagens já geradas em uma grade
- Ao passar o mouse sobre cada imagem de emoji, devem aparecer um botão de ícone para download e um botão de ícone para curtir

# Documentação relevante

## Como usar o modelo gerador de emoji do Replicate

import Replicate from "replicate";

const replicate = new Replicate({
auth: process.env.REPLICATE_API_TOKEN,
});

const output = await replicate.run(
"fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
{
input: {
width: 1024,
height: 1024,
prompt: "A TOK emoji of a man",
refine: "no_refiner",
scheduler: "K_EULER",
lora_scale: 0.6,
num_outputs: 1,
guidance_scale: 7.5,
apply_watermark: false,
high_noise_frac: 0.8,
negative_prompt: "",
prompt_strength: 0.8,
num_inference_steps: 50
}
}
);
console.log(output);

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
