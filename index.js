
var request = $.ajax({
    url: "/index.json",
    method : "GET"
});

token = localStorage.getItem("GITHUB_PAT")



request.done(function(data){
    for(doc in data)
    {
        var html = `<div class="card mx-3 mt-3 pt-2">
            <div class="d-flex flex-row justify-content-around">
                <div class="col-1" style="font-size: 1.5rem">${data[doc].dataset_type}</div>
                <div class="col-4">
                    <small class="col">Nombre del Dataset</small>
                    <label class="col">${data[doc].name}</label>
                </div>
                <div class="col-4">
                    <small class="col">Creador</small>
                    <label class="col">${data[doc].publishers}</label>
                </div>
                
                <div class="col-1">
                ${
                    data[doc].editable && token != null ? 
                    `<a href="editors/${data[doc].schema ? "schema_json" : "plain_json"}/editor.html?name=${data[doc].url_dir}" class="r" target="_blank">
                        <i class="col fas fa-edit" style="font-size: 1.5rem;"></i>
                        <label class="col" style="font-size: 12px" >Contribuir<label>
                    </a>` : ""
                }
                    
                </div>
                <div class="col-1">
                ${
                    data[doc].visualizer.Count > 0 ? data[doc].visualable.forEach(i => {
                        `<a href="">
                    <i class="col fas fa-eye" style="font-size: 1.5rem;"></i>
                    <label class="col" style="font-size: 12px" >Visualizar</label>
                    </a>`
                    }) : ""
                }
                    
                </div>
                <i class="fas fa-angle-down col-1" style="font-size: 2rem;" data-toggle="collapse" data-target="#${doc}" aria-expanded="false"></i>
                </div>
                <div id="${doc}" class="collapse">
                    <lable class="ml-5"> Descargar </label>
                    <p class="mx-5">
                        ${data[doc].description}
                    </p>
                </div>
            </div>`
        $( "#dataBib" ).append(html)
    };
})


