# 弹窗布局

## 组件说明

[点击跳转题目页面](/#/dialogStyle)

这是一个简单的搜索弹窗业务组件，顶部区域为搜索的form表单项（只需要样式，不需要表单）
当有多个表单同时存在时，需要收起部分表单项，以达到大部分内容的完整。
当需要搜索时，可以点击展开，以便能够看到所有的筛选项。

## 修改组件：`src/views/dialogStyle/components/MyDialog.vue` 中的内容，达到以下要求：

##### 1. 在不影响标题，顶部组件与底部组件高度的情况下，中间内容组件撑满容器其余高度
   ![](./images/contentHeight.png)

##### 2. 顶部内容需要水平排列，并保持垂直居中对齐
   ![](./images/top-range.png)

##### 3. `filter-item`单个默认宽度为剩余宽度（除查询按钮与展开按钮外）的三分之一
   ```js
   const filterList = [
     {
       text: 'filter-1',
     },
     {
       text: 'filter-2',
     },
     {
       text: 'filter-3',
     },
   ]
   ```
   ![](./images/top-3-1.png)
   ```javascript
   const filterList = [
     {
       text: 'filter-1',
     },
     {
       text: 'filter-2',
     },
   ]
   ```
   ![](./images/top-3-2.png)
###### 传递宽度时，使用指定的宽度
   ```js
   const filterList = [
     {
       text: 'filter-1',
       width: 200
     },
     {
       text: 'filter-2',
     },
   ]
   ```
   ![](./images/top-3-3.png)

##### 4. 不超过一行时展开收起的按钮默认隐藏

![](./images/top-3-2.png)

##### 5. 当`filter-item`超出一行空间，则换行展示，并且显示展开收起的按钮
![](./images/top-filter-item-more.png)

##### 6. `filter-item`默认隐藏换行内容，并且展开收起按钮默认为收起状态，提示文字为：`展开`
   ![](./images/top-more-close.png)

##### 7. 点击展开之后，展示所有`filter-item`，并且按钮文字切换为：`收起`
   ![](./images/top-more-open.png)
