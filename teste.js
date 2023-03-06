const nomes = ['anna', 'cris', 'tina', 'titina','julia']

const nomesNovo = nomes.filter((nome) => {
    return nome !== 'julia'
})

console.log(nomesNovo)