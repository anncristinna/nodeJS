function rgb(r, g, b){
    let res = '  '
    let dex = r.toString(16).toUpperCase()
    res += dex
    let dex2 = g.toString(16).toUpperCase()
    res += dex2
    let dex3 = b.toString(16).toUpperCase()
    return res
  }

  console.log(rgb(148 , 0, 211))