exports.port = process.argv[2] || process.env.PORT || 3000;
// exports.dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/test'; no fount
// exports.dbUrl = process.env.DB_URL || 'mongodb://bq:secret@db_mongo:27018/bq?authSource=admin' no fount 
exports.dbUrl = process.env.DB_URL || 'mongodb://bq:secret@localhost:27018'
exports.secret = process.env.JWT_SECRET || 'esta-es-la-api-burger-queen';
exports.adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost';
exports.adminPassword = process.env.ADMIN_PASSWORD || 'changeme';
