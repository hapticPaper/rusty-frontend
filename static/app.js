function dataEndpoints() {
    fetch('https://rusty-api.herokuapp.com/datasets').then(data=>data.json()).then(d=>{
    d.datasets.forEach(n=>{
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