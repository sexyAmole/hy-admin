<template>
    <div class="hy-login">
        <div class="login-warp">
            <div class="login-l">
                <div class="warp-main-login">
                <div class="admin-login">
                    <img src="../assets/images/logo.png" alt="花毅后台" class="admin-login-image">
                </div>
                <div class='admin-text'>花毅鲜花后台管理系统</div>
                </div>
            <div class="login-centent">
                <div class="layui-form-item">
                    <div class="login-input-inline" :class="{'login-error':nameError}">
                        <div class="login-label">
                            <span class="iconfont icon-yonghu-tianchong"></span>
                        </div>
                        <input type="text" v-model="userName" class="login-input" placeholder="账号" @keyup.enter="login" @click='nameError = false'>
                        <div class="login-prompt-error" v-if="nameError">{{nameError}}</div>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="login-input-inline" :class="{'login-error':passwordError}">
                        <div class="login-label">
                            <span class="iconfont icon-mima"></span>
                        </div>
                        <input type="password" v-model="userPassword" class="login-input" placeholder="密码" @keyup.enter="login" @click='passwordError = false'>
                        <div class="login-prompt-error" v-if="passwordError">{{passwordError}}</div>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="login-btn-primay" @click="login">登录</div>
                </div>
            </div>
            </div>
            <div class="login-r"></div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import { Login } from '../common/axios.config.js'
export default {
    data() {
        return {
            userName: '',
            userPassword: '',
            nameError: false,
            passwordError: false
        }
    },
    methods: {
        login() {
            let that = this,
                userName = that.userName,
                userPassword = that.userPassword;
            if (!userName) {
                return that.nameError = "输入账号";
            } else if (!userPassword) {
                return that.passwordError = "输入密码";
            } else {
                that.nameError = false;
                that.passwordError = false;
                that.$axios.post(Login, {
                    "account": userName,
                    "passWord": userPassword
                }).then((res) => {
                    if (res.Code == 200) {
                        this.$message({
                            message: '恭喜你，登录成功',
                            type: 'success'
                        });
                        sessionStorage.setItem("token", "Success")
                        that.$router.push('/');
                    } else {
                        that.passwordError = res.Message;
                    }
                })
            }
        }

    }
};
</script>
<style lang="less" scoped>
.hy-login {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background: url("../assets/images/admin_bg.png") ;
    background: url("../assets/images/admin_bg.jpg") no-repeat center center;

}

.login-warp {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 900px;
    height: 500px;
    background-color: #fff;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 20px #DBDBDB;
    z-index: 100;
    overflow: hidden;
    .login-l{
        float: left;
        width: 350px;
    }
    .login-r{
        float: left;
        width: 550px;
        height: 100%;
        background:url("../assets/images/login_r.jpg") no-repeat;
        background-size: 100% 100%;
    }
}

.warp-main-login {
    margin: 60px 0 60px 0;
    // height: 100px;
    .admin-login {
        overflow: hidden;
        text-align: center;
        margin-bottom: 20px;
        .admin-login-image {
            width: 48px;
            height: 48px;
            // border-radius: 50%;
        }
    }
    .admin-text {
        color: #686868;
        letter-spacing: 2px;
        text-align: center;
        font-size: 14px;
    }
}

.login-centent {
    padding: 0 20px 40px 20px;
}

.login-error {
    animation: error 0.25s;
}

@keyframes error {
    0% {
        transform: translateX(0px)
    }
    33% {
        transform: translateX(-10px)
    }
    66% {
        transform: translateX(10px)
    }
    100% {
        transform: translateX(0px)
    }
}


.layui-form-item {
    margin-bottom: 15px;
    .login-input-inline {
        // border: #ccc solid 1px;
        // border-radius: 6px;
        // font-size: 18px;
        border-bottom: 2px solid #3695FF;
        height: 46px;
        line-height: 46px;
        // background-color: #fff;
        display: flex;
        overflow: hidden;
        opacity: 0.8;
        transition: all ease-in;
        // box-shadow: 0 0 5px #ccc;
        position: relative;
        outline: none;
        // &:hover {
        //     opacity: 1;
        //     box-shadow: 0 0 3px #6d93f2;
        //     border: 1px solid #6d93f2;
        // }

        .login-prompt-error {
            background: #d16d62;
            border-radius: 4px;
            color: #fff;
            font-size: 12px;
            font-weight: 400;
            height: 26px;
            line-height: 26px;
            padding: 0 10px;
            position: absolute;
            right: 10px;
            top: 10px;
            z-index: 100;
        }

        .login-label {
            height: 46px;
            width: 46px;
            // background: linear-gradient(#f8f8f8, #fafafa);
            // border-right: solid 1px #ccc;
            text-align: center;
            line-height: 46px;
            .iconfont {
                color: #3a3a3a;
                font-size: 18px;
                color: #3695FF;
            }
        }
        .login-input {
            flex: 1;
            border: none;
            padding: 0 15px;
            line-height: 46px;
            outline: none;
            font-size: 16px;
            letter-spacing: 1px;
        }
    }
}

.login-btn-primay {
    margin-top:45px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background-color: #3695FF;
    border-radius: 48px;
    color: #fff;
    cursor: pointer;
    box-shadow:  0 4px 10px #BCDBFF;
    opacity: 1;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 2px;
    &:hover {
        opacity: 0.9;
    }
    &:active {
        background-color: #3463ec;
    }
}
</style>