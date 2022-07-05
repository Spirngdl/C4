// topoData初始数据获取（fake data）
const topoData = {
    // 点集
    nodes: [
      {
        id: 'host1', // String，该节点存在则必须，节点的唯一标识
        label:"host1",
        type:"image",
        img:new URL('../assets/network/pc.png',import.meta.url).href,
        size:[35,30],
        clipCfg:{
          show:true,
          type:'rect',
        }
      },
      {
        id: 'host2', // String，该节点存在则必须，节点的唯一标识
        label:"host2",
        type:"image",
        img:new URL('../assets/network/pc.png',import.meta.url).href,
        size:[35,30],
        clipCfg:{
          show:true,
          type:'rect',
        }
      },
      {
          id:"host3",
          label:"host3",
           type:"image",
          img:new URL('../assets/network/pc.png',import.meta.url).href,
          size:[35,30],
          clipCfg:{
            show:true,
            type:'rect',
         }
      },
      {
          id:"switch",
          label:"switch",
          type:"image",
          img:new URL('../assets/network/switch.png',import.meta.url).href,
          size:[45,30],
          clipCfg:{
            show:true,
            type:'rect',
          }
      }
    ],
    // 边集
    edges: [
      {
        id:'1',
        source: 'host1', 
        target: 'switch',
        label:"link-s1",
      },
      {
        id:'3',
        source: 'host2', 
        target: 'switch', 
        sourceAnchor:0,
        targetAnchor:0,
        label:"link-s2",
      },
      {
        id:'4',
        source: 'host3', 
        target: 'switch', 
        label:'link-s3',
      }
    ],
  };

const topoDataCfg ={
    nodes:[
        {
            id:"switch",
            ports:{
                's1':{
                    target:"host1",
                    state:"up"
                },
                's2':{
                    target:"host2",
                    state:"up"
                },
                's3':{
                    target:"host3",
                    state:"up"
                },
            }
        }
    ]
  }

  export {topoData,topoDataCfg}