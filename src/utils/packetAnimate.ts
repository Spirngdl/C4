// 实现数据报传输动画
import G6 from "@antv/g6"
import {G6Network} from "@/utils/generateNetData"


function registerAnimate(flag:number){
    G6.registerEdge(
        'packet-transmission-'+flag,
        {
            afterDraw(cfg,group:any){
                // 获得当前边的第一个图形，这里是边本身的 path
                const shape = group.get('children')[0];
                // 边 path 的起点位置
                const startPoint = shape.getPoint(0);

                const circle = group.addShape('image', {
                  attrs: {
                    img:new URL('../assets/network/packet.png',import.meta.url).href,
                    x: startPoint.x,
                    y: startPoint.y,
                    width:15,
                    height:10
                  },
                  name: 'circle-shape',
                });
                circle.animate(
                  (ratio:any) => {
                    // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
                    // 根据比例值，获得在边 path 上对应比例的位置。
                    const tmpPoint =flag==0 ? shape.getPoint(ratio) : shape.getPoint(1-ratio);
                    // 返回需要变化的参数集，这里返回了位置 x 和 y
                    return {
                      x: tmpPoint.x,
                      y: tmpPoint.y,
                    };
                  },
                  {
                    repeat: false, // 动画不重复
                    duration: 1000,
                  },
                );
            },
        },
        'line'
    )
}

// 给定边和存在边的顺序，相同返回0，不同返回1（用于动画效果传输顺序的正确性）
function getEdgeInfo(path:Array<string>){
  let ans=0;
  let id:string ='';
  G6Network.edges.forEach((item:any)=>{
    if (item.source==path[0] && item.target==path[1]){
      ans =0;
      id =item.id;
    }else if(item.source==path[1] && item.target==path[0]){
      ans =1;
      id =item.id;
    }
  })
  return {ans,id};
}

// 为了使用迪杰斯特拉算法选路，需要先转换为邻接矩阵的形式
function translateGraph(){
  let graph =[];
  // 获取二维数组对应字段值
  let nodes:Array<any> =[];
  G6Network.nodes.forEach(node=>{
    nodes.push(node.id)
  })
  for (let i=0;i<nodes.length;i++){
    // 每一行都重新声明
    let row:Array<any> =[]
    for (let j=0;j<nodes.length;j++){
      if (nodes[i]==nodes[j]) row.push(0)
      else {
        // 寻找是否相连
        let {id} =getEdgeInfo([nodes[i],nodes[j]]);
        if (id==''){
            row.push(10000);
        }else{
          row.push(100)
        }
      }
    }
    graph.push(row)
  }
  return {graph,nodes};
}

// 迪杰斯特拉算法
function createGraph(vertex:any, matrix:any):any {
  const size = vertex.length;

  const pathTable:any = [];
  const weightTable:any = [];

  (function init() {
      for (let i = 0; i < size; i++) {
          pathTable[i] = [];
          weightTable[i] = [];
          for (let j = 0; j < size; j++) {
              pathTable[i][j] = j;
              weightTable[i][j] = matrix[i][j];
          }
      }
  })();

  (function floyd() {
      for (let i = 0; i < weightTable.length; i++) {
          for (let j = 0; j < weightTable.length; j++) {
              for (let k = 0; k < weightTable.length; k++) {
                  if (weightTable[j][k] > weightTable[j][i] + weightTable[i][k]) {
                      pathTable[j][k] = pathTable[j][i];
                      weightTable[j][k] = weightTable[j][i] + weightTable[i][k];
                  }
              }
          }
      }
  })();

  function getPathByIndex(i:any, j:any) {
      const path = [i];
      let nxt = pathTable[i][j];
      while (nxt !== j) {
          path.push(nxt);
          nxt = pathTable[nxt][j];
      }
      path.push(j);
      return path;
  }

  return {
      getPath(startVertice:any, endVertice:any) {
          const startIndex = vertex.findIndex((v:any) => v === startVertice);
          const endIndex = vertex.findIndex((v:any) => v === endVertice);

          return {
              path: getPathByIndex(startIndex, endIndex).map(
                  (index) => vertex[index]
              ),
              weight: weightTable[startIndex][endIndex],
          };
      },
  };
}

// zip函数
function zip(arrays:any) {
  return Array.apply(null, Array(arrays[0].length)).map(function (_, i) {
      return arrays.map(function (array:any) {
          return array[i]
      })
  });
}

const {graph,nodes} =translateGraph();

function getPaths(sourceID:string,targetID:string):Array<Array<any>>{
    let paths:Array<Array<any>> =[]
    let result:any;
    let graphResult =createGraph(nodes,graph);
    result =graphResult.getPath(sourceID,targetID)
    let resultHeader =JSON.parse(JSON.stringify(result.path))
    let resultFooter =JSON.parse(JSON.stringify(result.path))
    resultHeader.pop()
    resultFooter.shift()
    paths =zip([resultHeader,resultFooter])
    return paths;
}

const paths =getPaths('hosth7','hosth5')

function packetTransmission(graph:any,sourceID:string,targetID:string){
   // 提前创建动画边
   registerAnimate(0);
   registerAnimate(1);
  // 确定端到端通信路径
  // 生成过程就先不写了
  let paths =getPaths(sourceID,targetID);
  // 生成相应的动画边，结束之后去除，直到所有的边动画完全实现
  paths.forEach((path,index)=>{
    let {ans,id} =getEdgeInfo(path);
    const item =graph.findById(id);
    setTimeout(()=>{
      // 添加动画边
      graph.update(item,{
        type:'packet-transmission-'+ans
      })
      setTimeout(()=>{
        graph.update(item,{
          type:'line'
        })
      },1000)
    },index*1000) 
  })

}
export {packetTransmission,paths}