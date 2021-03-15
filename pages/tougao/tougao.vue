<template>
    <view class="index">
        <wyb-popup ref="popup" type="center" height="530" width="500" radius="6" :showCloseIcon="true">
            <block class="">
                <view style="width: 100%; display: block;">
                    <view class="input-row border" style="width: 100%; text-align: center; display: block;font-size: 20px;
    margin: 10px 0;">新增
                    </view>
                    <view style="width: 100%;  display: block;">
                        <view class="input-group">
                            <view class="input-row border">
                                <text class="title" style="width: 70px;margin: 0 0 10px 10px;">标题：</text>
                                <input type="text" v-model="title" style="border-bottom: 1px solid #9E9E9E;"
                                       placeholder="长度5-12个字符"/>
                            </view>
                        </view>
                        <view class="input-group">
                            <view class="input-row" style="
    width: 100%;">
                                <text class="title" style="width: 90px;margin: 0 0 10px 10px;">申报内容：</text>
                                <textarea placeholder="输入申报内容..." v-model="context" class="feedback-textare"
                                          style="width90%;margin-right: 10px;border: 1px solid #9E9E9E;"/>
                            </view>
                        </view>

                        <view class="input-group">
                            <button type="warn" class="feedback-submit" style="width: 60%;    height: 30px;
    font-size: 17px;
    margin: 45rpx;
    line-height: 30px;" @click="apply">提交
                            </button>

                            <button type="warn" class="feedback-submit" style="width: 60%;    height: 30px;
    font-size: 17px;
    margin: 45rpx;
    line-height: 30px;" @click="cancel">取消
                            </button>
                        </view>

                    </view>
                </view>

            </block>
        </wyb-popup>

        <block>
            <view class="input-row"
                  style="display: block;background-color: #FFFFFF;margin: 9px 9px 0 9px ;border-radius: 5px;">
                <view class="input-group" style="margin: 8px 15px; width: 100%;">
                    <view class="input-row border">
                        <text class="title">标题：</text>
                        <input type="text" v-model="keyword" placeholder="请输入标题"/>
                    </view>
                </view>
                <view class="input-group" style="margin: 8px 15px;width: 100%;">
                    <view class="input-row">
                        <text class="title">状态：</text>
                        <xfl-select
                                :list="stutasList"
                                :clearable="false"
                                :showItemNum="5"
                                :style_Container="'min-width: 200px;height: 30px'"
                                :placeholder="'请选择状态'"
                                :selectHideType="'hideAll'"
                                @change="changeStutas"
                        >
                        </xfl-select>
                    </view>
                </view>
            </view>
        </block>
        <view>
            <button type="warn" v-if="user.role === '1' " class="feedback-submit reply-btn" @click="add">新增</button>
            <button type="warn" :class="['feedback-submit', 'reply-btn', user.role == '1'?'': 'width100']"
                    @click="getData">查询
            </button>
        </view>
        <block v-for="(item, index) in list" :key="index">
            <view class="card">
                <view class="car-title-view">
                    {{item.text}}
                </view>
            </view>
        </block>

        <wyb-table ref="table" :headers="headers"
                   :contents="contents" @onCellClick="clickTableCell"
                   :header-bg-color="'#dfe2e5'" :first-col-bg-color="['#ffffff']"
                   :content-bg-color="'#ffffff'" :default-col-width="'188'"/>
        <wyb-popup ref="comment" type="center" height="530" width="500" radius="6" :showCloseIcon="true">
            <block class="">
                <view style="width: 100%; display: block;">
                    <view class="input-row border popup-add-title">回复</view>
                    <view style="width: 100%;  display: block;">
                        <view class="input-group">
                            <view class="input-row border">
                                <text class="title" style="width: 70px;margin: 0 0 10px 10px;">标题：</text>
                                {{ popupTitle }}
                            </view>
                        </view>
                        <view class="input-group">
                            <view class="input-row" style="width: 100%;">
                                <text class="title" style="width: 90px;margin: 0 0 10px 10px;">回复：</text>
                                <textarea placeholder="输入回复..." v-model="popupContext" class="feedback-textare"
                                          style="width90%;margin-right: 10px;border: 1px solid #9E9E9E;"/>
                            </view>
                        </view>

                        <view class="input-group">
                            <button type="warn" class="feedback-submit family-add-btn" @click="commentService">提交
                            </button>
                            <button type="warn" class="feedback-submit family-add-btn" @click="cancel">取消</button>
                        </view>

                    </view>
                </view>

            </block>
        </wyb-popup>
    </view>
