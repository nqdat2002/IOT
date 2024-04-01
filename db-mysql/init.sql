create table `datasensor` ( 
    `id` int auto_increment primary key, 
    `temperature` float, 
    `humidity` float, 
    `luminosity` float, 
    `date` timestamp default current_timestamp 
);

create table device(
    `device_id` varchar(255) primary key,
    `name` varchar(255),
    `description` varchar(255)
);

create table actionhistory(
    `id` int auto_increment primary key,
    `device_id` varchar(255),
    `action` enum('on', 'off'),
    `date` timestamp default current_timestamp ,
    foreign key (`device_id`) references device(`device_id`)
);