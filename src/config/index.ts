export const DatabaseConfig = {
  user: process.env.PGUSER || "postgre",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABSE || "lalatri",
  password: process.env.PASSWORD || "",
  port: parseInt(process.env.PGPORT || "5432"),
  url: process.env.PGURL || "",
};

export const UserConfig = {
  validPasswordLength: 6,
};

export const EmailConfig = {
  disable: process.env.DISABLE_SEND_EMAIL || true,
  transpoter: {
    host: "smtp.gmail.com", // hostname
    secure: false, // use SSL
    port: 25, // port for secure SMTP
    auth: {
      user: process.env.USER_EMAIL || "",
      pass: process.env.EMAIL_PASSWORD || "",
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
};
