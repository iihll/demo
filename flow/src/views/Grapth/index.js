import { Graph } from '@antv/x6'

export default class FlowGraph {
  static graph

  static init() {
    // 高亮
    const magnetAvailabilityHighlighter = {
      name: 'stroke',
      args: {
        attrs: {
          fill: '#fff',
          stroke: '#47C769',
        },
      },
    }

    this.graph = new Graph({
      container: document.getElementById('container'),
      width: 1200,
      height: 600,
      // snapline: true,
      snapline: {
        // 对齐线
        enabled: true,
        sharp: true, // 是否显示截断的对齐线-对齐线变短
      },
      selecting: {
        // 点选/框选，默认禁用。
        enabled: true,
        // rubberband: true, // 框选
        // 是否显示节点的选择框，默认为 false，建议使用下面的样式定制方法去定制自己的选择框样式。
        showNodeSelectionBox: true, // 节点的选择框
      },
      keyboard: {
        // 键盘事件可用于绑定快捷键
        enabled: true,
      },
      history: {
        enabled: true,
        ignoreChange: true,
      }, // 开启撤销/重做
      // 剪切板用于复制/粘贴节点和边，并支持跨画布的复制/粘贴，创建画布时通过以下配置启用。
      clipboard: {
        enabled: true,
        // useLocalStorage: true // 保存到 localStorage
      },
      // panning: true, // 普通画布(未开启 scroller 模式)通过开启 panning 选项来支持拖拽平移。
      // 使画布具备滚动、平移、居中、缩放等能力
      scroller: {
        enabled: true,
        pageVisible: false, // 是否分页，默认为 false。
        pageBreak: false, // 是否显示分页符，默认为 false。
        pannable: true, // 启用画布平移
      },
      mousewheel: {
        // 鼠标滚轮缩放
        enabled: true,
        // 是否为全局事件，设置为 true 时滚轮事件绑定在 document 上，否则绑定在画布容器上。默认为 false。
        global: true,
        modifiers: ['ctrl', 'meta'],
      },
      grid: {
        size: 10, // 网格大小 10px
        visible: true, // 绘制网格，默认绘制 dot 类型网格
      },
      // 当链接桩被渲染成功后
      // onPortRendered(args) {
      //   // console.log('args', args)
      //   // const { port } = args
      //   // const { contentSelectors } = args
      //   // const container = contentSelectors && contentSelectors.content
      //   // if (container) {
      //   //   ReactDOM.render(
      //   //     <Tooltip title="port">
      //   //       <div className={`my-port${port.connected ? ' connected' : ''}`} />
      //   //     </Tooltip>,
      //   //     container,
      //   //   )
      //   // }
      // },
      highlighting: {
        // 连线过程中，节点可以被链接时被使用
        // nodeAvailable: magnetAvailabilityHighlighter,
        // 连线过程中，链接桩可以被链接时被使用
        magnetAvailable: magnetAvailabilityHighlighter,
        // 连线过程中，自动吸附到链接桩时被使用
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#31d0c6',
            },
          },
        },
      },
      // 连线规则
      connecting: {
        snap: true, // 当 snap 设置为 true 时连线的过程中距离节点或者连接桩 50px 时会触发自动吸附
        allowBlank: false, // 是否允许连接到画布空白位置的点，默认为 true
        allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点，默认为 true
        allowMulti: false, // 当设置为 false 时，在起始和终止节点之间只允许创建一条边
        highlight: true, // 拖动边时，是否高亮显示所有可用的连接桩或节点，默认值为 false。
        sourceAnchor: {
          // 当连接到节点时，通过 sourceAnchor 来指定源节点的锚点。
          name: 'center',
        },
        targetAnchor: 'center', // 当连接到节点时，通过 targetAnchor 来指定目标节点的锚点。
        connector: 'rounded', // 连接器将起点、路由返回的点、终点加工为 元素的 d 属性，决定了边渲染到画布后的样式，默认值为 normal。
        connectionPoint: 'boundary', // 指定连接点，默认值为 boundary。
        router: {
          // 实体关系路由，由 Z 字形的斜角线段组成。
          name: 'er',
          args: {
            direction: 'T',
          },
        },
        // 点击 magnet 时 根据 validateMagnet 返回值来判断是否新增边，
        // 触发时机是 magnet 被按下，如果返回 false，则没有任何反应，
        // 如果返回 true，会在当前 magnet 创建一条新的边。
        validateMagnet({ e, magnet, view, cell }) {
          // 表示被点击的链接桩
          // console.log('magnet', e, magnet, view, cell);
          if (magnet.getAttribute('port-group') === 'in') {
            //前置节点不能作为起点
            return false
          }
          // 后置最多可连接线 多少个
          const outEdges = this.getOutgoingEdges(cell) || [] // 所有输出的边
          // console.log('outEdges',outEdges);
          console.log(cell)

          // 获取该节点规则
          const rule = VALIDATORRULE[cell.data.comType]
          if (outEdges.length >= rule.maxOutNum) {
            // 边已经达到最多链接数量
            msg.error(`最多可连${rule.maxOutNum}个节点`)
            return false
            // return false // 停止遍历
          }
          return true
        },
        createEdge(metadata) {
          // 连接的过程中创建新的边
          // console.log('metadata', metadata);
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#a0a0a0',
                strokeWidth: 1,
                targetMarker: {
                  name: 'classic',
                  size: 7,
                },
              },
            },
          })
        },
        // 在移动边的时候判断连接是否有效，
        // 如果返回 false，当鼠标放开的时候，不会连接到当前元素，
        // 否则会连接到当前元素。
        // 可以连接的节点，链接桩会变色
        validateConnection({
          edge,
          edgeView,
          sourceView,
          targetView,
          sourcePort,
          targetPort,
          sourceMagnet,
          targetMagnet,
          sourceCell,
          targetCell,
          type,
        }) {
          // console.log(1111, edge, edgeView, sourceView, targetView, sourcePort, targetPort, sourceMagnet, targetMagnet, sourceCell, targetCell, type );
          // console.log(1111, sourceMagnet, targetMagnet, sourceCell, targetCell,);
          // 只能从输出链接桩创建连接
          if (
            !sourceMagnet ||
            sourceMagnet.getAttribute('port-group') === 'in'
          ) {
            return false
          }
          // 只能连接到输入链接桩
          if (
            !targetMagnet ||
            targetMagnet.getAttribute('port-group') !== 'in'
          ) {
            return false
          }
          const sourceRule = VALIDATORRULE[sourceCell.data.comType] // 源节点底部链接桩校验规则
          const targetRule = VALIDATORRULE[targetCell.data.comType] // 目标节点顶部链接桩校验规则
          // 目标节点不满足源节点底部部链接桩规则 或者 源节点不满足目标节点顶部链接桩校验规则
          if (
            sourceRule.outPortDenied.some((item) =>
              targetCell.data.comType.includes(item)
            ) ||
            targetRule.inPortDenied.some((item) =>
              sourceCell.data.comType.includes(item)
            )
          ) {
            return false
          }
          return true
        },
        // 当停止拖动边的时候根据 validateEdge 返回值来判断边是否生效，如果返回 false, 该边会被清除。
        validateEdge({ edge }) {
          // console.log('validateEdge', edge);
          const { source, target } = edge
          // @ts-ignore
          const sourceComType = this.getCellById(source.cell).data.comType
          // @ts-ignore
          const targetComType = this.getCellById(target.cell).data.comType
          const sourceRule = VALIDATORRULE[sourceComType] // 源节点底部链接桩校验规则
          const targetRule = VALIDATORRULE[targetComType] // 目标节点顶部链接桩校验规则
          if (sourceRule && targetRule) {
            // 同时存在
            // @ts-ignore
            if (
              sourceRule.outPortDenied.some((item) =>
                targetComType.includes(item)
              ) ||
              targetRule.inPortDenied.some((item) =>
                targetComType.includes(item)
              )
            ) {
              // 不符合后置链接桩规则 或者不符合前置链接桩规则
              msg.error(
                `${sourceRule.comNm}节点不能连接${targetRule.comNm}节点`
              )
              return false
            }
          } else {
            msg.error(`节点存在错误`)
            return false
          }

          let flag = true
          // 一个链接桩仅仅可以被链接一次
          this.getEdges().forEach((item) => {
            // 排除新创建边 目标链接桩相同 排除结束节点
            // @ts-ignore
            const edgeTargetComType = this.getCellById(edge.target.cell).data
              .comType
            // @ts-ignore
            if (
              item.id !== edge.id &&
              item.target.port === edge.target.port &&
              !edgeTargetComType.includes('EndNode')
            ) {
              msg.error(`${targetRule.comNm}节点不可以重复连接`)
              flag = false
            }
          })
          // console.log('edges',this.getEdges(),flag);
          return flag
        },
      },
    })

    return this.graph
  }
}
