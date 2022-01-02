CREATE TABLE tableA(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price INT NOT NULL check(price >=1 and price <=5)
);

CREATE TABLE tableB(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    tableA_id BIGINT NOT NULL REFERENCES tableA(id), // shows as tablea_id
    name VARCHAR(255) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >=1 and rating <=5)
);

tableA - Restaurants
tabelB - Review

