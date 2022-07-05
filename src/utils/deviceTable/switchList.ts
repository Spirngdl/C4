import {store} from "@/store/index"

const generateSwitchList =(id:string)=>{
    // 获取store中的网络信息，然后转换为列表展示所需结构
    let table:Array<any> =[];

    if (id=='') return table
     // 获取store中的网络信息，然后转换为列表展示所需结构
    const network =store.getters.getNetwork(id);
    const additionalInfo =store.getters.getAdditionInfo(id);
    const switches =network.switches;
    switches.forEach((Switch:any) => {
        table.push({
            id:Switch.id,
            manage:additionalInfo[id].switches[Switch.id].manage,
            driver:additionalInfo[id].switches[Switch.id].driver,
            sid:additionalInfo[id].switches[Switch.id].sid,
            mac:additionalInfo[id].switches[Switch.id].mac,
            isSpine:additionalInfo[id].switches[Switch.id].isSpine,
            port0:Switch.port0,
            port1:Switch.port1,
            port2:Switch.port2,
            port3:Switch.port3
        })
    });

    return table;
}








export {generateSwitchList}