

/*
  Find element in array by 'id'
  Returns the first matched element, not the index
*/
export const findById = function(data:{id:number, children?:any[]}[], id:number) :{id:number}|undefined {
  let match = undefined
  for(var i = 0; i < data.length; i++) {
    const children = data[i].children || []

    if (data[i].id === id) {
      match = data[i];
      break;
    } else if ( children.length && typeof children === "object") {
      match = findById(children, id);
      if( match ) break;
    }
  }
  return match
}



/*
  Remove elements from array by 'id'. Supports nested via 'children'
  Returns new array without the matched elements
*/
export const filterRecursive = function(arr :any[], item :{id:string|number}) {
  const arrFiltered = arr.slice(0).filter(function f(b) {
    if( b.id === item.id ) return false
    if( b.children ) b.children = b.children.slice(0).filter(f)
    return true
  })
  return arrFiltered
}
