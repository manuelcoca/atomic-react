import { execSync } from 'child_process';

async function main() {
  console.log('Publishing package to local Verdaccio registry');

  try {
    execSync('npm publish', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log('Package published successfully!');
  } catch (error) {
    console.error('Failed to publish package:', error);
    process.exit(1);
  }
}

main();
