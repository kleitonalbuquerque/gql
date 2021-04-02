const { usuarios, perfis } = require("../data/db");

module.exports = {
  ola() {
    return "Bom dia!";
  },
  horaAtual() {
    let time = new Date();
    // return time.toString()
    return time;
  },
  usuarioLogado() {
    return {
      id: 1,
      nome: "Mariana Futura TI",
      email: "mariana@email.com",
      idade: 1,
      salario_real: 10000,
      vip: true,
    };
  },
  produtoEmDestaque() {
    return {
      nome: "Notebook",
      preco: 5000,
      desconto: 0.1,
    };
  },
  numerosMegaSena() {
    const crescente = (a, b) => a - b;
    numbers = Array(6)
      .fill(0)
      .map((n) => parseInt(Math.random() * 60 + 1))
      .sort(crescente);
    console.log(numbers);
    return numbers;
  },
  usuarios() {
    return usuarios;
  },
  usuario(_, { id }) {
    const selecionados = usuarios.filter((u) => u.id === id);
    return selecionados ? selecionados[0] : null;
  },
  perfis() {
    return perfis;
  },
  perfil(_, { id }) {
    const selecionados = perfis.filter((p) => p.id === id);
    return selecionados ? selecionados[0] : null;
  },
};
