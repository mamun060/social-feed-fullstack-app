-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2025 at 01:04 PM
-- Server version: 10.6.24-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `social_feed`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add user', 6, 'add_customuser'),
(22, 'Can change user', 6, 'change_customuser'),
(23, 'Can delete user', 6, 'delete_customuser'),
(24, 'Can view user', 6, 'view_customuser'),
(25, 'Can add comment', 7, 'add_comment'),
(26, 'Can change comment', 7, 'change_comment'),
(27, 'Can delete comment', 7, 'delete_comment'),
(28, 'Can view comment', 7, 'view_comment'),
(29, 'Can add comment like', 8, 'add_commentlike'),
(30, 'Can change comment like', 8, 'change_commentlike'),
(31, 'Can delete comment like', 8, 'delete_commentlike'),
(32, 'Can view comment like', 8, 'view_commentlike'),
(33, 'Can add post', 9, 'add_post'),
(34, 'Can change post', 9, 'change_post'),
(35, 'Can delete post', 9, 'delete_post'),
(36, 'Can view post', 9, 'view_post'),
(37, 'Can add post like', 10, 'add_postlike'),
(38, 'Can change post like', 10, 'change_postlike'),
(39, 'Can delete post like', 10, 'delete_postlike'),
(40, 'Can view post like', 10, 'view_postlike');

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'contenttypes', 'contenttype'),
(7, 'posts', 'comment'),
(8, 'posts', 'commentlike'),
(9, 'posts', 'post'),
(10, 'posts', 'postlike'),
(5, 'sessions', 'session'),
(6, 'users', 'customuser');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2025-11-24 06:14:07.356454'),
(2, 'contenttypes', '0002_remove_content_type_name', '2025-11-24 06:14:07.393690'),
(3, 'auth', '0001_initial', '2025-11-24 06:14:07.530401'),
(4, 'auth', '0002_alter_permission_name_max_length', '2025-11-24 06:14:07.564401'),
(5, 'auth', '0003_alter_user_email_max_length', '2025-11-24 06:14:07.568402'),
(6, 'auth', '0004_alter_user_username_opts', '2025-11-24 06:14:07.571402'),
(7, 'auth', '0005_alter_user_last_login_null', '2025-11-24 06:14:07.574403'),
(8, 'auth', '0006_require_contenttypes_0002', '2025-11-24 06:14:07.576401'),
(9, 'auth', '0007_alter_validators_add_error_messages', '2025-11-24 06:14:07.579402'),
(10, 'auth', '0008_alter_user_username_max_length', '2025-11-24 06:14:07.582401'),
(11, 'auth', '0009_alter_user_last_name_max_length', '2025-11-24 06:14:07.586402'),
(12, 'auth', '0010_alter_group_name_max_length', '2025-11-24 06:14:07.601998'),
(13, 'auth', '0011_update_proxy_permissions', '2025-11-24 06:14:07.606002'),
(14, 'auth', '0012_alter_user_first_name_max_length', '2025-11-24 06:14:07.608997'),
(15, 'users', '0001_initial', '2025-11-24 06:14:07.767727'),
(16, 'admin', '0001_initial', '2025-11-24 06:14:07.824047'),
(17, 'admin', '0002_logentry_remove_auto_add', '2025-11-24 06:14:07.829043'),
(18, 'admin', '0003_logentry_add_action_flag_choices', '2025-11-24 06:14:07.833238'),
(19, 'posts', '0001_initial', '2025-11-24 06:14:07.886149'),
(20, 'posts', '0002_initial', '2025-11-24 06:14:08.155569'),
(21, 'sessions', '0001_initial', '2025-11-24 06:14:08.180629');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('vmhwk4nado9zpqoa6h9mdhzi2ldlmzgj', '.eJxVjE0OwiAYBe_C2pAiSMGl-56BfH9I1dCktCvj3W2TLnT7Zt68VYJ1KWltMqeR1VUZdfrdEOgpdQf8gHqfNE11mUfUu6IP2vQwsbxuh_sXKNDK9naC5D1Yw06C5J6Ngey7aHtLUaLvJDq8nHErOhaXgYJxwVok9hEjq88X_6Q4zA:1vNPsQ:XRyoGreLparIPNZ_zFJuZMnIBXU3cjIwu-XXfqn3mTI', '2025-12-08 06:16:42.757528');

-- --------------------------------------------------------

--
-- Table structure for table `posts_comment`
--

