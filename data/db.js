const perfis = [
  {
    id: 1,
    nome: "Comum",
  },
  {
    id: 2,
    nome: "Administrador",
  },
];

const usuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "jsilva@zemail.com",
    idade: 30,
    perfil_id: 1,
    status: "BLOQUEADO",
  },
  {
    id: 2,
    nome: "Luiz Paulo F de Albuquerque",
    email: "lpa@zemail.com",
    idade: 38,
    perfil_id: 2,
    status: "INATIVO",
  },
  {
    id: 3,
    nome: "Mariana Oliveira de Albuquerque",
    email: "marioa@zemail.com",
    idade: 22,
    perfil_id: 1,
    status: "ATIVO",
  },
];

module.exports = { usuarios, perfis };
