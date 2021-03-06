/*
 Navicat Premium Data Transfer

 Source Server         : 测试服务器
 Source Server Type    : MySQL
 Source Server Version : 50714
 Source Host           : 172.30.20.100:53306
 Source Schema         : cceos_new

 Target Server Type    : MySQL
 Target Server Version : 50714
 File Encoding         : 65001

 Date: 20/01/2020 15:45:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `user_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `login_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录账号',
  `user_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '用户昵称',
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '用户邮箱',
  `sex` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '用户性别（0男 1女 2未知）',
  `avatar` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '头像路径',
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '密码',
  `status` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '帐号状态（0正常 1停用）',
  `create_by` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `uk_login_name`(`login_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户信息表' ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `market_image`;
CREATE TABLE `market_image`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '图片id',
  `url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图片地址',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '图片表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_inf
-- ----------------------------
DROP TABLE IF EXISTS `user_inf`;
CREATE TABLE `user_inf`  (
  `user_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '手机号码',
  `openId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '微信openId',
  `studentId` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '学号',
  `avatarUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '微信头像',
  `city` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '微信城市',
  `country` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '微信国家',
  `nickName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '微信昵称',
  `language` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '微信语言',
  `province` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '微信省份',
  `gender` tinyint(1) NULL DEFAULT NULL COMMENT '微信性别 性别0-女，1-男',
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '密码',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '头像路径',
  `sex` tinyint(1) NULL DEFAULT NULL COMMENT '性别0-女，1-男',
  `birthday` timestamp(0) NULL DEFAULT NULL COMMENT '生日',
  `intro` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '简介',
  `school` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '学校名称',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for cceos_order
-- ----------------------------
DROP TABLE IF EXISTS `market_order`;
CREATE TABLE `market_order`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '订单ID',
  `order_no` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '订单号',
  `product_id` int(11) UNSIGNED NULL DEFAULT NULL COMMENT '商品ID',
  `product_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '商品名称',
  `product_picture` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品图片',
  `package_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '严选平台包裹号',
  `amount` bigint(12) UNSIGNED NULL DEFAULT NULL COMMENT '小计',
  `user_phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '买家手机号',
  `random_key` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '随机串',
  `user_id` int(11) UNSIGNED NULL DEFAULT NULL COMMENT '用户ID',
  `pay_amount` bigint(12) UNSIGNED NULL DEFAULT NULL COMMENT '订单金额',
  `exp_fee` bigint(12) NULL DEFAULT NULL COMMENT '邮费',
  `logistics_no` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '物流号',
  `trans_time` datetime(0) NULL DEFAULT NULL COMMENT '付款时间',
  `flag` tinyint(3) UNSIGNED NULL DEFAULT 0 COMMENT '对账标志（1:已对账；0:未对账）',
  `status` tinyint(1) NULL DEFAULT 0 COMMENT '状态（0:未支付,1:已完成,2:已支付,3:关闭,4:退货,5:异常,6:拒绝取消订单）',
  `pay_status` tinyint(1) NULL DEFAULT 0 COMMENT '支付状态（0：未支付，1：已支付）',
  `reject_reason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '拒绝取消订单理由',
  `refund_no` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '退货订单号',
  `notify_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '货架回调路径',
  `seller_id` int(11) NULL DEFAULT NULL COMMENT '卖家编号',
  `is_delete` tinyint(4) UNSIGNED NULL DEFAULT 0 COMMENT '是否删除（0:否，1:是）',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_order_no`(`order_no`) USING BTREE,
  INDEX `idx_random_key`(`random_key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3474 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '订单信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cceos_order_item
-- ----------------------------
DROP TABLE IF EXISTS `market_order_item`;
CREATE TABLE `market_order_item`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '订单详情ID',
  `order_no` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '订单号',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '卖家手机号码',
  `user_id` int(11) UNSIGNED NULL DEFAULT NULL COMMENT '用户ID',
  `product_id` int(11) UNSIGNED NULL DEFAULT NULL COMMENT '商品ID',
  `product_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '商品名称',
  `product_picture` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品图片',
  `package_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '严选平台包裹号',
  `amount` bigint(12) UNSIGNED NULL DEFAULT NULL COMMENT '小计',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_order_no`(`order_no`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4227 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '订单条目表' ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for market_collect
-- ----------------------------
DROP TABLE IF EXISTS `market_like`;
CREATE TABLE `market_like`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `user_id` int(11) NOT NULL COMMENT '用户编号',
  `item_id` int(11) NOT NULL COMMENT '商品编号',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态（0：无效，1：有效）',
  `type` tinyint(1) NOT NULL DEFAULT 1 COMMENT '收藏类别（0：商品，1：帖子，3：留言）',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户点赞表' ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for market_collect
-- ----------------------------
DROP TABLE IF EXISTS `market_collect`;
CREATE TABLE `market_collect`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `user_id` int(11) NOT NULL COMMENT '用户编号',
  `item_id` int(11) NOT NULL COMMENT '商品编号',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态（0：无效，1：有效）',
  `type` tinyint(1) NOT NULL DEFAULT 1 COMMENT '收藏类别（0：商品，1：帖子）',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户收藏表' ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for cceos_product_type
-- ----------------------------
DROP TABLE IF EXISTS `market_type`;
CREATE TABLE `market_type`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品分类ID',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '商品分类名称',
  `picture` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '图片地址',
  `type` tinyint(1) NOT NULL DEFAULT 1 COMMENT '收藏类别（0：商品，1：帖子）',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 109272001 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '商品分类信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for market_item
-- ----------------------------
DROP TABLE IF EXISTS `market_item`;
CREATE TABLE `market_item`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `user_id` int(11) NOT NULL COMMENT '卖家编号',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '卖家手机号码',
  `viewing_count` int(11) NOT NULL DEFAULT 0 COMMENT '浏览数',
  `like_count` int(11) NOT NULL DEFAULT 0 COMMENT '喜欢数',
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标题',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '商品描述',
  `trans_type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '交易方式（0：线下，1：邮寄）',
  `type` int(11) NULL DEFAULT NULL COMMENT '商品分类编号',
  `is_free_shipping` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否包邮（0：否，1：是）',
  `amount` bigint(20) NULL DEFAULT NULL COMMENT '价格',
  `exp_fee` bigint(20) NOT NULL DEFAULT 0 COMMENT '邮费',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态（0：已删除，1：有效，2：已下架，3：已锁定，4：已售出，5：已收货）',
  `pics` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片文件夹地址',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '二手市场商品表' ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for market_item
-- ----------------------------
DROP TABLE IF EXISTS `market_topic`;
CREATE TABLE `market_topic`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `user_id` int(11) NOT NULL COMMENT '作者id',
  `viewing_count` int(11) NOT NULL DEFAULT 0 COMMENT '浏览数',
  `like_count` int(11) NOT NULL DEFAULT 0 COMMENT '喜欢数',
  `collect_count` int(11) NOT NULL DEFAULT 0 COMMENT '收藏数',
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '帖子标题',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '帖子描述',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '帖子详情',
  `type` int(11) NULL DEFAULT NULL COMMENT '帖子分类',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态（0：已删除，1：有效，2：已下架）',
  `pics` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片文件夹地址',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '二手市场论坛表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for market_item
-- ----------------------------
DROP TABLE IF EXISTS `market_donate`;
CREATE TABLE `market_donate`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '卖家手机号码',
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '捐献物品标题',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '捐献物品描述',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '捐献物品详情',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态（0：已删除，1：有效，2：已回收）',
  `pics` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片文件夹地址',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户捐献表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cceos_flea_market_message
-- ----------------------------
DROP TABLE IF EXISTS `market_message`;
CREATE TABLE `market_message`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '数字ID主键',
  `seller_id` int(11) NULL DEFAULT NULL COMMENT '出售者编号',
  `item_id` int(11) NULL DEFAULT NULL COMMENT '商品编号',
  `parent_id` int(11) UNSIGNED NULL DEFAULT 0 COMMENT '父级留言',
  `reply_id` int(11) UNSIGNED NULL DEFAULT 0 COMMENT '回复对象ID',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '留言者ID',
  `like_count` int(11) NOT NULL DEFAULT 0 COMMENT '喜欢数',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '留言内容',
  `type` int(11) NULL DEFAULT NULL COMMENT '留言类型0:商品1:帖子',
  `thumbs` int(10) NULL DEFAULT 0 COMMENT '点赞数',
  `bit_log` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT 'bitMap统计',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '二手市场留言板表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cceos_flea_market_notice
-- ----------------------------
DROP TABLE IF EXISTS `market_notice`;
CREATE TABLE `market_notice`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `association_id` bigint(100) NOT NULL COMMENT '关联ID',
  `sender` int(11) NULL DEFAULT NULL COMMENT '提醒发送者',
  `receiver` int(11) NOT NULL COMMENT '提醒对象',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '提醒内容',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '提醒状态（0：未读，1：已读，2：删除）',
  `type` tinyint(1) NULL DEFAULT NULL COMMENT '提醒类型（0：催促发货提醒，1：留言提醒，2：新增订单提醒）',
  `read_time` datetime(0) NULL DEFAULT NULL COMMENT '阅读时间',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_receiver`(`receiver`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '二手市场消息提醒表' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;