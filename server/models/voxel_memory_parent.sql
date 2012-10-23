-- Change the http://127.0.0.1:10000?db=reality_YOUR_MODEL_HERE
-- to point at your server and MySQL database name.  Or you will get a grey box!



SET NAMES utf8;
SET foreign_key_checks = 0;
SET time_zone = 'SYSTEM';
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `voxel_memory_parent`;
CREATE DATABASE `voxel_memory_parent` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `voxel_memory_parent`;

DROP TABLE IF EXISTS `tbl_model`;
CREATE TABLE `tbl_model` (
  `int_model_id` int(11) NOT NULL,
  `var_meta` varchar(2048) COLLATE utf8_bin DEFAULT NULL,
  `int_x` int(10) unsigned DEFAULT NULL,
  `int_y` int(10) unsigned DEFAULT NULL,
  `int_z` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`int_model_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


DROP TABLE IF EXISTS `tbl_voxel_block`;
CREATE TABLE `tbl_voxel_block` (
  `int_voxel_block_id` int(11) NOT NULL AUTO_INCREMENT,
  `json_voxel_colour` varchar(1024) COLLATE utf8_bin DEFAULT NULL,
  `json_voxel_block_child_id` varchar(4096) COLLATE utf8_bin DEFAULT NULL,
  `int_x_in_model` int(10) unsigned DEFAULT NULL,
  `int_y_in_model` int(10) unsigned DEFAULT NULL,
  `int_z_in_model` int(10) unsigned DEFAULT NULL,
  `int_scale` int(10) unsigned DEFAULT NULL COMMENT 'Width in model units',
  `int_json_dimensions` tinyint(4) DEFAULT NULL COMMENT 'Usually 4, but might try 8',
  `int_model_id` int(11) NOT NULL,
  PRIMARY KEY (`int_voxel_block_id`),
  KEY `fk_tbl_voxel_block_tbl_model` (`int_model_id`),
  KEY `x_scale` (`int_model_id`,`int_scale`,`int_x_in_model`,`int_y_in_model`,`int_z_in_model`),
  KEY `model_block` (`int_model_id`,`int_voxel_block_id`)
) ENGINE=MyISAM AUTO_INCREMENT=112451 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO `tbl_voxel_block` (`int_voxel_block_id`, `json_voxel_colour`, `json_voxel_block_child_id`, `int_x_in_model`, `int_y_in_model`, `int_z_in_model`, `int_scale`, `int_json_dimensions`, `int_model_id`) VALUES
(1,	'[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4290101188,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]',	'[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]',	0,	0,	0,	256,	4,	1),
(2,	'[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4290101188,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]',	'[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,\'http://127.0.0.1:10000?db=reality_YOUR_MODEL_HERE\',-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]',	64,	64,	64,	64,	4,	1);

-- 2012-10-15 12:27:09
