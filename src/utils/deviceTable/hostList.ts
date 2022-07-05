// setup外引入store参考main.ts直接引入即可，没有useStore函数
import {store} from "@/store/index"


const getDirectSwitch =(id:string,hostId:string)=>{
    const network =store.getters.getNetwork(id);
    let Switch ='';
    network.links.forEach((link:any)=>{
        if (link.end1node==hostId) Switch =link.end2node
    })
    return Switch
}

const generateHostList =(id:string)=>{
    let table:Array<any> =[];

    if (id=='') return table
     // 获取store中的网络信息，然后转换为列表展示所需结构
    const network =store.getters.getNetwork(id);
    const additionalInfo =store.getters.getAdditionInfo(id);
    const hosts =network.hosts;
    hosts.forEach((host:any) => {
        table.push({
            id:host.id,
            ip:host.ip,
            mac:host.port,
            gw:additionalInfo[id].hosts[host.id].gw,
            switch:getDirectSwitch(id,host.id)
        })
    });

    return table;
}



export {generateHostList}