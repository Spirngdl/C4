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
        port0:string,
        port1:string,
        port2:string,
        port3:string
        // ports:{
        //     port:string
        // }[]
    }[],
    links:{
        id:string,
        bandWidth:number,
        end1node:string,
        end1port:string,
        end2node:string,
        end2port:string
        // end1:{
        //     node:string,
        //     port:string
        // },
        // end2:{
        //     node:string,
        //     port:string
        // }  //不能这样设置主要原因在于表格的prop属性
    }[]
}

// 对于NetCreateTable组件来说，不同的元素表格字段不同，因此需要定制
let tableField ={
    hosts:{
        flag:"主机信息",
        edit:"编辑信息",
        del:"删除主机",
        add:"添加主机",
        field:["主机ID","主机IP","主机PORT"],
        props:['id','ip','port']
    },
    switches:{
        flag:"交换机信息",
        edit:"编辑信息",
        del:"删除交换机",
        add:"添加交换机",
        field:["交换机ID","交换机端口0","交换机端口1","交换机端口2","交换机端口3"],
        props:['id','port0','port1','port2','port3']
    },
    links:{
        flag:"链路信息",
        edit:"编辑信息",
        del:"删除链路",
        add:"添加链路",
        field:["链路ID","链路带宽","(1)端结点ID","(1)端结点PORT","(2)端结点ID","(2)端结点PORT"],
        props:['id','bandWidth','end1node','end1port','end2node','end2port']
    }
}

export {tableField}

export type {NetworkType}