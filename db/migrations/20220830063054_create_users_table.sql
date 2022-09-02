-- migrate:up
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  account VARCHAR(50) NOT NULL UNIQUE,
  user_password VARCHAR(50) NOT NULL,
  user_name VARCHAR(10) NOT NULL,
  email VARCHAR(50) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT NOW(),
  updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE users;
