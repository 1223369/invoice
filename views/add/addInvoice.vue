<template>
  <div>
    <el-dialog title="新增发票" :visible.sync="isShow">
      <el-form ref="editForm" :model="editForm" :rules="rules">
        <el-form-item
                prop="invoiceCode"
                label="发票代码"
                :label-width="formLabelWidth">
          <el-input v-model="editForm.invoiceCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开票日期" :label-width="formLabelWidth">
          <el-date-picker
                  v-model="editForm.createDate"
                  type="date"
                  placeholder="选择日期时间"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="销售方名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.salesName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
                prop="serviceName"
                label="服务名称"
                :label-width="formLabelWidth">
          <el-input v-model="editForm.serviceName" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item prop="price" label="金额" :label-width="formLabelWidth">
          <el-input v-model="editForm.price" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="editForm.salesAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="editForm.salesPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="购买方" :label-width="formLabelWidth">
          <el-input v-model="editForm.purchaserName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
                prop="purchaserCode"
                label="纳税人识别号"
                :label-width="formLabelWidth"
                :rules="[
                    { required: true, message: '请输入纳税人识别号', trigger: 'blur' },
                  ]">
          <el-input v-model="editForm.purchaserCode" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" style="float: left" @click="handleDelete(editForm.invoiceCode)">删除</el-button>
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="diaSubmit(editForm)">确 定</el-button>
      </div>
    </el-dialog>
    <div class="main">
      <div class="div-addCard">
        <el-card class="addCard" style="width: 250px">
          <div class="add">
            <el-upload class="avatar-uploader"
                       action="http://120.24.205.130:8081/invoice/newurl"
                       :on-success="handlePreview"
                       :file-list="fileList"
                       name="image"
                       list-type="picture">
              <el-button type="primary" class="auto">自动添加</el-button>
            </el-upload>
            <el-button type="primary" @click="handAdd" class="hant">手动添加</el-button>
          </div>
        </el-card>
      </div>
      <h3 style="font-size: 20px;padding-left: 150px">今日新增</h3>
      <div class="div-newAdd">
        <el-card class="newAdd">
          <el-table
                  :data="tableData"
                  v-if="this.msg!=null"
                  style="width: 100%">
            <el-table-column
                    prop="invoiceCode"
                    label="发票代码"
                    width="138">
            </el-table-column>
            <el-table-column
                    prop="createDate"
                    label="开票日期"
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
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="salesAddress"
                    label="销售方地址"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="salesPhone"
                    label="销售方电话"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="purchaserName"
                    label="购买方"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="purchaserCode"
                    label="纳税人识别号"
                    width="180">
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button
                        type="primary"
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑
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

      </div>

    </div>

  </div>
</template>

<script>

    export default {
        name: "addinvoice",
        data() {
            return {
                authorization: 'AppCode 38056bd1f95c4b5986ebc468f8264b42',
                formData: [],
                fileList: [],
                newUrl: '',
                msg: '',
                isShow: false,
                editForm: {
                    userId: 1,
                    invoiceCode: '',
                    createDate: '',
                    salesName: '',
                    salesAddress: '',
                    salesPhone: '',
                    serviceName: '',
                    price: '',
                    purchaserName: '',
                    purchaserCode: ''
                },
                formLabelWidth: '120px',
                tableData: [{
                    invoiceCode: ''
                }],
                rules: {
                  invoiceCode: [
                      {required:  true, message: "请输入发票代码", trigger: "blur"}
                  ],
                  serviceName: [
                      {required:  true, message: "请输入服务名称", trigger: "blur"}
                  ],
                    price: [
                        {required:  true, message: "请输入金额", trigger: "blur"}
                    ],
                    purchaserCode: [
                        {required:  true, message: "请输入纳税人识别号", trigger: "blur"}
                    ]
                },
                value1: ''
            };
        },
        created() {
            this.page()
        },
        methods: {
            //自动发票识别方法
            handlePreview(res) {
                const _this = this
                console.log(res);
                _this.newUrl = res.data
                fetch("https://dgfp.market.alicloudapi.com/ocrservice/invoice", {
                    method: "POST",
                    //body:'{"url":"http://invoice-bucket1.oss-cn-shanghai.aliyuncs.com/invoice/05223560-00a6-4383-86bf-47b963bffcc3.png"}',
                    body: JSON.stringify({
                       url: _this.newUrl
                    }),
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': 'AppCode 38056bd1f95c4b5986ebc468f8264b42'
                    },
                }).then(function(data) {
                   return data.text();
                }).then(function (data) {
                    console.log(data);
                    _this.isShow  = true
                    _this.editForm.invoiceCode = JSON.parse(data).data.发票代码;
                    _this.editForm.createDate = '2022-05-18';
                    _this.editForm.salesName = JSON.parse(data).data.销售方名称;
                    _this.editForm.salesAddress = '天津市滨海新区临港经济区临港怡湾广场3-208-05/06室';
                    _this.editForm.salesPhone = '022-27763608';
                    _this.editForm.price  = JSON.parse(data).data.发票金额
                    _this.editForm.serviceName  =  '运输服务'
                    _this.editForm.purchaserName  =  JSON.parse(data).data.受票方名称
                    _this.editForm.purchaserCode  =  JSON.parse(data).data.受票方税号
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
            handAdd() {
                this.isShow = true
            },
            handleEdit(index, row) {
                this.isShow = true;
                this.editForm = Object.assign({}, row)
                console.log(index, row);
            },
            diaSubmit(formName) {
                console.log(formName);
                this.isShow = false
                const _this = this
                _this.http.post("http://120.24.205.130:8081/invoice/add",{
                    "userId":1,
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
            page() {
                const _this = this
                _this.http.post("http://120.24.205.130:8081/invoice/list",{
                    "userId": 1,
                    "page": 0,
                    "size": 10
                }).then(res => {
                        this.tableData =  res.data.data
                })
            },
        }
    }
</script>

<style scoped>
  .addCard {
    display: flex;
    margin: 0 auto;
  }
  .add {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
  }
  .div-addCard {
    padding-bottom: 20px;
  }
  .div-newAdd {
    padding-top: 20px;
  }
  .div-newAdd {
    width: 1000px;
    justify-content: center;
    padding-left: 150px;
  }
  .avatar-uploader {
    padding-right: 8px;
  }
  .pagination {
    padding-top: 10px;
    float: right;
  }

</style>
