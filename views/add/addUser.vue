<template>
  <div class="manage">
    <el-dialog
            :title="operateType === 'add' ? '新增用户' : '更新用户'"
            :visible.sync="isShow"
    >
      <common-form
          :form-label="operateFormLabel"
          :form="operateForm"
          :inline="true"
          ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false" type="danger">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form
              :form-label="formLabel"
              :form="searchForm"
              :inline="true"
              ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)">搜素</el-button>
      </common-form>
    </div>
    <common-table
        :table-data="tableData"
        :table-label="tableLabel"
        :config="config"
        @changePage="getList()"
        @edit="editUser"
        @del="delUser"
    ></common-table>
  </div>
</template>

<script>
  import CommonForm from "../../src/components/CommonForm";
  import CommonTable from "../../src/components/CommonTable";
  import { getUser } from '../../api/data'
    export default {
        name: "adduser",
        data() {
            return{
                operateType: 'add',
                isShow: false,
                operateFormLabel: [
                    {
                        model: 'username',
                        label: '用户名',
                        type: 'input'
                    },
                    {
                        model: 'password',
                        label: '密码',
                        type: 'input'
                    },
                ],
                operateForm: {
                    username: '',
                    password: ''
                },
                formLabel: [
                    {
                        model: "keyword",
                        label: '',
                        type: 'input'
                    }
                ],
                searchForm: {
                    keyword: ''
                },
                tableData: [],
                tableLabel: [
                    {
                        prop: "username",
                        label: "用户名"
                    },
                    {
                        prop: "password",
                        label: "密码"
                    }
                ],
                config: {
                    page: 1,
                    total: 30
                }
            }
        },
        methods: {
            confirm() {
                if (this.operateType === 'edit') { //判断弹窗是不是编辑状态
                    this.http.post('/user/editUser', this.operForm).then(res => {
                        console.log(res);
                        this.isShow = false
                        this.getList()
                    })
                } else { //弹窗为新增状态
                    this.http.post('/user/addUser', this.operForm).then(res => {
                        this.isShow = false
                        this.getList()
                        console.log(res);
                    })
                }
            },
            addUser() {
              this.isShow = true
                this.operateType = 'add'
                this.operForm = {
                  username: '',
                  password: ''
                }
            },
            editUser(row) {
              this.operateType = 'edit'
              this.isShow = true
              this.operateForm = row
            },
            delUser(row) {
                this.$confirm("此操作将永久删除改用户，是否继续","提示",{
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    const id = row.id
                    this.http.post("/user/del",{
                      params:{id}
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.getList()
                    })
                })
            },
            getList(name = '') {
              this.config.loading = true
              name ? (this.config.page = 1) : ''
              getUser({
                  page: this.config.page,
                  name
              }).then(({ data: res }) => {
                  this.config.total = res.count
                  this.config.loging = false
              })


            }
        },
        created() {
            this.getList()
        },
        components: {
            CommonForm,
            CommonTable
        }
    }
</script>

<style lang="less" scoped>
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
