import { Sequelize } from "sequelize";

const newSequelize = new Sequelize('postgres://microsoft_user:Uy7cdmeZuKuCM19AHiiUHsFOYEfIGSwo@dpg-cl23460310os73e1eao0-a.oregon-postgres.render.com/microsoft', {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // This line is optional and depends on your PostgreSQL server configuration
        },
    },
});

export { newSequelize };