</template>
<script>
    /**
     * 首页
     */
    import util, {parGetData, parSetData, checklogin} from '../../common/util';
    import wybPopup from '@/components/wyb-popup/wyb-popup.vue'
    import wybTable from '@/components/wyb-table/wyb-table.vue'
    import xflSelect from '@/components/xfl-select/xfl-select.vue';     //导入
    export default {
        data() {
            return {
                /* 为true表示正在刷新 */
                refreshing: false,
                loading: false,
                showlogin: false,
                show: false,
                context: '',
                title: '',
                status: '',
                keyword: '',
                headers: [{
                    label: '标题',
                    key: 'title'
                },{
                    label: '内容',
                    key: 'context'
                }, {
                    label: '申请人',
                    key: 'applyMan'
                }, {
                    label: '申请时间',
                    key: 'applyTime'
                }, {
                    label: '状态',
                    key: 'status'
                }, {
                    label: '回复内容',
                    key: 'replyContext'
                }, {
                    label: '回复时间',
                    key: 'replyTime'
                }, {
                    label: '操作',
                    key: 'operate'
                }],
                contents: [],
                stutasList: [
                    {value: '全部', type: ''},
                    {value: '已申请', type: 'APPLY'},
                    {value: '已回复', type: 'REPLY'}
                ],
                popupTitle: '',
                popupId: '',
                popupContext: '',
                user: {}
            };
        },
        components: {wybPopup, wybTable, xflSelect},

        onReachBottom() {
            /* 到底部加载 */
            this.getData();
        },
        onPullDownRefresh() {
            // 下拉刷新
            this.refreshing = true;
            this.getData();
        },
        onShareAppMessage() {
            return {
                title: '最新最好笑的趣事趣图，来看下吧',
                path: '/pages/new/new'
            };
        },
        created() {
            this.user = parGetData(uni.getStorageSync('userinfo'));
            this.getData();
        },
        methods: {
            commentService() {
                var self = this;
                var token = uni.getStorageSync('token');
                uni.request({
                    url: util.apiurl + 'serviceCommunity/reply',
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        applyId: this.popupId,
                        comment: this.popupContext,
                    },
                    success: function (ret) {
                        console.log('ret', ret);
                        self.$refs.comment.hide() // 隐藏
                        if (ret.statusCode !== 200) {
                            uni.showToast({
                                title: '请求数据失败请重试' + ret.statusCode,
                                duration: 2000,
                                icon: 'none'
                            });
                        }
                    },
                    fail: res => {
                        console.log(JSON.stringify(res));
                        uni.showToast({
                            title: '请求数据失败请重试1',
                            duration: 2000,
                            icon: 'none'
                        });
                    },
                    complete: function () {

                    },
                    header: {
                        Authorization: token
                    }
                });
                this.getData();
            },
            clickTableCell(e) {
                console.log('e', e);
                if (e.content === '去回复') {
                    this.popupTitle = e.lineData.title;
                    this.popupId = e.lineData.id;
                    this.$refs.comment.show() // 隐藏
                }
            },
            changeStutas(value) {
                this.status = value.orignItem.type
            },
            apply() {
                var self = this;
                var token = uni.getStorageSync('token');
                console.log(util.apiurl + 'serviceCommunity/apply');
                uni.request({
                    url: util.apiurl + 'serviceCommunity/apply',
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        title: this.title,
                        context: this.context
                    },
                    success: function (ret) {
                        console.log('ret', ret);
                        self.$refs.popup.hide() // 隐藏
                        if (ret.statusCode !== 200) {
                            uni.showToast({
                                title: '请求数据失败请重试' + ret.statusCode,
                                duration: 2000,
                                icon: 'none'
                            });
                        }
                    },
                    fail: res => {
                        console.log(JSON.stringify(res));
                        uni.showToast({
                            title: '请求数据失败请重试1',
                            duration: 2000,
                            icon: 'none'
                        });
                    },
                    complete: function () {

                    },
                    header: {
                        Authorization: token
                    }
                });
                this.getData();

            },
            cancel() {
                this.$refs.popup.hide() // 隐藏
            },
            add() {
                this.context = '';
                this.title = '';
                this.$refs.popup.show() // 显示
            },
            getData() {
                var self = this;
                var user = parGetData(uni.getStorageSync('userinfo'));
                var token = uni.getStorageSync('token');
                uni.request({
                    url: util.apiurl + '/serviceCommunity/getList',
                    method: 'GET',
                    dataType: 'json',
                    data: {
                        keyword: this.keyword,
                        status: this.status
                    },
                    success: function (ret) {
                        console.log('ret', ret);
                        self.contents = ret.data.data;
                        for (var i = 0; i < self.contents.length; i++) {
                            if (user.role == '2') {
                                if (self.contents[i].status === '已申请') {
                                    self.contents[i].operate = '去回复';
                                }
                            }
                        }

                        if (ret.statusCode !== 200) {
                            uni.showToast({
                                title: '请求数据失败请重试' + ret.statusCode,
                                duration: 2000,
                                icon: 'none'
                            });

                        } else {

                        }
                    },
                    fail: res => {
                        console.log(JSON.stringify(res));
                        uni.showToast({
                            title: '请求数据失败请重试1',
                            duration: 2000,
                            icon: 'none'
                        });
                    },
                    complete: function () {

                    },
                    header: {
                        Authorization: token
                    }
                });
            },
            showreply(id, index) {
                uni.setStorage({
                    key: 'detail-' + id,
                    data: parSetData(this.list[index])
                });
                // 进入回复页面
                uni.navigateTo({
                    url: '../detail/detail?id=' + id
                });
            }
        }
    };
</script>

<style>
    .wyb-table-box, .wyb-table-content, .wyb-table-scroll-view {
        display: block;
    }

    .family-add-btn {
        width: 60%;
        height: 60 rpx;
        font-size: 34 rpx;
        margin: 45 rpx;
        line-height: 60 rpx;
    }
    .popup-add-title {
        width: 100%;
        text-align: center;
        display: block;
        font-size: 40 rpx;
        margin: 20 rpx 0;
    }
    .iconfont {
        font-size: 36 rpx !important;
    }

    .width100 {
        width: 100% !important;
    }
    .reply-btn {
        width: 50%;
        height: 70 rpx;
        font-size: 32 rpx;
        margin: 15 rpx;
    }
    .family-add-btn {
        width: 60%;
        height: 60rpx;
        font-size: 34rpx;
        margin: 45rpx;
        line-height: 60rpx;
    }
    .reply-btn {
        width: 50%;
        height: 70rpx;
        font-size: 32rpx;
        margin: 15rpx;
    }
</style>
