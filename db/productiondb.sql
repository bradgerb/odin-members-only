CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255),
    password VARCHAR(255),
    ismember BOOLEAN,
    isadmin BOOLEAN
);

CREATE TABLE IF NOT EXISTS messages (
    message_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message VARCHAR(255),
    date TIMESTAMPTZ DEFAULT now(),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

INSERT INTO users (username, password) VALUES
('guest', 'test');

INSERT INTO messages (message, user_id) VALUES
('Hello world', 1);