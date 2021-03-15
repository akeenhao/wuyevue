<template>
    <view class="content">
        <block v-if="type == 'login'">
            <view class="input-group">
                <view class="input-row border">
                    <text class="title">账号：</text>
                    <input type="text" v-model="userBase.account" placeholder="请输入你的账号"/>
                </view>
            </view>
            <view class="input-group">
                <view class="input-row">
                    <text class="title">密码：</text>
                    <input
                            type="text"
                            password="true"
                            v-model="userBase.password"
                            placeholder="请输入你的密码"
                    />
                </view>
            </view>
            <view class="btn-row">
                <button type="warn" @tap="bindLogin">立即登录</button>
            </view>
        </block>
        <block v-if="type == 'reg'">
            <view class="input-group">
                <view class="input-row border">
                    <text class="title">账号：</text>
                    <input type="text" v-model="userBase.account" placeholder="长度5-12个字符"/>
                </view>
            </view>
            <view class="input-group">
                <view class="input-row border">
                    <text class="title">姓名：</text>
                    <input type="text" v-model="userBase.name" placeholder="长度5-12个字符"/>
                </view>
            </view>
            <view class="input-group">
                <view class="input-row border">
                    <text class="title">性别：</text>
                    <xfl-select
                            :list="sexList"
                            :clearable="false"
                            :showItemNum="5"
                            :style_Container="'min-width: 200px'"
                            :placeholder="'请选择角色'"
                            :selectHideType="'hideAll'"
                            :initValue="'男'"
                            @change="changeSex"
                    >
                    </xfl-select>
                </view>
            </view>
            <view class="input-group">
                <view class="input-row border">
                    <text class="title">身份证：</text>
                    <input type="text" v-model="userBase.idCard" placeholder="请输入身份证号"/>
                </view>
            </view>
            <view class="input-group">
                <view class="input-row border">
                    <text class="title">手机号：</text>
                    <input type="text" v-model="userBase.phone" placeholder="请输入手机号"/>
                </view>
            </view>
            <view class="input-group">
                <view class="input-row">
                    <text class="title">密码：</text>
                    <input
                            type="text"
                            password="true"
                            v-model="userBase.password"
                            placeholder="长度6-18个字符"
                    />
                </view>
            </view>
            <view class="input-group">
                <view class="input-row">
                    <text class="title">角色：</text>
                    <view>
                        <xfl-select
                                :list="roleList"
                                :clearable="false"
                                :showItemNum="5"
                                :style_Container="'min-width: 200px'"
                                :placeholder="'请选择角色'"
                                :selectHideType="'hideAll'"
                                @change="changeRole"
                        >
                        </xfl-select>
                    </view>
                </view>
            </view>
            <block v-if="userBase.role === '1' ">
                <view class="input-group">
                    <view class="input-row">
                        <text class="title">楼号：</text>
                        <input
                                type="text"
                                v-model="userExpand.building"
                                placeholder="长度6-18个字符"
                        />
                    </view>
                </view>
                <view class="input-group">
                    <view class="input-row">
                        <text class="title">单元：</text>
                        <input
                                type="text"
                                v-model="userExpand.part"
                                placeholder="长度6-18个字符"
                        />
                    </view>
                </view>
                <view class="input-group">
                    <view class="input-row">
                        <text class="title">房号：</text>
                        <input
                                type="text"
                                v-model="userExpand.room"
                                placeholder="长度6-18个字符"
                        />
                    </view>
                </view>
            </block>

            <view class="btn-row">
                <button type="warn" @tap="bindReg">
                    {{ type == 'login' ? '立即登录' : '注册帐号' }}
                </button>
            </view>
        </block>
        <view class="action-row">
            <text @click="toggle">{{ type == 'login' ? '注册账号' : '已有帐号直接登录' }}</text>
        </view>
    </view>
</template>

