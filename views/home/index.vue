<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover" style="margin-top: 20px">
        <div class="user">
          <img class="userImg" :src="userImg"/>
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间 <span>2022-5-17</span></p>
          <p>上次登录地点 <span>广州</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 360px">
        <h3 style="font-size: x-large">今天也是努力搬砖的一天！</h3>
        <h3 style="padding-top: 5px">加油！打工人</h3>
        <img src="../../src/assets/img/jzlogo.jpg" style="width: 399px;padding-right: 100px;margin-top: 20px">
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-top: 20px">
      <el-card>
        <el-row type="flex" class="row-bg" justify="end" style="padding: 20px">
          <el-col :span="14">
            <h3 style="font-size: 30px;margin-top: 10px">搜索</h3>
          </el-col>
          <el-col :span="4">
            <el-select v-model="value" @change="moneyOption(value)" placeholder="金额">
              <el-option
                      v-for="item in money"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="value1" placeholder="日期">
              <el-option
                      v-for="item in date"
                      :key="item.value1"
                      :label="item.label"
                      :value="item.value1"
                      @click="dateOption()">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="getmails()">搜索</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-top: 20px;">
      <el-card>
          <el-table
                :data="tableData"
                style="width: 100%"
                max-height="600">
          <el-table-column
                  prop="invoiceCode"
                  label="发票代码"
                  width="150">
          </el-table-column>
          <el-table-column
                  prop="createDate"
                  label="开票日期"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="serviceName"
                  label="服务名称"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="price"
                  label="金额"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="salesName"
                  label="销售方名称"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="salesAddress"
                  label="销售方地址"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="salesPhone"
                  label="销售方电话"
                  width="200">
          </el-table-column>
          <el-table-column
                  prop="purchaserName"
                  label="购买方名称"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="purchaserCode"
                  label="纳税人识别号"
                  width="120">
          </el-table-column>
          <el-table-column
                  fixed="right"
                  label="操作"
                  width="70">
            <template slot-scope="scope">
              <el-button
                      @click="edit(scope.$index, scope.row)"
                      type="primary"
                      size="small">
                操作
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <div class="pagination">
        <el-pagination
                layout="total, sizes,prev,pager,next,jumper"
                current-page.sync="1"
        />
      </div>

    </el-col>
    <el-dialog title="编辑发票" :visible.sync="isShow">
      <el-form ref="editForm" :model="editForm">
        <el-form-item label="发票代码" :label-width="formLabelWidth">
          <el-input  v-model="editForm.invoiceCode" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="开票日期" :label-width="formLabelWidth">
          <el-date-picker
                  v-model="editForm.createDate"
                  type="datetime"
                  placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="服务名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.serviceName" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="editForm.price" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="销售方名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.salesName" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="销售方地址" :label-width="formLabelWidth">
          <el-input v-model="editForm.salesAddress" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="销售方电话" :label-width="formLabelWidth">
          <el-input v-model="editForm.salesPhone" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="购买方名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.purchaserName" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="纳税人识别号" :label-width="formLabelWidth">
          <el-input v-model="editForm.purchaserCode" autocomplete="off">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" style="float: left" @click="handleDelete(editForm.invoiceCode)">删除</el-button>
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="diaSubmit(editForm),isShow = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>

    export default {
        name: "index",
        data() {
            return {
                userId:1,
                editForm: {
                    invoiceCode: ''
                },
                userImg: require('../../src/assets/img/touxiang.png'),
                tableData: [{
                    invoiceCode: ''
                }],
                money: [{
                    value: 'ASC',
                    label: '价格升序'
                }, {
                    value: 'DESC',
                    label: '价格降序'
                }],
                date: [{
                    value1: '选项1',
                    label: '一天前'
                }, {
                    value1: '选项2',
                    label: '一周前'
                }, {
                    value1: '选项3',
                    label: '一月前'
                }, {
                    value1: '选项4',
                    label: '一年前'
                }],
                value: '',
                value1: '',
                isShow: false,
                formLabelWidth: '120px',
                number:0,// 当前页码
                pageSize:10,// 每页大小
                total:0,
            }
        },
        created() {
            this.page()
        },
        mounted() {

        },
        components: {

        },
        methods: {
            //搜索发票
            getmails() {

            },
            //编辑发票
            edit(index, row) {
                this.isShow = true;
                this.editForm = Object.assign({}, row)
                console.log(index, row);
            },
            //编辑发票详情

            diaSubmit(formName) {
                console.log(formName);
                this.isShow = false
                const _this = this
                _this.http.post("http://120.24.205.130:8081/invoice/update", {
                    "invoiceId": formName.invoiceId,
                    "createDate": formName.createDate,
                    "salesName": formName.salesName,
                    "salesAddress": formName.salesAddress,
                    "salesPhone": formName.salesPhone,
                    "purchaserName": formName.purchaserName,
                    "purchaserCode": formName.purchaserCode,
                    "invoiceCode": formName.invoiceCode,
                    "price": formName.price,
                    "serviceName": formName.serviceName
                }).then(res => {
                    console.log(res);
                    this.page()
                })
            },

            //删除发票
            handleDelete(invoiceCode) {
                const _this = this
                _this.http.get("http://120.24.205.130:8081/invoice/delete?invoiceCode="+invoiceCode).then(res => {
                    this.page()
                })
            },
            //价格排序按钮
            moneyOption(value) {
                const _this = this
                _this.http.post("http://120.24.205.130:8081/invoice/search",{
                    "userId": 1,
                    "serviceName": _this.editForm.editForm,
                    "priceSort": value,
                    "page": _this.number,
                    "size": 10
                }).then(res => {
                    console.log(res);
                    this.tableData =  res.data.data
                })
            },


            //加载发票数据
            page() {
                const _this = this
                _this.http.post("http://120.24.205.130:8081/invoice/list",{
                    "userId": 1,
                    "page": 0,
                    "size": 10
                }).then(res => {
                    this.tableData = res.data.data
                })
            },

        },
    }
</script>

<style scoped>

  .pagination {
    padding-top: 10px;
    float: right;
  }

</style>
