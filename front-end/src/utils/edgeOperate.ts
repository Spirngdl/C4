// 实现链路的增删
import G6 from "@antv/g6"
function addEdge(graph:any,source:string,target:string){
    graph.addItem('edge',{
        id:source+'-to-'+target+'-new',
        label:source+'-to-'+target+'-new',
        source,
        target,
    })
}

export {addEdge}