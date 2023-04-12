<template>
    <header>
        <div class="l-content">
            <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
        <span>
          <img class="user" :src="userImg" alt="">
        </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>用户中心</el-dropdown-item>
                    <el-dropdown-item split-button="true" @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "CommonHeader",
        data() {
            return {
                userImg: require('../assets/img/touxiang.png')
            }
        },
        methods: {
            handleMenu() {
                this.$store.commit('collapseMenu')
            },
            logout(){
                this.$confirm('确定要退出登录吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 点击确定后  清除session用户信息
                    sessionStorage.clear()
                    // 跳转到登录页面
                    this.$router.push('/login')
                }).catch(() => {
                    //   this.$message({
                    //     type: 'info',
                    //     message: '已取消退出'
                    //   });
                });
            }
        },
        computed: {
            ...mapState({
                tags: state => state.tab.tabsList
            })
        }
    }
</script>

<style lang="less" scoped>
    header {
        display: flex;
        height: 100%;
        justify-content: space-between;
        align-items: center;
    }
    .l-content{
        display: flex;
        align-items: center;
        .el-button {
            margin-right: 20px;
        }
    }
    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
</style>
