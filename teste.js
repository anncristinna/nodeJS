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
console.log(nomes.at(1))
console.log(nomes.at(-1))

const nums = [1,2,4,5,6,7,8,9]
nums.copyWithin(0, 2, 4)
console.log(nums) // imprimirá 4,5,4,5,6,7,8,9

var ear = nums.entries()
console.log(ear.next().value)

const acimaDeDezoito = (valor) => {
    return valor >= 18
}
const idades = [12, 16, 19, 20, 21, 14, 15, 17]
const idades2 = [18, 30, 23, 45]
console.log(idades.every(acimaDeDezoito)) // false
console.log(idades2.every(acimaDeDezoito)) // true
idades.fill(26, 1, 2)
console.log(idades)
console.log(nomes)
nomes.fill("dudinha", 4, 5)
console.log(nomes)
const dudinha = nomes.find((nome) => nome == 'dudinha')
console.log(dudinha)
const deMenor = idades.find((idade) => idade < 18)
console.log(deMenor)
const deMenores = idades.filter((idade) => idade < 18)
console.log(deMenores)
console.log(nomes.findIndex((nome) => nome == 'dudinha')) // imprimirá 4

function ePar(valor){
    return valor % 2 == 0
}

const numeros = [15,17,19,20]
console.log(numeros.findIndex(ePar)) //imprimira 3
