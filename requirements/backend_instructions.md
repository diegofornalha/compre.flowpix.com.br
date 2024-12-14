# Visão geral do projeto

Use este guia para construir o backend da aplicação web do criador de contratar_planos

# Stack tecnológica

- Utilizaremos Next.js, Supabase e Clerk

# Requisitos

1. Criar usuário na tabela de usuários 0. Clerk já está configurado, não precisa se preocupar com isso
   1. Após um usuário fazer login via Clerk com sucesso, devemos obter o userId do Clerk e verificar se o userId existe na tabela 'profiles', correspondendo ao "user_id" (Fazer isso apenas se o login do usuário for bem-sucedido)
   2. Se o usuário não existir, então criar um usuário na tabela 'profiles'
   3. Se o usuário já existir, prosseguir e passar o user_id para funções como gerar contratar_planos
2. Upload de contratar_plano para o bucket de armazenamento "contratar_planos" do Supabase;

   2. Adicionar uma linha na tabela 'contratar_planos' onde a URL da imagem vai para a tabela "contratar_planos" como "image_url", e creator_user_id será o user_id atual

3. Exibir todas as imagens no contratar_planogrid
   1. contratar_plano grid deve buscar e exibir todas as imagens da tabela "contratar_planos"
   2. Quando um novo contratar_plano for gerado, o contratar_planogrid deve ser atualizado automaticamente para adicionar o novo contratar_plano ao grid
4. Interações de curtidas
   1. Quando o usuário clicar no botão 'curtir', o num_likes deve aumentar na tabela 'contratar_planos'
   2. Quando o usuário descurtir, o num_likes deve diminuir na tabela 'contratar_planos'
