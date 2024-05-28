create table person
(
    `id`        varchar(36)       NOT NULL,
    `firstname` varchar(255) NOT NULL,
    `lastname`  varchar(255) NOT NULL,
    `email`     varchar(255) NOT NULL,
    `team_id`   varchar(36),
    PRIMARY KEY (`id`)
);

create table team
(
    `id`                varchar(36)       NOT NULL,
    `name`              varchar(255) NOT NULL,
    `identifier_string` varchar(255) NOT NULL,
    `teamleader_id`     varchar(36),
    FOREIGN KEY (`teamleader_id`) REFERENCES `person` (`id`) ON DELETE SET NULL,
    PRIMARY KEY (`id`)
);

alter table person
    add FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE SET NULL;