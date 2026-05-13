import { useEffect,useState } from "react"
import { db } from "../services/firebase"
import { collection,getDocs } from "firebase/firestore"

export default function Cardapio(){

const [pratos,setPratos]=useState([])

useEffect(()=>{

async function carregar(){

const querySnapshot = await getDocs(collection(db,"cardapio"))

const lista=[]

querySnapshot.forEach(doc=>{
lista.push({id:doc.id,...doc.data()})
})

setPratos(lista)

}

carregar()

},[])

return(

<div>

<h1>Gerenciamento do Cardápio</h1>

<table>

<thead>

<tr>
<th>Nome</th>
<th>Descrição</th>
<th>Preço</th>
<th>Status</th>
</tr>

</thead>

<tbody>

{pratos.map(p=>(
<tr key={p.id}>
<td>{p.nome}</td>
<td>{p.descricao}</td>
<td>{p.preco}</td>
<td>{p.disponivel ? "Disponível":"Indisponível"}</td>
</tr>
))}

</tbody>

</table>

</div>

)

}