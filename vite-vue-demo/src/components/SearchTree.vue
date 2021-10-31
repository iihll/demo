<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, watch } from 'vue'
import { debounce } from 'lodash'

const genData = [
  {
    title: 'test',
    key: '0-0',
    children: [
      {
        title: '赛道',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'test1',
    key: '0-1',
    children: [
      {
        title: '等扽',
        key: '0-1-0',
      },
    ],
  },
]

const dataList = []

const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    // const key = node.key
    dataList.push(node)

    if (node.children) {
      generateList(node.children)
    }
  }
}

generateList(genData)

const getParentKey = (key, tree) => {
  let parentKey

  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]

    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }

  return parentKey
}

const loading = ref(false)
const expandedKeys = ref([])
const searchValue = ref('')
const autoExpandParent = ref(true)
const gData = ref(genData)

const onExpand = (keys) => {
  expandedKeys.value = keys
  autoExpandParent.value = false
}

const onSearch = (value) => {
  if (value) {
    loading.value = true
    const expanded = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          // return getParentKey(item.key, gData.value)
          return item.key
        }

        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)
    expandedKeys.value = expanded
    searchValue.value = value
    autoExpandParent.value = true
    loading.value = false
  } else {
    expandedKeys.value = []
    searchValue.value = value
    autoExpandParent.value = false
  }
}

const onAdd = (node) => {
  const key = node.key

  const addNode = (key, tree) => {
    tree.forEach((node) => {
      if (node.key === key && node.children) {
        expandedKeys.value.push(node.key)
        node.children.push({
          title: '',
          edit: true,
          key: node.key + '-' + node.children.length,
        })
      }
      if (node.key === key && !node.children) {
        expandedKeys.value.push(node.key)
        node.children = []
        node.children.push({
          title: '',
          edit: true,
          key: node.key + '-' + node.children.length,
        })
      }
      if (node.children && node.children.length) {
        addNode(key, node.children)
      }
    })
  }

  addNode(key, gData.value)
}

const editValue = ref('')

const onInput = debounce((e) => {
  const value = e.target.value
  editValue.value = value
}, 200)

const onSave = (node) => {
  const key = node.key

  const saveNode = (key, tree) => {
    tree.forEach((node) => {
      if (node.key === key) {
        node.title = editValue.value
        node.edit = false
      }
      if (node.children && node.children.length) {
        saveNode(key, node.children)
      }
    })
  }

  saveNode(key, gData.value)

  editValue.value = ''
}

const onEdit = (node) => {
  const key = node.key

  const saveNode = (key, tree) => {
    tree.forEach((node) => {
      if (node.key === key) {
        node.edit = true
        editValue.value = node.title
      }
      if (node.children && node.children.length) {
        saveNode(key, node.children)
      }
    })
  }

  saveNode(key, gData.value)
}

// watch(searchValue, (value) => {
//   const expanded = dataList
//     .map((item) => {
//       if (item.title.indexOf(value) > -1) {
//         // return getParentKey(item.key, gData.value)
//         return item.key
//       }

//       return null
//     })
//     .filter((item, i, self) => item && self.indexOf(item) === i)
//   expandedKeys.value = expanded
//   searchValue.value = value
//   autoExpandParent.value = true
// })
</script>

<template>
  <div class="tree-container">
    <a-input-search
      v-model:value="searchValue"
      style="margin-bottom: 8px"
      placeholder="Search"
      @search="onSearch"
      :loading="loading"
    />
    <a-tree
      :expandedKeys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="gData"
      block-node
      @expand="onExpand"
    >
      <template #title="node">
        <div class="tree-node">
          <a-input
            v-if="node.edit"
            @change="onInput"
            v-model:value="editValue"
          ></a-input>
          <span v-else-if="node.title.indexOf(searchValue) > -1">
            {{ node.title.substr(0, node.title.indexOf(searchValue)) }}
            <span style="color: #f50">{{ searchValue }}</span>
            {{
              node.title.substr(
                node.title.indexOf(searchValue) + searchValue.length
              )
            }}
          </span>
          <span v-else>{{ node.title }}</span>
          <div>
            <a-space>
              <a-button
                v-if="node.edit"
                @click="onSave(node)"
                type="primary"
                size="small"
                >save</a-button
              >
              <a-button v-else @click="onAdd(node)" type="primary" size="small"
                >add</a-button
              >
              <a-button @click="onEdit(node)" type="primary" size="small"
                >edit</a-button
              >
              <a-button type="primary" size="small">delete</a-button>
            </a-space>
          </div>
        </div>
      </template>
    </a-tree>
  </div>
</template>

<style>
.tree-container {
  width: 444px;
}

.tree-container .tree-node {
  display: flex;
  justify-content: space-between;
}
</style>
