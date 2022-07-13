export function enCodeLink (string){
    let name = string.split(" ").join("-")
    return name.toLowerCase()
}