<script>
    import util, {parGetData, parSetData, checklogin} from '../../../common/util';
    import xflSelect from '../../../components/xfl-select/xfl-select.vue';     //导入
    export default {
        data() {
            return {
                userBase: {
                    account: '', // 账号
                    password: '',// 密码
                    name: '', // 性别
                    role: '',
                    sex: '男',
                    idCard: '',
                    phone: '',    // 手机号
                },
                userExpand: {
                    building: '', // 楼号
                    part: '',     // 单元
                    room: ''      // 房号
                },
                password2: '',
                token: '',
                type: 'login',
                roleList: [
                    {value: '业主', type: '1'},
                    {value: '管理员', type: '2'},
                    {value: '维修人员', type: '3'}
                ],
                sexList: [
                    {value: '男', type: '男'},
                    {value: '女', type: '女'}
                ],
            };
        },
        components: {xflSelect},  //注册为子组件
        created() {
            this.goHome();
        },
        methods: {
            goHome() {
                var token = uni.getStorageSync('token');
                if (token) {
                    uni.switchTab({
                        url: '/pages/new/new'
                    });
                }
            },
            changeRole(value) {
                this.userExpand = {
                    building: '', // 楼号
                    part: '',     // 单元
                    room: ''      // 房号
                },
                    this.userBase.role = value.orignItem.type
            },
            changeSex(value) {
                this.userBase.sex = value.orignItem.type
            },
            toggle() {
                this.type = this.type == 'login' ? 'reg' : 'login';
            },
            gopwd() {
                uni.showModal({
                    title: '未绑定手机，无法找回密码',
                    confirmText: '知道了',
                    content: '请联系客服处理,客服email: 2867557054@qq.com',
                    success: function (res) {
                    }
                });
            },

            bindLogin() {
                if (this.userBase.account.length > 12) {
                    uni.showToast({
                        icon: 'none',
                        title: '账号长度必须在12个字符以内'
                    });
                    return;
                }
                // if (this.userBase.password.length < 6 || this.userBase.password.length > 18) {
                // 	uni.showToast({
                // 		icon: 'none',
                // 		title: '密码长度必须为6-18个字符'
                // 	});
                // 	return;
                // }
                uni.showLoading({
                    title: '登录中',
                    icon: 'none'
                });
                const data = {
                    account: this.userBase.account,
                    password: this.userBase.password
                };

                // 去登录
                uni.request({
                    url: util.apiurl + 'user/login',
                    method: 'POST',
                    data: data,
                    success: ret => {
                        console.log('ret', ret);
                        if (ret.statusCode == 200 && ret.data.msg == '操作成功！') {
                            // 存入用户信息
                            uni.setStorageSync('userinfo', parSetData(ret.data.data));
                            // 存入token
                            uni.setStorageSync('token', parSetData(ret.data.data.token));

                            this.goHome();
                        } else {
                            uni.showToast({
                                title: ret.data.msg,
                                icon: 'none'
                            });
                            setTimeout(function () {
                                uni.hideLoading();
                            }, 1000);
                        }
                    },
                    complete: function () {
                        uni.hideLoading();
                    },
                    header: {
                        auth: util.httpauth
                    }
                });
            },
            bindReg() {
                // if (this.account.length < 5) {
                // 	uni.showToast({
                // 		icon: 'none',
                // 		title: '账号最短为 5 个字符'
                // 	});
                // 	return;
                // }
                // if (this.password.length < 6) {
                // 	uni.showToast({
                // 		icon: 'none',
                // 		title: '密码最短为 6 个字符'
                // 	});
                // 	return;
                // }
                // if (this.password != this.password2) {
                // 	uni.showToast({
                // 		icon: 'none',
                // 		title: '两次密码不同'
                // 	});
                // 	return;
                // }
                uni.showLoading({
                    title: '注册中',
                    icon: 'none'
                });

                const data = {
                    ...this.userBase,
                    ...this.userExpand
                };
                // 去登录
                uni.request({
                    url: util.apiurl + 'user/register',
                    method: 'POST',
                    data: data,
                    success: ret => {
                        console.log('ret', ret);
                        if (ret.statusCode == 200 && ret.data.msg == '操作成功！') {
                            // 存入用户信息
                            uni.setStorageSync('userinfo', parSetData(ret.data.data));
                            // 存入token
                            uni.setStorageSync('token', parSetData(ret.data.data.token));
                            uni.switchTab({
                                url: '/pages/center/center'
                            });
                        } else {
                            uni.showToast({
                                title: ret.data.msg,
                                icon: 'none'
                            });
                            setTimeout(function () {
                                uni.hideLoading();
                            }, 1000);
                        }
                    },
                    complete: function () {
                        uni.hideLoading();
                    },
                    header: {
                        auth: util.httpauth
                    }
                });
            }
        },
        onLoad() {
        }
    };
</script>
<style>
    .content {
        display: flex;
        flex: 1;
        flex-direction: column;
        background-color: #efeff4;
        padding: 20 rpx;
    }

    .input-group {
        background-color: #ffffff;
        margin-top: 40 rpx;
        position: relative;
    }

    .input-row {
        display: flex;
        position: relative;
        font-size: 30 rpx;
        width: 100%;
    }

    .input-row .title {
        width: 20%;
        height: 30 rpx;
        min-height: 30 rpx;
        padding: 15px 0;
        padding-left: 30 rpx;
        line-height: 30 rpx;
    }

    .input-row input {
        width: 80%;
        height: 30 rpx;
        min-height: 30 rpx;
        display: block;
        margin: 0;
        padding: 15px 0;
        line-height: 30 rpx;
    }

    .btn-row {
        margin-top: 20 rpx;
        padding: 20px;
    }

    .action-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 10 rpx;
    }

    .action-row text {
        color: #007aff;
        padding: 0 10px;
        font-size: 30 rpx;
    }
</style>

<style>
    .content {
        display: flex;
        flex: 1;
        flex-direction: column;
        background-color: #efeff4;
        padding: 20px;
    }

    .input-group {
        background-color: #ffffff;
        margin-top: 40px;
        position: relative;
    }

    .input-row {
        display: flex;
        position: relative;
        font-size: 30 rpx;
        width: 100%;
    }

    .input-row .title {
        width: 20%;
        height: 50px;
        min-height: 50px;
        padding: 15px 0;
        padding-left: 30px;
        line-height: 50px;
    }

    .input-row input {
        width: 80%;
        height: 50px;
        min-height: 50px;
        display: block;
        margin: 0;
        padding: 15px 0;
        line-height: 50px;
    }

    .btn-row {
        margin-top: 50px;
        padding: 20px;
    }

    .msg {
        display: block;
        text-align: left;
        margin-top: 20 rpx;
        padding: 10 rpx;
    }

    .msg text {
        color: #007aff;
        padding: 0 20px;
        font-size: 30 rpx;
    }
</style>
