<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffdf04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <div>
      <div style="display: inline-flex;padding-left: 10px;padding-right: 10px;padding-top: 20px">
        <img src="../assets/img/fplogo.png" height="30px" width="30px">
      </div>
      <div style="display: inline-flex">
        <h3 style="font-size: 17px">{{isCollapse ? '后台' : '发票识别管理系统'}}</h3>
      </div>
    </div>

    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>

  </el-menu>

</template>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    height: 100%;
    border: none;
    h3 {
      color: #fff;
      text-align: center;
      line-height: 48px;
    }
  }
</style>

<script>
    export default {
        data() {
            return {
                menu: [
                    {
                        path: '/',
                        name: 'home',
                        label: '首页',
                        icon: 'menu'
                    },
                    {
                        path: '/addinvoice',
                        name: 'addinvoice',
                        label: '新增发票',
                        icon: 'edit-outline'
                    },
                    {
                        path: '/adduser',
                        name: 'adduser',
                        label: '新增用户',
                        icon: 'user'
                    },

                ]
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            clickMenu(item) {
                this.$router.push({
                    name: item.name
                })
                this.$store.commit('selectMenu',item)
            }
        },
        computed: {
            noChildren() {
                return this.menu.filter(item => !item.children)
            },
            hasChildren() {
                return this.menu.filter(item => item.children)
            },
            isCollapse() {
                return this.$store.state.tab.isCollapse
            }
        }
    }
</script>
