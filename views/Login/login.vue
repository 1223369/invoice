<template>
  <div class="login">
    <el-card>
      <div style="text-align: left;padding-bottom: 15px;color: #409eff;font-size: 20px">登录</div>
      <el-container>
        <el-header>
          <img class="mlogo" src="data:image/jpeg;base64,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" alt="">
        </el-header>
        <el-main>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>

        </el-main>
      </el-container>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                ruleForm: {
                    username: 'admin',
                    password: '123456'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请选择密码', trigger: 'change' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this
                        this.http.post('http://120.24.205.130:8081/user/login', this.ruleForm).then(res => {

                            const jwt = res.headers['authorization']
                            const userInfo = res.data.data

                            console.log(userInfo)

                            //把数据共享出去
                            _this.$store.commit("SET_TOKEN",jwt)
                            _this.$store.commit("SET_USERINFO",userInfo)

                            _this.$router.push("/home")

                        })

                    } else {
                        alert('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

  .login {
    padding-top: 130px;
    text-align: center;
    margin: auto;
    width: 600px;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .mlogo {
    height: 60%;
    margin-top: 10px;
  }

  .demo-ruleForm {
    max-width: 500px;
    margin: 0 auto;
  }

</style>
