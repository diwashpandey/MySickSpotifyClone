async function test(){
    let a = await fetch("http://127.0.0.1:5500/Equipments/Music/data.json")
    let data = await a.json()
    console.log(data);
}