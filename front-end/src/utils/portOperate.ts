// 实现对交换机端口的down/up操作
import G6 from "@antv/g6"

import {topoData,topoDataCfg} from "@/utils/topoData"
// 定义一端为叉的边类型
function registerEdge(name:string,flag:number){
    G6.registerEdge(name,{
        afterDraw(cfg:any,group:any){
            const edge =group.get('children')[0];
            const port =edge.getPoint(flag)
             const rectColor = cfg.midPointColor || '#333';
            group.addShape('rect',{
                attrs:{
                    width:10,
                    height:10,
                    fill:rectColor || '#333',
                    x:port.x-5,
                    y:port.y-5
                  }
              })
            },
            update:undefined
        },
        // 统一继承line类型边
        'line'
    )
}
// 定义两端为叉的边类型

// 当某个交换的某个端口被down掉时，为其指定类型
function downSwitchport(graph:any,s:string,port:string){
    // 根据交换机和对应端口号找到链路，并根据source和target确定port位置
    // 生成该自定义边的name
    const name =s+'-'+port+'-down';
    let target:string;
    let flag =1;
    let edgeId;
    // 找到该边，并分析flag为0还是1
    topoDataCfg.nodes.forEach(item=>{
        if (item.id=='switch'){
            target =item.ports[port as keyof typeof item.ports].target;
            console.log(target)
        }
    })
    topoData.edges.forEach(edge=>{
        if (edge.source==s && edge.target ==target){
            flag =0;
            edgeId =edge.id;
        }else if (edge.source==target && edge.target ==s){
            edgeId =edge.id;
            console.log(edgeId)
        }
    })
    // 生成自定义边
    registerEdge(name,flag)
    // 添加该边
    const item =graph.findById(edgeId);
    graph.update(item,{
        type:name
    })
}

export {downSwitchport}