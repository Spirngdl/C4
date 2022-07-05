// 实现链路的增删
import G6 from "@antv/g6"
function addEdge(graph:any,source:string,target:string){
    graph.addItem('edge',{
        id:source+'-to-'+target,
        label:source+'-to-'+target,
        source,
        target,
    })
}

function delEdge(graph:any,id:string){
    graph.removeItem(id)
}

export {addEdge,delEdge}