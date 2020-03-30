

/*
商品类别
*/

INSERT INTO `market_type` (`id`,`type`,`name`) VALUES (DEFAULT,'0','测试1');
INSERT INTO `market_type` (`id`,`type`,`name`) VALUES (DEFAULT,'0','测试2');
INSERT INTO `market_type` (`id`,`type`,`name`) VALUES (DEFAULT,'0','测试3');

INSERT INTO `market_type` (`id`,`type`,`name`) VALUES (DEFAULT,'1','测试1');
INSERT INTO `market_type` (`id`,`type`,`name`) VALUES (DEFAULT,'1','测试2');
INSERT INTO `market_type` (`id`,`type`,`name`) VALUES (DEFAULT,'1','测试3');

/*
merket user
*/
INSERT INTO `user_inf` (
  `user_id`,
  `phone`,
  `openId`,
  `avatarUrl`,
  `city`,
  `country`,
  `nickName`,
  `language`,
  `province`,
  `gender`
) VALUES (
  DEFAULT,
  DEFAULT,
  'oMaz25Y5JFEVj_UKcKZcNKdV6EHc', 
  'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLkDr90EFeibu7FHaWmF0nP3vTa4fj1yU0ZWM424UEYxjpOdmtCic9OowcbG3heACSib3z8HMEvmzvRg/132',
  'Fuzhou',
  'China',
  '高南安',
  'zh_CN',
  'Fujian',
  1
);