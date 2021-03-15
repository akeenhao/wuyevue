<template>
	<view class="index">
		<wyb-popup ref="popup" type="center" height="530" width="500" radius="6" :showCloseIcon="true">
		    <block class="">
		        <view style="width: 100%; display: block;">
					 <view  class="input-row border popup-add-title" >新增</view>
					<view style="width: 100%;  display: block;">
						<view class="input-group">
							<view class="input-row border">
								<text class="title" style="width: 70px;margin: 0 0 10px 10px;">标题：</text>
								<input type="text" v-model="title" style="border-bottom: 1px solid #9E9E9E;" placeholder="请输入标题" />
							</view>
						</view>
						<view class="input-group">
							<view class="input-row" style="width: 100%;">
								<text class="title"  style="width: 90px;margin: 0 0 10px 10px;">问题：</text>
								<textarea placeholder="输入问题描述..." v-model="context" class="feedback-textare" style="width90%;margin-right: 10px;border: 1px solid #9E9E9E;" />
							</view>
						</view>
						
						<view class="input-group">
						<button type="warn" class="feedback-submit family-add-btn" @click="apply">提交</button>
						<button type="warn" class="feedback-submit family-add-btn" @click="cancel">取消</button>
						</view>
						
					</view>
				</view>
		        	
		    </block>
		</wyb-popup>
       
		<block >  
			<view class="input-row" style="display: block;background-color: #FFFFFF;margin: 9px 9px 0 9px ;border-radius: 5px;">
				<view class="input-group" style="margin: 8px 15px; width: 100%;">
					<view class="input-row border">
						<text class="title">标题：</text>
						<input type="text" v-model="keyword" placeholder="请输入标题" />
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
							:placeholder = "'请选择状态'"
							:selectHideType="'hideAll'"
							@change="changeStutas"
						>
						</xfl-select>
					</view>
				</view>
			</view>
		</block>
		<view >
			<button type="warn" v-if="user.role === '1' " class="feedback-submit reply-btn" @click="add">新增</button>
			<button type="warn" :class="['feedback-submit', 'reply-btn', user.role == '1'?'': 'width100']" @click="getData">查询</button>
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
			 :content-bg-color="'#ffffff'" :default-col-width="'188'" />
			 <wyb-popup ref="comment" type="center" height="530" width="500" radius="6" :showCloseIcon="true">
			     <block class="">
			         <view style="width: 100%; display: block;">
			 			 <view  class="input-row border popup-add-title" >评论</view>
			 			<view style="width: 100%;  display: block;">
			 				<view class="input-group">
			 					<view class="input-row border">
			 						<text class="title" style="width: 70px;margin: 0 0 10px 10px;">标题：</text>
			 						{{ popupTitle }}
			 					</view>
			 				</view>
			 				<view class="input-group">
			 					<view class="input-row" style="width: 100%;">
			 						<text class="title"  style="width: 90px;margin: 0 0 10px 10px;">评论：</text>
			 						<textarea placeholder="输入评论..." v-model="popupContext" class="feedback-textare" style="width90%;margin-right: 10px;border: 1px solid #9E9E9E;" />
			 					</view>
			 				</view>
			 				
			 				<view class="input-group">
			 				<button type="warn" class="feedback-submit family-add-btn" @click="commentService">提交</button>
			 				<button type="warn" class="feedback-submit family-add-btn" @click="cancel">取消</button>
			 				</view>
			 				
			 			</view>
			 		</view>
			         	
			     </block>
			 </wyb-popup>
			 <wyb-popup ref="assign" type="center" height="430" width="500" radius="6" :showCloseIcon="true">
			     <block class="">
			         <view style="width: 100%; display: block;">
			 			 <view  class="input-row border popup-add-title" >分配</view>
			 			<view style="width: 100%;  display: block;">
			 				<view class="input-group">
			 					<view class="input-row border">
			 						<text class="title" style="width: 70px;margin: 0 0 10px 10px;">标题：</text>
			 							{{ popupTitle }}
			 					</view>
			 				</view>
			 				<view class="input-group">
			 					<view class="input-row" style="width: 100%;">
			 						<text class="title"  style="width: 90px;margin: 0 0 10px 10px;">分配：</text>
									<view style="margin-right: 20rpx;">
										<xfl-select
											:list="roleList"
											:clearable="false"
											:showItemNum="5" 
											:style_Container="'min-width: 140px;height: 30px;'"
											:placeholder = "'请分配工人'"
											:selectHideType="'hideAll'"
											@change="changeRole"
										>
										</xfl-select>
									</view>
									
			 					</view>
			 				</view>
			 				
			 				<view class="input-group">
			 				<button type="warn" class="feedback-submit family-add-btn" @click="setRepairMan">提交</button>
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
import util, { parGetData, parSetData, checklogin } from '../../common/util';
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
			popupTitle: '',
			popupId: '',
			popupContext: '',
			headers: [{
			                label: '标题',
			                key: 'title'
			            }, {
			                label: '申请人',
			                key: 'applyMan'
			            }, {
			                label: '内容',
			                key: 'context'
			            }, {
			                label: '申请时间',
			                key: 'applyTime'
			            }, {
			                label: '状态',
			                key: 'status'
			            }, {
			                label: '评论',
			                key: 'comment'
			            }, {
			                label: '操作',
			                key: 'operate'
			            }],
			 contents: [],
			 stutasList: [
				            { value : '全部', type: ''},
			 				{ value : '已申请', type: 'APPLY'},
			 				{ value : '已受理', type: 'RECEIVE'},
							{ value : '已维修', type: 'REPAIR'},
			 			],
						roleList: [{
							value: '', data: {}
						}],
						userId: '',
						user: {}
		};
	},
	components: { wybPopup, wybTable, xflSelect },
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
		this.getUserByRole();
	},
	methods: {
		commentService() {
	       		var self = this;
	       		var token = uni.getStorageSync('token');
	       		uni.request({
	       			url: util.apiurl + 'serviceFamily/commentService',
	       			method: 'POST',
	       			dataType: 'json',
	       			data: {
	       				applyId: this.popupId,
	       				comment: this.popupContext,
	       			}, 
	       			success: function(ret) {
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
	       			complete: function() {
	       				
	       			},
	       			header: {
	       				Authorization: token
	       			}
	       		});
	       		this.getData();
		},
		fix() {
				var self = this;
				var token = uni.getStorageSync('token');
				uni.request({
					url: util.apiurl + 'serviceFamily/fix',
					method: 'POST',
					dataType: 'json',
					data: {
						applyId: this.popupId,
					}, 
					success: function(ret) {
						console.log('ret', ret);
							self.$refs.assign.hide() // 隐藏
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
					complete: function() {
						
					},
					header: {
						Authorization: token
					}
				});
				this.getData();
		},
		setRepairMan() {
			var self = this;
			var token = uni.getStorageSync('token');
			uni.request({
				url: util.apiurl + 'serviceFamily/setRepairMan',
				method: 'POST',
				dataType: 'json',
				data: {
					applyId: this.popupId,
					userId: this.userId
				}, 
				success: function(ret) {
					console.log('ret', ret);
						self.$refs.assign.hide() // 隐藏
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
				complete: function() {
					
				},
				header: {
					Authorization: token
				}
			});
			this.getData();
		},
		changeRole(value) {
			this.userId = value.orignItem.data.id;
		},
		getUserByRole() {
			var self = this;
			var token = uni.getStorageSync('token');
			console.log(util.apiurl + 'user/getUserByRole');
			uni.request({
				url: util.apiurl + 'user/getUserByRole',
				method: 'GET',
				dataType: 'json',
				data: {
				},
				success: function(ret) {
					console.log('ret', ret);
				     	let tempList = [];
						// self.roleList = ret.data.data;
						for (var i = 0; i < ret.data.data.length; i++) {
							tempList.push(
							{
								value: ret.data.data[i].name,
								 data: ret.data.data[i]
							})
						}
						self.roleList = tempList;
						console.log('tempList', self.roleList);
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
				complete: function() {
					
				},
				header: {
					Authorization: token
				}
			});
		},
		changeStutas(value) {
		 this.status = value.orignItem.type;
	    },
		apply() {
			    var self = this;
				var token = uni.getStorageSync('token');
				console.log(util.apiurl + 'serviceFamily/apply');
				uni.request({
					url: util.apiurl + 'serviceFamily/apply',
					method: 'POST',
					dataType: 'json',
					data: {
						title: this.title,
						context: this.context
					},
					success: function(ret) {
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
					complete: function() {
						
					},
					header: {
						Authorization: token
					}
				});
			this.getData();
		},
		cancel() {
				this.$refs.popup.hide() // 隐藏
				this.$refs.assign.hide() // 隐藏
				this.$refs.comment.hide() // 隐藏
		},
		add(){
			this.context = '';
			this.title = '';
			this.$refs.popup.show() // 显示
			
		},
		gologinpage(){
			// #ifdef APP-PLUS
			uni.navigateTo({
				url: '/platforms/app-plus/login/login'
			});
			// #endif
			// #ifdef MP-WEIXIN
			uni.navigateTo({
				url: '/platforms/mp-weixin/login/login'
			});
			// #endif
		},
		checkstat() {
			var logininfo = util.checklogin();
			this.openid = logininfo.openid;
			this.userinfo = logininfo.userinfo;
			this.token = logininfo.token;
		},
		clickTableCell(e) {
			console.log('e', e);
			if(e.content === '去分配') {
				this.popupTitle = e.lineData.title;
				this.popupId = e.lineData.id;
				this.$refs.assign.show() // 隐藏
			}
			if(e.content === '去评论') {
				this.popupTitle = e.lineData.title;
					this.popupId = e.lineData.id;
					this.popupContext = '';
				this.$refs.comment.show() // 隐藏
			}
			if(e.content === '处理完毕') {
				var self = this;
				uni.showModal({
					title: '提示',
					content: '确认已经处理完毕？',
					success: function(res) {
						if (res.confirm) {
							self.popupId = e.lineData.id;
							self.fix();
						} else if (res.cancel) {
						}
					}
				});
			}
		},
		getData() {	
			var self = this;
			var token = uni.getStorageSync('token');
			var user = parGetData(uni.getStorageSync('userinfo'));
			console.log(util.apiurl + 'serviceFamily/getList');
			uni.request({
				url: util.apiurl + 'serviceFamily/getList',
				method: 'GET',
				dataType: 'json',
				data: {
					keyword: this.keyword,
					status: this.status
				},
				success: function(ret) {
					console.log('ret', ret);
						self.contents = ret.data.data;
							for (var i = 0; i < self.contents.length; i++) {
							if(user.role == '1') {
								if(self.contents[i].status === '已维修' && self.contents[i].comment === null) {
									self.contents[i].operate = '去评论';
								}
							} else if(user.role == '2') {
								if(self.contents[i].status === '已申请') {
									self.contents[i].operate = '去分配';
								}
							}else {
								if(self.contents[i].status === '已受理') {
									self.contents[i].operate = '处理完毕';
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
				complete: function() {
					
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
		},
		setlike(type, index, tid) {

			if(!this.token){
				this.gologinpage();
				return
			}

			util.setlike(this, this.list[index], type, tid);
		},
		previmg(url) {
			uni.previewImage({
				urls: [url]
			});
		},
		/* 登录方法 */
		login(res) {
			util.logincomm(res, this);
		}
	}
};
</script>

<style >
	.wyb-table-box, .wyb-table-content, .wyb-table-scroll-view {
		display: block;
	}
	.family-add-btn {
		width: 60%;
		height: 60rpx;
		font-size: 34rpx;
		margin: 45rpx;
		line-height: 60rpx;
	}
	.popup-add-title {
		width: 100%;
		text-align: center;
		display: block;
		font-size: 40rpx;
		margin: 20rpx 0;
	}
	.iconfont {
		font-size: 36rpx !important;
	}
	.width100{
		width: 100% !important;
	}
	.reply-btn {
		width: 50%; 
		height: 70rpx;
		font-size: 32rpx;
		margin: 15rpx;
	}
</style>
