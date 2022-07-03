// 定义网络各元素的数据结构
interface NetworkType {
    id:string;
    remark:string;
    hosts:{
        id:string,
        ip:string,
        port:string
    }[],
    switches:{
        id:string,
        ports:{
            port:string
        }[]
    }[],
    links:{
        id:string,
        bandWidth:number,
        end1:{
            node:string,
            port:string
        },
        end2:{
            node:string,
            port:string
        }
    }[]
}

// 对于NetCreateTable组件来说，不同的元素表格字段不同，因此需要定制
let tableField ={
    hosts:{
        flag:"主机信息",
        edit:"编辑信息",
        del:"删除主机",
        add:"添加主机",
        field:["主机ID","主机IP","主机PORT"]
    },
    switches:{
        flag:"交换机信息",
        edit:"编辑信息",
        del:"删除交换机",
        add:"添加交换机",
        field:["交换机ID","交换机端口0","交换机端口1","交换机端口2","交换机端口3"]
    },
    links:{
        flag:"链路信息",
        edit:"编辑信息",
        del:"删除链路",
        add:"添加链路",
        field:["链路ID","链路带宽","(1)端结点ID","(1)端结点PORT","(2)端结点ID","(2)端结点PORT"]
    }
}

export {tableField}

export type {NetworkType}