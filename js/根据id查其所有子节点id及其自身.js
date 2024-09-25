// 输入数组
const data = [
  {
    id: "1726730967217512",
    pid: "0",
    hasChild: true,
    children: [
      {
        id: "1726730991246695",
        pid: "1726730967217512",
        hasChild: true,
        children: [
          {
            id: "1726731006242826",
            pid: "1726730991246695",
            hasChild: true,
            children: [
              {
                id: "1726731038844940",
                pid: "1726731006242826",
                hasChild: false,
                children: null,
                level: 3,
                name: "子规则3",
                type: "main-branch",
                width: 100,
                height: 32,
                sort: 4
              }
            ],
            level: 2,
            name: "子规则2",
            type: "main-branch",
            width: 100,
            height: 32,
            sort: 3
          },
          {
            id: "1726733024968914",
            pid: "1726730991246695",
            hasChild: false,
            children: null,
            level: 2,
            name: "子规则test",
            type: "main-branch",
            width: 100,
            height: 32,
            sort: 5
          }
        ],
        level: 1,
        name: "子规则1",
        type: "main-branch",
        width: 100,
        height: 32,
        sort: 2
      }
    ],
    level: 0,
    name: "主规则test-scf",
    type: "main",
    width: 100,
    height: 32,
    sort: 0
  }
];

// 递归函数，根据二级节点id获取自身及其所有子节点的id
function getNodeIdsById(node, targetId) {
  const ids = [];
  
  function findNode(currentNode) {
    if (currentNode.id === targetId) {
      // 找到目标节点，添加自身id
      ids.push(currentNode.id);

      // 递归添加子节点的id
      if (currentNode.children) {
        currentNode.children.forEach(child => collectChildIds(child));
      }
    } else if (currentNode.children) {
      // 继续在子节点中查找
      currentNode.children.forEach(child => findNode(child));
    }
  }

  // 递归函数，收集子节点的id
  function collectChildIds(node) {
    ids.push(node.id);
    if (node.children) {
      node.children.forEach(child => collectChildIds(child));
    }
  }

  findNode(node);
  return ids;
}

// 假设要查找的二级节点id是 '1726730991246695'
const targetId = '1726730991246695';
const result = getNodeIdsById(data[0], targetId);

console.log(result);  // 输出 ['1726730991246695', '1726731006242826', '1726731038844940', '1726733024968914']

