<template>
  <div class="docs-ui">
    <aside>
      <div class="list-box">
        <div
          class="item-list"
          v-for="(item, index) in menuList"
          :key="index"
        >
          <p>
            <span>{{ item?.['title'] }}</span>
          </p>
          <div
            v-for="(v, i) in item?.list"
            :key="i"
            :class="{ active: $route.path === v?.['path'] }"
            @click="$router.push(v?.['path'])"
          >
            {{ v['title'] }}
          </div>
        </div>
      </div>
    </aside>
    <main class="right-view">
      <router-view v-highlight />
    </main>
    <el-backtop target=".right-view" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { docsRotes, defaultRotes } from '../router';

type Menu = {
  title: string,
  path?: string,
  list?: (Menu & {
    path: string
  })[]
}
type SwitchMenuItem = {
  parentTitle: string,
  title: string,
  path: string,
}
const componentMenuList: (Menu & {
  path: string
})[] = []
const defaultMenuList: (Menu & {
  path: string
})[] = []

docsRotes.forEach(item => {
  componentMenuList.push({
    path: `/docs/${item.path}`,
    title: (item.meta?.title || item.name) as string
  })
})
defaultRotes.forEach(item => {
  defaultMenuList.push({
    path: `/docs/${item.path}`,
    title: (item.meta?.title || item.name) as string
  })
})

const menuList: Menu[] = [
  {
    title: '基本信息',
    list: defaultMenuList
  },
  {
    title: '通用组件',
    list: componentMenuList
  }
];
const router = useRouter();
const route = useRoute();
const menuIndex = ref(route.path);

watchEffect(() => {
  console.log(route.path)
  menuIndex.value = route.path
})

</script>

<style lang="scss" scoped>
.docs-ui {
  display: flex;
  height: calc(100vh - 4vh);
  margin-top: 2vh;
  overflow: hidden;

  aside {
    width: 317px;
    height: 100%;
    border-right: 1px solid rgba(0, 0, 0, 0.06);
    overflow-y: auto;

    .list-box {
      width: 100%;
      height: auto;
      overflow: hidden;
      padding-bottom: 30px;
      box-sizing: border-box;

      .item-list {
        width: 100%;
        height: auto;
        overflow: hidden;

        p {
          padding-left: 34px;
          box-sizing: border-box;
          height: 30px;

          span {
            width: 100%;
            height: 100%;
            display: inline-block;
            font-size: 14px;
            color: #00000073;
            border-bottom: 1px solid #f0f0f0;
          }
        }

        > div {
          list-style: none;
          padding-left: 34px;
          box-sizing: border-box;
          cursor: pointer;
          font-size: 14px;
          color: #000000d9;
          line-height: 40px;
          transition: all 0.2s ease;
          margin-left: 16px;

          &:hover {
            color: #0e80eb;
          }

          &.active {
            color: #0e80eb;
            background: rgba(14, 128, 235, 0.1);
            border-left: 3px solid #0e80eb;
            padding-left: 31px;
            transition: all 0.2s ease;
          }
        }


      }
    }
  }

  main {
    flex: 1;
    padding: 0 calc(2vw + 100px) 2vw 2vw;
    overflow-x: hidden;
    overflow-y: auto;
    word-wrap: break-word;
  }
}

aside::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

aside::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: #b8b8bb;
}

aside::-webkit-scrollbar-track {
  border-radius: 0px;
  background: #fff;
}

main::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

main::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: #b8b8bb;
}

main::-webkit-scrollbar-track {
  border-radius: 0px;
  background: #fff;
}

