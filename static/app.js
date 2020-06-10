function dataEndpoints() {
    fetch('https://rusty-api.herokuapp.com/endpoints').then(data=>data.json()).then(d=>{
    d.endpoints.forEach(n=>{
        o = document.createElement("option")
        o.text = n
        document.getElementById('dataSelect').add(o)
    })
    updateData()
})
}

fetch('https://rusty-api.herokuapp.com/charts').then(data=>data.json()).then(d=>{
    d.charts.forEach(n=>{
        o = document.createElement("option")
        o.text = n
        document.getElementById('chartSelect').add(o)
    })
    dataEndpoints()
})