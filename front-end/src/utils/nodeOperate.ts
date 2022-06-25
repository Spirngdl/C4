// G6自定义用户行为，实现节点的增删改查
import G6 from "@antv/g6"
function addNode(graph:any,type:string,index:number){
    graph.addItem('node',{
        id:type+'-new-'+index,
        label:type+'-new-'+index,
        type:"image",
        img:new URL('../assets/network/'+type+'.png',import.meta.url).href,
        size:[35,30],
        clipCfg:{
            show:true,
            type:'rect',
        },
        x:20,
        y:20
    })
}


export {addNode}