CREATE TABLE `posts_comment` (
  `id` bigint(20) NOT NULL,
  `text` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `author_id` bigint(20) NOT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `post_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts_comment`
--

INSERT INTO `posts_comment` (`id`, `text`, `created_at`, `author_id`, `parent_id`, `post_id`) VALUES
(1, 'This is a great post!', '2025-11-25 08:49:12.796310', 3, NULL, 3),
(3, 'update the comment text', '2025-11-25 09:17:42.296194', 3, NULL, 10),
(4, 'update', '2025-11-25 09:34:23.160280', 3, NULL, 10),
(6, 'update', '2025-11-25 09:45:37.200821', 3, 1, 3),
(7, 'dsfsdf', '2025-11-25 09:45:56.948082', 3, 1, 3),
(9, 'sdfsdf', '2025-11-25 10:16:22.868440', 3, 4, 10),
(11, 'sdfasdf', '2025-11-25 10:17:57.423560', 3, 3, 10),
(12, 'fsdf  ssd ssd', '2025-11-25 10:18:52.588104', 3, NULL, 10),
(13, 'Nice', '2025-11-25 12:00:15.877529', 8, NULL, 10);

-- --------------------------------------------------------

--
-- Table structure for table `posts_commentlike`
--

CREATE TABLE `posts_commentlike` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `comment_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts_commentlike`
--

INSERT INTO `posts_commentlike` (`id`, `created_at`, `comment_id`, `user_id`) VALUES
(4, '2025-11-25 09:40:22.563750', 3, 3),
(6, '2025-11-25 09:44:09.252182', 1, 3),
(8, '2025-11-25 10:42:25.272452', 12, 3),
(9, '2025-11-25 10:42:49.208202', 12, 7),
(10, '2025-11-25 10:43:11.035316', 12, 4),
(11, '2025-11-25 10:45:01.058150', 12, 5),
(12, '2025-11-25 12:00:20.447505', 4, 8);

-- --------------------------------------------------------

--
-- Table structure for table `posts_post`
--

CREATE TABLE `posts_post` (
  `id` bigint(20) NOT NULL,
  `content` longtext NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `visibility` varchar(10) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `author_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts_post`
--

INSERT INTO `posts_post` (`id`, `content`, `image`, `visibility`, `created_at`, `updated_at`, `author_id`) VALUES
(3, 'Page layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum, also known as placeholder copy, to distinguish which areas on a page will hold advertisements, editorials, and filler before the final written content and website designs receive client approval.\nFun Lorem Ipsum text may appear in any size and font to simulate everything you create for your campaigns.\n\nPage layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum, also known as placeholder copy, to distinguish which areas on a page will hold advertisements, editorials, and filler before the final written content and website designs receive client approval.\n\nFun Lorem Ipsum text may appear in any size and font to simulate everything you create for your campaigns.', 'post_images/card_ppl3_RqB8TmW.png', 'public', '2025-11-24 07:22:45.761553', '2025-11-24 07:22:45.761553', 3),
(6, 'Controlled components in React are the components whose state and behaviors are managed by React components using states while the uncontrolled components manage their own state and control their behaviors with the help of DOM.\r\n\r\nWe will explore the differences between controlled and uncontrolled components in ReactJS, and how to decide which approach will best suit your project\'s need.', 'post_images/images.jpg', 'public', '2025-11-25 05:08:18.240038', '2025-11-25 06:10:33.271202', 3),
(9, 'sdfsdfsadf', 'post_images/card_ppl3_oeycMEX.png', 'public', '2025-11-25 05:19:51.243068', '2025-11-25 05:28:41.945129', 4),
(10, 'Why do we use it?\r\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', 'post_images/481975838_628277666728682_2991748604020119725_n.jpg', 'public', '2025-11-25 06:42:50.745214', '2025-11-25 06:42:50.745214', 3),
(11, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'post_images/Image_1.png', 'public', '2025-11-25 10:37:19.205290', '2025-11-25 10:37:19.205290', 7),
(12, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'post_images/Image_3.png', 'public', '2025-11-25 10:43:55.465099', '2025-11-25 10:44:20.203016', 5),
(14, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'post_images/image_1_n1CfGGh.png', 'public', '2025-11-25 10:44:44.279606', '2025-11-25 10:44:44.279606', 5);

-- --------------------------------------------------------

--
-- Table structure for table `posts_postlike`
--

CREATE TABLE `posts_postlike` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts_postlike`
--

INSERT INTO `posts_postlike` (`id`, `created_at`, `post_id`, `user_id`) VALUES
(1, '2025-11-25 06:55:20.196897', 10, 3),
(2, '2025-11-25 06:55:23.252763', 9, 3),
(4, '2025-11-25 06:55:57.902392', 9, 4),
(5, '2025-11-25 06:56:47.653032', 10, 4),
(6, '2025-11-25 06:58:19.610225', 10, 5),
(7, '2025-11-25 06:58:22.441473', 9, 5),
(8, '2025-11-25 06:58:25.562148', 6, 5),
(9, '2025-11-25 06:58:28.018225', 3, 5),
(12, '2025-11-25 09:48:48.307911', 3, 3),
(13, '2025-11-25 10:19:06.419402', 6, 3),
(14, '2025-11-25 12:00:02.975305', 11, 8),
(15, '2025-11-25 12:00:06.973370', 10, 8);

-- --------------------------------------------------------

--
-- Table structure for table `users_customuser`
--

CREATE TABLE `users_customuser` (
  `id` bigint(20) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `email` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_customuser`
--

INSERT INTO `users_customuser` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `is_staff`, `is_active`, `date_joined`, `email`) VALUES
(1, 'pbkdf2_sha256$1000000$jHJHb3J0jeX7s3EftG2GJ4$g33FxSaeUOo1Su0vZzZzgFPKIuRURqQ8//ouwmxv/PU=', '2025-11-24 06:16:42.755528', 1, 'admin', '', '', 1, 1, '2025-11-24 06:14:59.891519', 'almamun.dev21@gmail.com'),
(2, 'pbkdf2_sha256$1000000$lsX5ZJOlhBg6V88D922e47$Uwq16Kh4ebyKhDtjp/h0HuCVpdUCFOXdVPffD7urVNI=', NULL, 0, 'jdoe', 'John', 'Doe', 0, 1, '2025-11-24 06:27:59.470119', 'jdoe@example.com'),
(3, 'pbkdf2_sha256$870000$SLx9P1czK3gJJnSh1AKzsc$KEGvNfXWoHj8UyVIRWZfU/+jxYPXTLGSioEOAyWWFNQ=', NULL, 0, 'mamun', 'AL', 'Mamun', 0, 1, '2025-11-24 06:29:02.631378', 'mamun@gmail.com'),
(4, 'pbkdf2_sha256$870000$db6fmt091zMKd5subiRp1j$J/qsKUaHJNQI0b3wcaCY41diRZtGiL87mSet6NjGOqM=', NULL, 0, 'sourav', 'sourav', 'majumder', 0, 1, '2025-11-24 06:48:07.760113', 'sourav@gmail.com'),
(5, 'pbkdf2_sha256$870000$y4qCXAUWwHor3OUfa07gHb$PsvvpMYRUj0M94N/x7mX5EGKxkUAJ4iO+VYl/LqDqZo=', NULL, 0, 'newuser', 'New', 'User', 0, 1, '2025-11-24 06:59:08.398179', 'newuser@example.com'),
(6, 'pbkdf2_sha256$1000000$ibehY3B7kVxwCEN7BbtJsm$wxujg6C8BE5XU+sNqx28Jve8L1KP3XGQ5OM/lHjHpmk=', NULL, 0, 'nuwihibyri', 'Guy', 'Greer', 0, 1, '2025-11-24 11:41:36.665017', 'zemylok@mailinator.com'),
(7, 'pbkdf2_sha256$870000$q1ecqPr1dWnvVaq6NOkYxg$7f6BeUZRWxUOpE4m50jRXS/wEZKKjlm1YnDPpTCEAy4=', NULL, 0, 'mehedi', 'Md', 'Mehedi', 0, 1, '2025-11-25 10:35:27.692960', 'mehedi@gmail.com'),
(8, 'pbkdf2_sha256$870000$BARK7DsUdbICqGNiJb3NUV$ASYsybgQ9S0HJirat0Qq0IEpiFjuIgmrE9XlV5VM1ZE=', NULL, 0, 'aysha', 'mst', 'aysha', 0, 1, '2025-11-25 11:40:30.471740', 'a@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `users_customuser_groups`
--

CREATE TABLE `users_customuser_groups` (
  `id` bigint(20) NOT NULL,
  `customuser_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_customuser_user_permissions`
--

CREATE TABLE `users_customuser_user_permissions` (
  `id` bigint(20) NOT NULL,
  `customuser_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_users_customuser_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `posts_comment`
--
ALTER TABLE `posts_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_comment_author_id_795e4d12_fk_users_customuser_id` (`author_id`),
  ADD KEY `posts_comment_parent_id_ae76dcba_fk_posts_comment_id` (`parent_id`),
  ADD KEY `posts_comment_post_id_e81436d7_fk_posts_post_id` (`post_id`);

--
-- Indexes for table `posts_commentlike`
--
ALTER TABLE `posts_commentlike`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `posts_commentlike_comment_id_user_id_5c03f748_uniq` (`comment_id`,`user_id`),
  ADD KEY `posts_commentlike_user_id_27a8d490_fk_users_customuser_id` (`user_id`);

--
-- Indexes for table `posts_post`
--
ALTER TABLE `posts_post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_post_created_at_9fadc33a` (`created_at`),
  ADD KEY `posts_post_author_id_fe5487bf_fk_users_customuser_id` (`author_id`);

--
-- Indexes for table `posts_postlike`
--
ALTER TABLE `posts_postlike`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `posts_postlike_post_id_user_id_c05e64be_uniq` (`post_id`,`user_id`),
  ADD KEY `posts_postlike_user_id_852c1fae_fk_users_customuser_id` (`user_id`);

--
-- Indexes for table `users_customuser`
--
ALTER TABLE `users_customuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users_customuser_groups`
--
ALTER TABLE `users_customuser_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_customuser_groups_customuser_id_group_id_76b619e3_uniq` (`customuser_id`,`group_id`),
  ADD KEY `users_customuser_groups_group_id_01390b14_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `users_customuser_user_permissions`
--
ALTER TABLE `users_customuser_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_customuser_user_pe_customuser_id_permission_7a7debf6_uniq` (`customuser_id`,`permission_id`),
  ADD KEY `users_customuser_use_permission_id_baaa2f74_fk_auth_perm` (`permission_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `posts_comment`
--
ALTER TABLE `posts_comment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `posts_commentlike`
--
ALTER TABLE `posts_commentlike`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `posts_post`
--
ALTER TABLE `posts_post`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `posts_postlike`
--
ALTER TABLE `posts_postlike`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users_customuser`
--
ALTER TABLE `users_customuser`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users_customuser_groups`
--
ALTER TABLE `users_customuser_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_customuser_user_permissions`
--
ALTER TABLE `users_customuser_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_users_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `users_customuser` (`id`);

--
-- Constraints for table `posts_comment`
--
ALTER TABLE `posts_comment`
  ADD CONSTRAINT `posts_comment_author_id_795e4d12_fk_users_customuser_id` FOREIGN KEY (`author_id`) REFERENCES `users_customuser` (`id`),
  ADD CONSTRAINT `posts_comment_parent_id_ae76dcba_fk_posts_comment_id` FOREIGN KEY (`parent_id`) REFERENCES `posts_comment` (`id`),
  ADD CONSTRAINT `posts_comment_post_id_e81436d7_fk_posts_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts_post` (`id`);

--
-- Constraints for table `posts_commentlike`
--
ALTER TABLE `posts_commentlike`
  ADD CONSTRAINT `posts_commentlike_comment_id_a1898c0f_fk_posts_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `posts_comment` (`id`),
  ADD CONSTRAINT `posts_commentlike_user_id_27a8d490_fk_users_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `users_customuser` (`id`);

--
-- Constraints for table `posts_post`
--
ALTER TABLE `posts_post`
  ADD CONSTRAINT `posts_post_author_id_fe5487bf_fk_users_customuser_id` FOREIGN KEY (`author_id`) REFERENCES `users_customuser` (`id`);

--
-- Constraints for table `posts_postlike`
--
ALTER TABLE `posts_postlike`
  ADD CONSTRAINT `posts_postlike_post_id_4da7ace8_fk_posts_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts_post` (`id`),
  ADD CONSTRAINT `posts_postlike_user_id_852c1fae_fk_users_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `users_customuser` (`id`);

--
-- Constraints for table `users_customuser_groups`
--
ALTER TABLE `users_customuser_groups`
  ADD CONSTRAINT `users_customuser_gro_customuser_id_958147bf_fk_users_cus` FOREIGN KEY (`customuser_id`) REFERENCES `users_customuser` (`id`),
  ADD CONSTRAINT `users_customuser_groups_group_id_01390b14_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `users_customuser_user_permissions`
--
ALTER TABLE `users_customuser_user_permissions`
  ADD CONSTRAINT `users_customuser_use_customuser_id_5771478b_fk_users_cus` FOREIGN KEY (`customuser_id`) REFERENCES `users_customuser` (`id`),
  ADD CONSTRAINT `users_customuser_use_permission_id_baaa2f74_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
