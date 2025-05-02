import { execSync } from 'node:child_process';

console.log('🗑 Resetting dev database...');

try {
  // Delete old database
  execSync('rm -f prisma/dev.db', { stdio: 'inherit' });

  // Re-run migrations (creates fresh db + schema)
  //execSync('npx prisma migrate dev --name reset --force', { stdio: 'inherit' });
  execSync('npx prisma migrate reset --force --skip-seed', { stdio: 'inherit' });


  // Re-seed the database
  execSync('npm run prisma:seed', { stdio: 'inherit' });

  console.log('✅ Database reset and reseeded!');
} catch (err) {
  console.error('❌ Error resetting database:', err);
  process.exit(1);
}
