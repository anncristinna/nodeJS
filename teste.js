let nomes = ['anna', 'cris', 'tina', 'titina','julia']

const nomesNovo = nomes.filter((nome) => {
    return nome !== 'julia'
})

console.log(nomesNovo)

const apenasAnna = nomes.find((nome) => {
    return nome == "anna"
})

console.log(apenasAnna)

console.log(nomes.includes("titina"))
console.log(nomes.includes("anna", 2))
nomes = [...nomes, "cecilia"]
console.log(nomes)

const nomes2 = [...nomes, "cristina"]
console.log(nomes2)

console.log(nomes.slice(0,4))
console.log(nomes.slice(2, 4))
console.log(nomes)
console.log(nomes.slice(1, -2))