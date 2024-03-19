create table datasensor{
    id int auto_increment primary key,
    temperature float,
    humidity float,
    luminosity float,
    created_at timestamp default current_timestamp
};

create table actionhistory{
    id int auto_increment primary key,
    action varchar(255),
    created_at timestamp default current_timestamp
};