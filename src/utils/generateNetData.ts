// 根据network生成G6引擎可以识别的topo数据
import {NetworkType} from "@/object/network/network"
import {network} from "@/object/data/defaultNetwork"
interface Type {
    nodes:Array<any>,
    edges:Array<any>
}

// 当给链路指定source时，由于之前结点添加了host和switch，但是links中的设备名称不易区分，所以弄一个函数
const getNodeName= (label:string)=>{
    if (label.indexOf('device')!=-1){
        // 说明为交换机
        return 'switch'+label
    }else{
        return 'host'+label
    }
}

const generateNetData =(network:NetworkType)=>{
    let result:Type = {nodes:[],edges:[]}
    // 添加主机
    network.hosts.forEach(host=>{
        result.nodes.push({
            id:'host'+host.id,
            label:'host'+host.id,
            type:"image",
            img:new URL('../assets/network/pc.png',import.meta.url).href,
            size:[35,30],
            clipCfg:{
                show:true,
                type:'rect',
            }
        })
    })
    // 添加交换机
    network.switches.forEach(Switch=>{
        result.nodes.push({
            id:'switch'+Switch.id,
            label:"switch",
            type:"image",
            img:new URL('../assets/network/switch.png',import.meta.url).href,
            size:[45,30],
            clipCfg:{
              show:true,
              type:'rect',
            }
        })
    })
    // 添加链路
    network.links.forEach((link,index)=>{
        result.edges.push({
            id:link.id,
            label:link.id,
            source:getNodeName(link.end1node),
            target:getNodeName(link.end2node)
        })
    })
    return result
}

const G6Network =generateNetData(network)



export {G6Network}