import {store} from "@/store/index"

const generateLinkList =(id:string)=>{
    // 获取store中的网络信息，然后转换为列表展示所需结构
    let table:Array<any> =[];

    if (id=='') return table
     // 获取store中的网络信息，然后转换为列表展示所需结构
    const network =store.getters.getNetwork(id);
    const additionalInfo =store.getters.getAdditionInfo(id);
    const links =network.links;
    links.forEach((link:any) => {
        table.push({
            id:link.id,
            bandWidth:link.bandWidth,
            source:link.end1node,
            target:link.end2node
        })
    });

    return table;
}

export {generateLinkList}