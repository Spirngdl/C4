// 实现数据报传输动画
import G6 from "@antv/g6"

let topoData:any ={
  nodes:[],
  edges:[]
}

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
  topoData.edges.forEach((item:any)=>{
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

function packetTransmission(graph:any){
   // 提前创建动画边
   registerAnimate(0);
   registerAnimate(1);
  // 确定端到端通信路径
  // 生成过程就先不写了
  let paths =[['host1','switch'],['switch','host2']]
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
export {packetTransmission}