DROP TABLE IF EXISTS reviews;

CREATE TABLE IF NOT EXISTS reviews (
id INTEGER PRIMARY KEY AUTO_INCREMENT,
username TEXT,
stars INTEGER,
comment TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
visible BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS projects;

CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    project_id VARCHAR(36) NOT NULL,
    project_name TEXT NOT NULL,
    project_description TEXT,
    inventory_image TEXT,
    image_uploaded LONGBLOB
    );