:deep(.right-view) {
  .output_wrapper /*此属性为全局*/
  {
    font-size: 16px;
    color: #3e3e3e;
    line-height: 1.6;
    word-spacing: 0px;
    letter-spacing: 1px;
    font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
  }

  .output_wrapper * {
    font-size: inherit;
    color: inherit;
    line-height: inherit;
    margin: 0px;
    padding: 0px;
  }

  p { /*段落*/
    margin: 1.5em 0px;
    padding-left: 1em;
    padding-right: 1em;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 1.5em 0px;
    font-weight: bold;
    color: #159957; /*改变了其默认的标题颜色*/
  }

  h1 {
    font-size: 1.6em;

  }

  h2 {
    font-size: 1.4em;
  }

  h3 {
    font-size: 1.3em;
  }

  h4 {
    font-size: 1.2em;
  }

  h5 {
    font-size: 1em;
  }

  h6 {
    font-size: 1em;
  }

  ul, ol {
    padding-left: 32px;
  }

  ul { /*无序列表*/
    list-style-type: disc;
  }

  ol { /*有序列表*/
    list-style-type: decimal;
  }

  li * {
    /* color: #3e3e3e;*/
  }

  li { /*在公众号下，改变不了li符号的属性（如颜色），并会影响其子元素的属性;而在其它博客平台中，则能正常使用*/
    margin-bottom: 0.5em;
    list-style: disc;
    /*  color:#159957; */
  }

  .code_size_default /*代码块默认size*/
  {
    line-height: 18px;
    font-size: 14px;
    font-weight: normal;
    word-spacing: 0px;
    letter-spacing: 0px;
  }

  .code_size_tight /*代码块紧凑size*/
  {
    line-height: 15px;
    font-size: 14px;
    font-weight: normal;
    word-spacing: -3px;
    letter-spacing: 0px;
  }

  pre code /*代码块*/
  {
    font-family: Consolas, Inconsolata, Courier, monospace;
    border-radius: 0px;
  }

  blockquote { /*引用块*/
    display: block;
    padding: 15px 1rem;
    font-size: 0.9em;
    padding-right: 15px;
    margin: 1em 0;
    color: #819198;
    border-left: 6px solid #dce6f0;
    background: #f2f7fb;
    overflow: auto;
    overflow-scrolling: touch;
    word-wrap: normal;
    word-break: normal;
  }

  blockquote p {
    margin: 0px;
  }

  a { /*超链接*/
    text-decoration: none;
    color: #1e6bb8;
    word-wrap: break-word;
  }

  strong /*强调*/
  {
    font-weight: bold;
  }

  em /*斜体*/
  {
    font-style: italic;
  }

  del /*删除线*/
  {
    font-style: italic;
  }

  strong em /*强调的斜体*/
  {
    font-weight: bold;
  }

  hr { /*分隔线*/
    height: 1px;
    margin: 1.5rem 0px;
    border: none;
    border-top: 1px dashed #A5A5A5;
  }

  code /*行内代码*/
  {
    word-break: break-all;
    word-wrap: break-word;
    border-radius: 4px;
    margin: 0 2px;
    background: #f8f8f8;
    font-size: 14px;
    font-weight: normal;
  }

  img {
    display: block;
    margin: 0 auto; /*图片水平居中*/
    /* margin:0 0;  */
    /*图片水平居左，如需要请打开*/
    max-width: 100%;
  }

  figcaption /*图片描述文字*/
  {
    margin-top: 10px;
    text-align: center;
    /* text-align:left;  */
    /*当图片水平居左时，请打开*/
    color: #999;
    font-size: 0.7em;
  }

  /*================表格开始================*/
  table {
    display: table;
    width: 100%;
    text-align: left;
  }

  tbody {
    border: 0;
  }

  table tr {
    border: 0;
    border-top: 1px solid #CCC;
    background-color: white;

  }

  /*隔行改变行的背景色，如需要请打开*/
  /*
  table tr:nth-child(2n) {
    background-color: #F8F8F8;
  }
  */

  table tr th, table tr td {
    font-size: 1em;
    border: 1px solid #CCC;
    padding: 0.5em 1em;
    text-align: left;
  }

  /*表头的属性*/
  table tr th {
    font-weight: bold;
    background-color: #F0F0F0;
  }

  /*================表格结束================*/

  /*================数学公式开始================*/
  .katex-display { /*块公式*/
    font-size: 1.22em;
  }

  .katex { /*行内公式*/
    padding: 8px 3px;
  }

  .katex-display > .katex { /*块公式*/
    display: inline-block;
    text-align: center;
    padding: 3px;
  }

  .katex img { /*行内公式对应的图片*/
    display: inline-block;
    vertical-align: middle;
  }

  /*================数学公式结束================*/

  a[href^="#"] sup { /*注脚*/
    vertical-align: super;
    margin: 0 2px;
    padding: 1px 3px;
    color: #ffffff;
    background: #666666;
    font-size: 0.7em;
  }

  /*================任务列表开始================*/
  .task-list-list {
    list-style-type: none;
  }

  .task-list-list.checked { /*已完成*/
    color: #3e3e3e;
  }

  .task-list-list.uncheck { /*未完成*/
    color: #bfc1bf;
  }

  .task-list-list .icon_uncheck, .task-list-list .icon_check {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }

  .task-list-list .icon_check:before { /*已完成*/
    content: "√";
    border: 2px solid #3e3e3e;
    color: red;
  }

  .task-list-list .icon_uncheck:before { /*未完成*/
    content: "x";
    border: 2px solid #bfc1bf;
    color: #bfc1bf;
  }

  .task-list-list .icon_check:before, .task-list-list .icon_uncheck:before { /*标志框*/
    padding: 2px;
    padding-left: 5px;
    padding-right: 8px;
    border-radius: 5px;
  }

  /*================任务列表结束================*/


  .toc { /*总目录*/
    margin-left: 25px;
  }

  .toc_item { /*每条目录*/
    display: block;

  }

  .toc_left { /*每级目录的缩进*/
    margin-left: 25px;
  }
}
</style>
